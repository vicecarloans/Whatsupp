import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ReportsService } from "./reports.service";
import { ReportInput } from "src/graphql.schema";

@Resolver()
export class ReportsResolver {
  constructor(private readonly reportsService: ReportsService) {}

  @Query()
  async reports(@Args("offset") offset: number, @Args("limit") limit: number) {
    return this.reportsService.findAll(offset, limit);
  }

  @Query()
  async report(@Args("id") id: number) {
    return this.reportsService.findById(id);
  }

  @Mutation()
  async createReport(@Args("report") reportInput: ReportInput) {
    return this.reportsService.create(reportInput);
  }
}
