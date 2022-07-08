import { Inject } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { PubSubTriggerKey, PUBSUB_CLIENT_NAME } from "src/constants";

import { Message, Response } from "../graphql.schema";
import { MessagesService } from "./messages.service";

export interface IPublishedMessage {
    messageId: string;
    channelId: string;
}
@Resolver()
export class MessagesResolver {
    constructor(
        private messagesService: MessagesService,
        @Inject(PUBSUB_CLIENT_NAME) private pubSubClient: PubSub
    ) {}

    @Query()
    async messages(
        @Args("channelId") channelId: string,
        @Args("offset") offset?: number | null,
        @Args("limit") limit?: number | null
    ): Promise<Array<Message>> {
        const messages = await this.messagesService.getMessages(
            channelId,
            offset,
            limit
        );

        return messages.map((message) => ({
            id: message.id,
            channel: message.channel,
            sender: message.sender,
            content: message.content,
        }));
    }

    @Mutation()
    async sendMessage(
        @Args("senderId") senderId: string,
        @Args("channelId") channelId: string,
        @Args("content") content: string
    ): Promise<Response> {
        const messageId = await this.messagesService.addNewMessage(
            senderId,
            channelId,
            content
        );

        //TODO: For production grade app, use a datastore here instead
        this.pubSubClient.publish(PubSubTriggerKey.MessageAdded, {
            messageId,
            channelId,
        });

        return Response.OK;
    }

    @Subscription(PubSubTriggerKey.MessageAdded, {
        filter: (payload: IPublishedMessage, variables) => {
            console.log(payload);

            return payload.channelId === variables.channelId;
        },

        async resolve(this: MessagesResolver, value: IPublishedMessage) {
            console.log(value);

            return await this.messagesService.getMessageById(value.messageId);
        },
    })
    async messageAdded() {
        return this.pubSubClient.asyncIterator<IPublishedMessage>(
            PubSubTriggerKey.MessageAdded
        );
    }
}
