import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

export interface IUsersService {
    addNewUser(username: string, picture?: string): Promise<User>;
}
export class UsersService implements IUsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    async addNewUser(username: string, picture?: string): Promise<User> {
        this.logger.log("Begin executing addNewUser", {
            username,
            picture,
        });
        try {
            const result = await this.usersRepository
                .createQueryBuilder()
                .insert()
                .into(User)
                .values([{ username, picture }])
                .execute();

            this.logger.log("Executed addNewUser successfully", { result });
            return {
                id: result.identifiers[0].id as string,
                username,
                picture,
                messages: [],
            };
        } catch (err) {
            this.logger.error("Unable to add new user", { err });
            throw new Error("DATABASE_ERROR");
        }
    }
}
