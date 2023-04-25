import { Module } from "@nestjs/common";
import { ReportsResolver } from "./reports.resolver";

@Module({
  controllers: [],
  providers: [ReportsResolver],
})
export class ReportsModule {}
