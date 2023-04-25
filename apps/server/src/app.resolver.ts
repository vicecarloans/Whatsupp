import { AppService } from "./app.service";
import { Query, Resolver } from "@nestjs/graphql";
import { Greeting } from "./graphql.schema";

@Resolver("Greeting")
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query()
  hello(): Greeting {
    return this.appService.getHello();
  }
}
