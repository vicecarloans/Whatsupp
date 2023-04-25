import { gql } from "graphql-request";
import { CORE_CHANNEL_FIELDS } from "./channel";

export const CORE_MESSAGE_FIELDS = gql`
    ${CORE_CHANNEL_FIELDS}
    fragment CoreMessageFields on Message {
        id
        channel {
            ...CoreChannelFields
        }
        sender {
            id
            username
            picture
        }
        content
    }
`;
