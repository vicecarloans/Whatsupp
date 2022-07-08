import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { graphqlClient } from "../../graphql/client";
import { LIST_CHANNELS_QUERY } from "../../graphql/queries/get-channels";

export interface Channel {
    id: string;
    name: string;
}
export const channelsApi = createApi({
    reducerPath: "channelsApi",
    baseQuery: graphqlRequestBaseQuery({
        client: graphqlClient,
    }),
    endpoints: (builder) => ({
        listChannels: builder.query<
            Array<Channel>,
            { offset?: number; limit?: number }
        >({
            query: ({ offset, limit }) => ({
                document: LIST_CHANNELS_QUERY,
                variables: {
                    offset,
                    limit,
                },
            }),
            transformResponse: (response: { channels: Array<Channel> }) =>
                response.channels,
        }),
    }),
});

export const { useListChannelsQuery } = channelsApi;
