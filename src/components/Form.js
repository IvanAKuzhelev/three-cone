import * as React from "react";
import { useState, useContext } from "react";
import DimensionInput from "./DimensionInput";
import DrawValuesContext from "./DrawValuesContext";

const Form = () => {
  const [height, setHeight] = useState(200);
  const [width, setWidth] = useState(100);
  const [length, setLength] = useState(150);
  const [drawValues, setDrawValues] = useContext(DrawValuesContext);
  const getDrawvalues = async () => {
    const clientDimensions = {
      x: Number(width),
      y: Number(height),
      z: Number(length),
    };
    const url = "http://localhost:3001/";
    console.log(JSON.stringify(clientDimensions));
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
      alert("Please provide all parameters");
      return;
    }
    getDrawvalues().then((data) => setDrawValues(data));
  };
  return (
    <form onSubmit={handleSubmission}>
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
    </form>
  );
};
export default Form;
