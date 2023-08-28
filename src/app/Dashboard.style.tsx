import styled from "styled-components";

export const StyledContainer = styled("div")({
  padding: "24px",
  display: "flex",
  flexDirection: "column",
});

export const StyledButtonsContainer = styled("div")({
  display: "flex",
});

export const StyledCountContainer = styled("div")({
  marginTop: "16px",
});

export const StyledButton = styled<any>("button")(
  ({ background = "#0C6FC6" }) => ({
    background,
    border: background,
    color: "white",
    padding: "8px",
    borderRadius: "8px",
    marginRight: "16px",
    cursor: "pointer",
  })
);
