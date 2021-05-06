import * as React from "react";
import { useState, useContext } from "react";
import { css } from "@emotion/react";
import { Link } from "gatsby";
import DimensionInput from "./DimensionInput";
import DrawValuesContext from "./DrawValuesContext";
import { errors, ErrorDisplay } from "./ErrorDisplay";

const Form = () => {
  const [height, setHeight] = useState(200);
  const [width, setWidth] = useState(100);
  const [length, setLength] = useState(150);
  const [error, setError] = useState(errors.none);
  const [, setDrawValues] = useContext(DrawValuesContext);

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
    console.log(error);
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
      <Link
        to="/about/"
        css={css`
          display: block;
        `}
      >
        About
      </Link>
    </aside>
  );
};
export default Form;
