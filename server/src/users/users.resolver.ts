import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { User } from "../graphql.schema";

import { UsersService } from "./users.service";

@Resolver()
export class UsersResolver {
    constructor(private usersService: UsersService) {}

    @Mutation()
    async addUser(
        @Args("username") username: string,
        @Args("picture") picture?: string
    ): Promise<User> {
        const { id } = await this.usersService.addNewUser(username, picture);
        return {
            id,
            username,
            picture,
        };
    }
}
