import * as React from "react";
import { useState, useLayoutEffect } from "react";
import { Global, ThemeProvider, css } from "@emotion/react";
import { Helmet } from "react-helmet";
import ActiveThemeContext from "./contexts/ActiveThemeContext";
import { THEMES, THEME_NAMES } from "./themingAndStyling/themeData";
import checkUserPreferredTheme from "./themingAndStyling/checkUserPreferredTheme";

const RootWrapper = ({ children }) => {
  const themeChoice = useState(THEME_NAMES.default);

  useLayoutEffect(() => {
    // Updating to the actual theme

    // This, along with the default theme, is a fix to the Gatsby hydration issue.
    // In-depth discussions available here https://blog.logrocket.com/fixing-gatsbys-rehydration-issue/
    // and here https://github.com/gatsbyjs/gatsby/discussions/17914

    themeChoice[1](checkUserPreferredTheme());
  }, []);

  return (
    <ActiveThemeContext.Provider value={themeChoice}>
      <ThemeProvider theme={THEMES[themeChoice[0]]}>
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
            html,
            body {
              margin: 0;
              padding: 0;
            }
          `}
        />
        {children}
      </ThemeProvider>
    </ActiveThemeContext.Provider>
  );
};
export default RootWrapper;
