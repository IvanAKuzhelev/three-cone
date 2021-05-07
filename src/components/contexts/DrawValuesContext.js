import { createContext } from "react";

const DrawValuesContext = createContext([
  { vertices: [], indices: [] },
  () => {},
]);

export default DrawValuesContext;
