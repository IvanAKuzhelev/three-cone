import * as React from "react";
import styled from "@emotion/styled";

const errors = {
  none: "none",
  input: "input",
  request: "request",
};

const ErrorDisplay = ({ error }) => {
  const Display = styled.p`
    color: red;
  `;
  switch (error) {
    case errors.none:
      return null;
    case errors.input:
      return <Display>Please provide correct parameters</Display>;
    case errors.request:
      return <Display>Something went wrong. Please try again</Display>;
    default:
      return null;
  }
};
export { errors, ErrorDisplay };
