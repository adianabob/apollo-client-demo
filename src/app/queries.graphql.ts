import { gql } from "@apollo/client";

export const GET_USERS_COUNT = gql`
  query getUsersCount($departmentFilter: Department) {
    usersCount(departmentFilter: $departmentFilter)
  }
`;
