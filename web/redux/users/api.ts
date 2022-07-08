import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { graphqlClient } from "../../graphql/client";
import { ADD_USER_MUTATION } from "../../graphql/mutations/add-new-user";

export interface User {
    id: string;
    username: string;
    picture?: string | null;
}

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: graphqlRequestBaseQuery({
        client: graphqlClient,
    }),
    endpoints: (builder) => ({
        addNewUser: builder.mutation<
            User,
            { username: string; picture?: string }
        >({
            query: ({ username, picture }) => ({
                document: ADD_USER_MUTATION,
                variables: {
                    username,
                    picture,
                },
            }),
            transformResponse: (response: { addUser: User }) =>
                response.addUser,
        }),
    }),
});

export const { useAddNewUserMutation } = usersApi;
