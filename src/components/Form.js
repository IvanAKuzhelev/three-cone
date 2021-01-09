import * as React from "react";
import { useState, useContext } from "react";
import DimensionInput from "./DimensionInput";
import DrawValuesContext from "./DrawValuesContext";

const Form = () => {
  const [height, setHeight] = useState(200);
  const [width, setWidth] = useState(100);
  const [length, setLength] = useState(150);
  //   const [, setDrawValues] = useContext(DrawValuesContext);
  const getDrawvalues = () => {
    console.log("yep");
  };
  const handleSubmission = (e) => {
    e.preventDefault();
    if (height === "" || width === "" || length === "") {
      alert("Please provide all parameters");
      return;
    }
    getDrawvalues();
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
