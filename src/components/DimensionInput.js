import * as React from "react";
const DimensionInput = (props) => {
  return (
    <>
      <label htmlFor={props.dimension}>
        {props.dimension}
        <input
          type="number"
          id={props.dimension}
          value={props.dimensionValue}
          placeholder={props.dimension}
          onChange={(e) => props.setDimension(e.target.value)}
        />
      </label>
    </>
  );
};
export default DimensionInput;
