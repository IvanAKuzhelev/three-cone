import * as React from "react";
import { useState, useContext } from "react";
import { css, useTheme } from "@emotion/react";
import DimensionInput from "./DimensionInput";
import DrawValuesContext from "../contexts/DrawValuesContext";
import { errors, ErrorDisplay } from "./ErrorDisplay";
import ThemeToggle from "../themingAndStyling/ThemeToggle";
import StyledLink, { ExternalLink } from "../themingAndStyling/StyledLinks";

const Form = () => {
  const [height, setHeight] = useState(200);
  const [width, setWidth] = useState(100);
  const [length, setLength] = useState(150);
  const [error, setError] = useState(errors.none);
  const [, setDrawValues] = useContext(DrawValuesContext);
  const theme = useTheme();

  const getDrawvalues = async () => {
    const clientDimensions = {
      x: Number(width),
      y: Number(height),
      z: Number(length),
    };
    const url = "https://iak-fs.xyz/3d-box/";
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
    if (height === "" || width === "" || length === "") {
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
          dimensionValue={height}
          setDimension={setHeight}
        />
        <DimensionInput
          dimension="Width"
          dimensionValue={width}
          setDimension={setWidth}
        />
        <DimensionInput
          dimension="Length"
          dimensionValue={length}
          setDimension={setLength}
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
