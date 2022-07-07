import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "./message.entity";
import { MessagesResolver } from "./messages.resolver";
import { MessagesService } from "./messages.service";

@Module({
    imports: [TypeOrmModule.forFeature([Message])],
    providers: [MessagesService, MessagesResolver]
})
export class MessagesModule {}