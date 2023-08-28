import React from "react";
import { useFilters } from "./FiltersContext";
import { Department } from "../__generated__/generatedTypes";
import { useUsersCount } from "./useUsersCount";
import {
  StyledButton,
  StyledButtonsContainer,
  StyledContainer,
  StyledCountContainer,
} from "@app/Dashboard.style";

export const Dashboard = () => {
  const { filter, selectFilter, resetFilter } = useFilters();
  const { loading, error, count } = useUsersCount();
  return (
    <StyledContainer>
      <StyledButtonsContainer>
        <StyledButton onClick={() => selectFilter(Department.Hr)}>
          Add HR filter
        </StyledButton>
        <StyledButton onClick={() => selectFilter(Department.Engineering)}>
          Add Engineering filter
        </StyledButton>
        <StyledButton onClick={() => resetFilter()} background={"red"}>
          Remove filter
        </StyledButton>
      </StyledButtonsContainer>
      <StyledCountContainer>
        User count:
        {loading ? "loading" : error && !loading ? "error" : count} <br />
        Active filter: {!filter ? "null" : filter}
      </StyledCountContainer>
    </StyledContainer>
  );
};
