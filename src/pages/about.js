import * as React from "react";
import CenteredMain from "../components/themingAndStyling/CenteredMain";
import StyledLink, {
  ExternalLink,
} from "../components/themingAndStyling/StyledLinks";
import ThemeToggle from "../components/themingAndStyling/ThemeToggle";

const about = () => {
  return (
    <CenteredMain>
      <h1>Gatsby frontend of the box visualisation app.</h1>
      <ul>
        <li>Three.js as the WebGl library(BufferGeometry)</li>
        <li>React Context for the state management</li>
        <li>Emotion.js for CSS</li>
        <li>Dark mode utilizing local storage and OS preference.</li>
      </ul>

      <StyledLink to="/">Back to the homepage</StyledLink>

      <ExternalLink href="https://github.com/IvanAKuzhelev/box-server-fe">
        GitHub
      </ExternalLink>
      <ThemeToggle />
    </CenteredMain>
  );
};
export default about;
