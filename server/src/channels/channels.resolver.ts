import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Channel, Response } from "../graphql.schema";
import { ChannelsService } from "./channels.service";

@Resolver()
export class ChannelsResolver {
    constructor(private channelsService: ChannelsService) {}

    @Query()
    async channels(
        @Args("offset") offset?: number,
        @Args("limit") limit?: number
    ): Promise<Array<Channel>> {
        const channels = await this.channelsService.listChannels(offset, limit);
        return channels.map((channel) => ({
            id: channel.id,
            name: channel.name,
        }));
    }

    @Mutation()
    async addChannel(@Args("name") name: string): Promise<Response> {
        await this.channelsService.addNewChannel(name);

        return Response.OK;
    }
}
