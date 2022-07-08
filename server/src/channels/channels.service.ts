import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessagesService } from "src/messages/messages.service";
import { Repository } from "typeorm";
import { Channel } from "./channel.entity";

export interface IChannelsService {
    listChannels(offset: number, limit: number): Promise<Array<Channel>>;
}

export class ChannelsService implements IChannelsService {
    private readonly logger = new Logger(MessagesService.name);

    constructor(
        @InjectRepository(Channel)
        private channelsRepository: Repository<Channel>
    ) {}

    async listChannels(
        offset: number = 0,
        limit: number = 15
    ): Promise<Channel[]> {
        this.logger.log("Execute listChannels", { offset, limit });
        try {
            const [results, count] = await this.channelsRepository
                .createQueryBuilder("channel")
                .offset(offset)
                .limit(limit)
                .getManyAndCount();
            this.logger.log("Execute listChannels successfully", { count });
            return results;
        } catch (err) {
            this.logger.error("Failed to list channels", { err });
            throw new Error("DATABASE_ERROR");
        }
    }
}
