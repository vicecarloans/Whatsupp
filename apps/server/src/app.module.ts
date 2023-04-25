import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule } from "@nestjs/config";

import { AppService } from "./app.service";
import { AppResolver } from "./app.resolver";

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ["./**/*.graphql"],
      playground: true,
      debug: true,
      installSubscriptionHandlers: true,
      introspection: true,
    }),
  ],
  controllers: [],
  providers: [AppService, AppResolver],
})
export class AppModule {}
