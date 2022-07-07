import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PubSub } from "graphql-subscriptions";
import { PUBSUB_CLIENT_NAME } from "../constants";
import { Message } from "./message.entity";
import { MessagesResolver } from "./messages.resolver";
import { MessagesService } from "./messages.service";

@Module({
    imports: [TypeOrmModule.forFeature([Message])],
    providers: [
        MessagesService,
        MessagesResolver,
        {
            provide: PUBSUB_CLIENT_NAME,
            useValue: new PubSub(),
        },
    ],
})
export class MessagesModule {}
