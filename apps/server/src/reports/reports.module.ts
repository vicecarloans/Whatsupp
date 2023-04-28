import { Module } from "@nestjs/common";
import { ReportsResolver } from "./reports.resolver";
import { ReportsService } from "./reports.service";
import { PrismaService } from "src/prisma.service";

@Module({
  controllers: [],
  providers: [ReportsResolver, ReportsService, PrismaService],
})
export class ReportsModule {}
