import * as React from "react";
import { useState } from "react";
import { Global, css } from "@emotion/react";
import { Helmet } from "react-helmet";
import Canvas from "../components/canvas";
import Form from "../components/Form";
import DrawValuesContext from "../components/DrawValuesContext";
import InitialDrawValues from "../components/InitialDrawValues";

export default () => {
  const values = useState(InitialDrawValues);
  return (
    <DrawValuesContext.Provider value={values}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Box app</title>
      </Helmet>
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
