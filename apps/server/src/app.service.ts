import { Injectable } from "@nestjs/common";
import { Greeting } from "./graphql.schema";

@Injectable()
export class AppService {
  getHello(): Greeting {
    return { message: "Hello World!" };
  }
}
