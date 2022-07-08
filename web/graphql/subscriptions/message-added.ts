import { gql } from "graphql-request";
import { CORE_MESSAGE_FIELDS } from "../fragments/message";

export const MESSAGE_ADDED_SUBSCRIPTION = gql`
    ${CORE_MESSAGE_FIELDS}
    subscription SubscribeMessage($channelId: ID!) {
        messageAdded(channelId: $channelId) {
            ...CoreMessageFields
        }
    }
`;
