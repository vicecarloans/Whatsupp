import { gql } from "graphql-request";

export const CORE_CHANNEL_FIELDS = gql`
    fragment CoreChannelFields on Channel {
        id
        name
    }
`;
