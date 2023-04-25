import { gql } from "graphql-request";
import { CORE_USER_FIELDS } from "../fragments/user";

export const ADD_USER_MUTATION = gql`
    ${CORE_USER_FIELDS}
    mutation AddUser($username: String!, $picture: String) {
        addUser(username: $username, picture: $picture) {
            ...CoreUserFields
        }
    }
`;
