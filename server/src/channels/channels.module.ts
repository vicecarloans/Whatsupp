import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Channel } from "./channel.entity";
import { ChannelsResolver } from "./channels.resolver";
import { ChannelsService } from "./channels.service";

@Module({
    imports: [TypeOrmModule.forFeature([Channel])],
    providers: [ChannelsService, ChannelsResolver],
})
export class ChannelsModule {}
