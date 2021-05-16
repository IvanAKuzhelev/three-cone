import * as React from "react";
import { useState } from "react";
import { css } from "@emotion/react";
import Canvas from "../components/canvas/Canvas";
import Form from "../components/form/Form";
import DrawValuesContext from "../components/contexts/DrawValuesContext";
import InitialDrawValues from "../components/canvas/canvasUtils/InitialDrawValues";

const Index = () => {
  const values = useState(InitialDrawValues);
  return (
    <DrawValuesContext.Provider value={values}>
      <main
        css={css`
          display: flex;
          flex-flow: row;
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
export default Index;
