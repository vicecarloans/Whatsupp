import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { Channel } from "../channels";
import { graphqlClient } from "../../graphql/client";
import { GET_MESSAGES_QUERY } from "../../graphql/queries/get-messages";
import { User } from "../users";
import { MESSAGE_ADDED_SUBSCRIPTION } from "../../graphql/subscriptions/message-added";
import { SEND_MESSAGE_MUTATION } from "../../graphql/mutations/send-message";
import { GraphQLWebSocketClient } from "graphql-request";

export interface Message {
    id: string;
    channel: Channel;
    sender: User;
    content: string;
}

export const messagesApi = createApi({
    reducerPath: "messagesApi",
    baseQuery: graphqlRequestBaseQuery({
        client: graphqlClient,
    }),
    endpoints: (builder) => ({
        getMessages: builder.query<
            Array<Message>,
            { channelId: string; offset?: number; limit?: number }
        >({
            query: ({ channelId, offset, limit }) => ({
                document: GET_MESSAGES_QUERY,
                variables: {
                    channelId,
                    offset,
                    limit,
                },
            }),
            transformResponse: (response: { messages: Array<Message> }) =>
                response.messages,
            async onCacheEntryAdded(
                arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
            ) {
                const socket = new WebSocket(
                    `${process.env.NEXT_PUBLIC_SOCKET_API_BASE_URL}${process.env.NEXT_PUBLIC_API_GRAPHQL_ENDPOINT}`,
                    "graphql-transport-ws"
                );
                const graphqlStreamingClient = new GraphQLWebSocketClient(
                    socket,
                    {}
                );
                try {
                    await cacheDataLoaded;

                    graphqlStreamingClient?.subscribe<
                        { messageAdded: Message },
                        { channelId: string }
                    >(
                        MESSAGE_ADDED_SUBSCRIPTION,
                        {
                            next: (data) => {
                                console.log(data);

                                updateCachedData((draft) => {
                                    draft.push(data.messageAdded);
                                });
                            },
                            error: (errorValue) => {
                                console.error(
                                    "Something went wrong with the subscription",
                                    { errorValue }
                                );
                            },
                            complete: () => {
                                console.log("Done...");
                            },
                        },
                        { channelId: arg.channelId }
                    );
                } catch (err) {
                    console.error(err);
                }

                // cacheEntryRemoved will resolve when the cache subscription is no longer active
                await cacheEntryRemoved;
                // perform cleanup steps once the `cacheEntryRemoved` promise resolves
                graphqlStreamingClient?.close();
            },
        }),
        sendMessage: builder.mutation<
            string,
            { senderId: string; channelId: string; content: string }
        >({
            query: ({ senderId, channelId, content }) => ({
                document: SEND_MESSAGE_MUTATION,
                variables: {
                    senderId,
                    channelId,
                    content,
                },
            }),
        }),
    }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = messagesApi;
