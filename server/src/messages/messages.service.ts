import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Message } from "./message.entity";

interface IMessagesService {
    getMessages(
        channelId: string,
        offset?: number,
        limit?: number
    ): Promise<Message[]>;
    getMessageById(messageId: string): Promise<Message>;
    addNewMessage(
        senderId: string,
        channelId: string,
        content: string
    ): Promise<string>;
}

export class MessagesService implements IMessagesService {
    private readonly logger = new Logger(MessagesService.name);

    constructor(
        @InjectRepository(Message)
        private messagesRespository: Repository<Message>
    ) {}

    async getMessages(
        channelId: string,
        offset: number = 0,
        limit: number = 15
    ): Promise<Message[]> {
        this.logger.log("Execute get messages with the following parameters", {
            channelId,
            offset,
            limit,
        });
        try {
            const [results, count] = await this.messagesRespository
                .createQueryBuilder("message")
                .offset(offset)
                .limit(limit)
                .innerJoinAndSelect("message.sender", "sender")
                .innerJoinAndSelect(
                    "message.channel",
                    "channel",
                    "channel.id = :inputChannelId",
                    { inputChannelId: channelId }
                )
                .getManyAndCount();

            this.logger.log(`getMessages returns ${count} items.`);

            return results;
        } catch (err) {
            this.logger.error("Failed to get messages by channelId", { err });
            throw new Error("DATABASE_ERROR");
        }
    }

    async getMessageById(messageId: string): Promise<Message> {
        this.logger.log("Execute get message by Id", { messageId });
        try {
            const result = await this.messagesRespository
                .createQueryBuilder("message")
                .innerJoinAndSelect("message.sender", "sender")
                .innerJoinAndSelect("message.channel", "channel")
                .where("message.id = :messageId", { messageId })
                .getOne();

            this.logger.log("getMessageById executed successfully", { result });
            return result;
        } catch (err) {
            this.logger.error("Failed to get message by Id", { messageId });
            throw new Error("DATABASE_ERROR");
        }
    }

    async addNewMessage(
        senderId: string,
        channelId: string,
        content: string
    ): Promise<string> {
        this.logger.log("Execute addNewMessage", {
            senderId,
            channelId,
            content,
        });

        try {
            const result = await this.messagesRespository
                .createQueryBuilder()
                .insert()
                .into(Message)
                .values([
                    {
                        sender: {
                            id: senderId,
                        },
                        channel: {
                            id: channelId,
                        },
                        content,
                    },
                ])
                .execute();

            this.logger.log("Add new message successfully", { result });

            return result.identifiers[0].id;
        } catch (err) {
            this.logger.error("Unable to add new message", { err });
            throw new Error("DATABASE_ERROR");
        }
    }
}
