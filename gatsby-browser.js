import * as React from "react";
import RootWrapper from "./src/components/RootWrapper";

const wrapRootElement = ({ element }) => <RootWrapper>{element}</RootWrapper>;

export { wrapRootElement };
