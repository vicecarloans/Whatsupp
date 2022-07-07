import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { channel } from "diagnostics_channel";
import { Message, Response } from "../graphql.schema";
import { MessagesService } from "./messages.service";

@Resolver()
export class MessagesResolver {
    constructor(private messagesService: MessagesService) {}

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
        await this.messagesService.addNewMessage(senderId, channelId, content);
        return Response.OK;
    }
}
