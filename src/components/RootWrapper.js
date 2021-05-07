import * as React from "react";
import { useState } from "react";
import { Global, ThemeProvider, css } from "@emotion/react";
import { Helmet } from "react-helmet";
import ActiveThemeContext from "./contexts/ActiveThemeContext";
import { THEMES } from "./themeData";
import checkUserPreferredTheme from "./checkUserPreferredTheme";

const RootWrapper = ({ children }) => {
  const themeChoice = useState(checkUserPreferredTheme());

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
