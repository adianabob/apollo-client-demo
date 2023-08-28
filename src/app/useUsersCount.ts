import { useQuery } from "@apollo/client";
import {
  GetUsersCountQuery,
  GetUsersCountQueryVariables,
} from "../__generated__/generatedTypes";
import { GET_USERS_COUNT } from "./queries.graphql";
import { useFilters } from "@app/FiltersContext";

export const useUsersCount = () => {
  const { filter } = useFilters();
  const { data, error, loading } = useQuery<
    GetUsersCountQuery,
    GetUsersCountQueryVariables
  >(GET_USERS_COUNT, { variables: { departmentFilter: filter } });

  return {
    loading,
    error,
    count: data?.usersCount || 0,
  };
};
