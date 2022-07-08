import { gql } from "graphql-request";

export const SEND_MESSAGE_MUTATION = gql`
    mutation SendMessage($senderId: ID!, $channelId: ID!, $content: String!) {
        sendMessage(
            senderId: $senderId
            channelId: $channelId
            content: $content
        )
    }
`;
