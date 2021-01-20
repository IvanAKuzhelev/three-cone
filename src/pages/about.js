import * as React from "react";
import { Link } from "gatsby";

const about = () => {
  return (
    <main>
      <h1>Gatsby frontend of the box visualisation app.</h1>
      <ul>
        <li>Three.js as the WebGl library(BufferGeometry)</li>
        <li>React Context for the state management</li>
        <li>Emotion.js for CSS</li>
      </ul>

      <Link to="/">Back to the homepage</Link>
    </main>
  );
};
export default about;
