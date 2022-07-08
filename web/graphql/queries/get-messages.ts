import { gql } from "graphql-request";
import { CORE_MESSAGE_FIELDS } from "../fragments/message";

export const GET_MESSAGES_QUERY = gql`
    ${CORE_MESSAGE_FIELDS}
    query GetMessages($channelId: ID!, $offset: Int, $limit: Int) {
        messages(channelId: $channelId, offset: $offset, limit: $limit) {
            ...CoreMessageFields
        }
    }
`;
