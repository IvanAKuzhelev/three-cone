import * as React from "react";
import CenteredMain from "../components/themingAndStyling/CenteredMain";
import StyledLink, {
  ExternalLink,
} from "../components/themingAndStyling/StyledLinks";
import ThemeToggle from "../components/themingAndStyling/ThemeToggle";

const NotFoundPage = () => {
  return (
    <CenteredMain>
      <h1>404 Not Found</h1>
      <h2>It's here alright</h2>
      <StyledLink to="/">Go to the homepage</StyledLink>
      <ExternalLink href="https://github.com/IvanAKuzhelev/box-server-fe">
        GitHub
      </ExternalLink>
      <ThemeToggle />
    </CenteredMain>
  );
};

export default NotFoundPage;
