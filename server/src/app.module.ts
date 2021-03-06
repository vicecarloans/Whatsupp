import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MessagesModule } from "./messages/messages.module";
import { Message } from "./messages/message.entity";
import { Channel } from "./channels/channel.entity";
import { User } from "./users/user.entity";
import { UsersModule } from "./users/users.module";
import { ChannelsModule } from "./channels/channels.module";
@Module({
    imports: [
        ConfigModule.forRoot(),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            typePaths: ["./**/*.graphql"],
            playground: true,
            debug: true,
            installSubscriptionHandlers: true,
            subscriptions: {
                "graphql-ws": true,
                "subscriptions-transport-ws": true,
            },
            introspection: true,
        }),
        MessagesModule,
        UsersModule,
        ChannelsModule,
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.DATABASE_URL,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [Message, Channel, User],
            migrations: ["src/migrations/*.ts"],
            synchronize: true, // On a real production environment, we should turn this off and do database migrations instead
            migrationsRun: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
