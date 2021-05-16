import * as React from "react";
import { css, useTheme } from "@emotion/react";

const DimensionInput = (props) => {
  const theme = useTheme();
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        padding: 10px;
      `}
    >
      <label htmlFor={props.dimension}>{props.dimension}</label>
      <input
        type="number"
        id={props.dimension}
        value={props.dimensionValue}
        placeholder={props.dimension}
        onChange={(e) => props.setDimension(e.target.value)}
        css={css`
          margin-left: 5px;
          color: ${theme.inputText};
        `}
      />
    </div>
  );
};
export default DimensionInput;
