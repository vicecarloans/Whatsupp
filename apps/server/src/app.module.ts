import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule } from "@nestjs/config";

import { AppService } from "./app.service";
import { AppResolver } from "./app.resolver";
import { PrismaService } from "./prisma.service";
import { ReportsResolver } from "./reports/reports.resolver";
import { ReportsModule } from "./reports/reports.module";

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
    ReportsModule,
  ],
  controllers: [],
  providers: [AppService, AppResolver, PrismaService],
})
export class AppModule {}
