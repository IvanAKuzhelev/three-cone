import * as React from "react";
import { Global, css } from "@emotion/react";
import Canvas from "../components/canvas";
import Form from "../components/Form";
import DrawValuesContext from "../components/DrawValuesContext";

export default () => {
  return (
    <DrawValuesContext.Provider>
      <Global
        styles={css`
          *,
          *:before,
          *:after {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            padding: 0;
          }
        `}
      />
      <main
        css={css`
          display: grid;
          grid-template-columns: 1fr 4fr;
          width: 100vw;
          height: 100vh;
        `}
      >
        <Form />
        <Canvas />
      </main>
    </DrawValuesContext.Provider>
  );
};
