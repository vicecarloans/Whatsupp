import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Message } from "./message.entity";

interface IMessagesService {
    getMessages(channelId: string): Promise<Message[]>;
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

    async addNewMessage(
        senderId: string,
        channelId: string,
        content: string
    ): Promise<boolean> {
        this.logger.log("Execute addNewMessage", {
            senderId,
            channelId,
            content,
        });

        try {
            await this.messagesRespository
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

            this.logger.log("Add new message successfully");

            return true;
        } catch (err) {
            this.logger.error("Unable to add new message", { err });
            throw new Error("DATABASE_ERROR");
        }
    }
}
