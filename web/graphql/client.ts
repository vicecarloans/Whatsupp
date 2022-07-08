import { GraphQLClient, GraphQLWebSocketClient } from "graphql-request";

export const graphqlClient = new GraphQLClient(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_GRAPHQL_ENDPOINT}`
);
