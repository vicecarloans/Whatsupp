import { gql } from "graphql-request";
import { CORE_CHANNEL_FIELDS } from "../fragments/channel";

export const LIST_CHANNELS_QUERY = gql`
    ${CORE_CHANNEL_FIELDS}
    query ListChannels($offset: Int, $limit: Int) {
        channels(offset: $offset, limit: $limit) {
            ...CoreChannelFields
        }
    }
`;
