import * as React from "react";
import { useState, useContext } from "react";
import { css, useTheme } from "@emotion/react";
import DimensionInput from "./DimensionInput";
import DrawValuesContext from "../contexts/DrawValuesContext";
import { errors, ErrorDisplay } from "./ErrorDisplay";
import ThemeToggle from "../themingAndStyling/ThemeToggle";
import StyledLink, { ExternalLink } from "../themingAndStyling/StyledLinks";

const Form = () => {
  const [H, setH] = useState(300);
  const [R, setR] = useState(100);
  const [N, setN] = useState(20);
  const [error, setError] = useState(errors.none);
  const [, setDrawValues] = useContext(DrawValuesContext);
  const theme = useTheme();

  const getDrawvalues = async () => {
    const clientDimensions = {
      H: H,
      R: R,
      N: N,
    };
    const url = "https://iak-fs.xyz/cone/";
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientDimensions),
    });
    return response.json();
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    if (H === "" || R === "" || N === "" || N < 4) {
      setError(errors.input);
      return;
    }
    setError(errors.none);
    getDrawvalues().then(
      (data) => setDrawValues(data),
      (err) => {
        setError(errors.request);
        console.log(err);
      }
    );
  };

  return (
    <aside
      css={css`
        flex: 0 0 250px;
        display: grid;
        align-content: center;
        grid-gap: 10px;
        justify-items: center;
        background-color: ${theme.aside};
        color: ${theme.text};
      `}
    >
      <form
        onSubmit={handleSubmission}
        css={css`
          text-align: center;
        `}
      >
        <DimensionInput
          dimension="Height"
          dimensionValue={H}
          setDimension={setH}
        />
        <DimensionInput
          dimension="Radius"
          dimensionValue={R}
          setDimension={setR}
        />
        <DimensionInput
          dimension="Number of triangles"
          dimensionValue={N}
          setDimension={setN}
        />

        <button type="submit">Calculate</button>
        <ErrorDisplay error={error} />
      </form>
      <StyledLink
        to="/about/"
        css={css`
          display: block;
        `}
      >
        About
      </StyledLink>
      <ExternalLink href="https://github.com/IvanAKuzhelev/box-server-fe">
        GitHub
      </ExternalLink>
      <ThemeToggle />
    </aside>
  );
};
export default Form;
