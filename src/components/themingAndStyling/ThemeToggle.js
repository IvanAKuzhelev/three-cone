import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import * as React from "react";
import { useContext } from "react";
import ActiveThemeContext from "../contexts/ActiveThemeContext";
import Moon from "../../images/moon.svg";
import Sun from "../../images/sun.svg";

import { THEME_NAMES } from "./themeData";

const ThemeToggle = () => {
  const [chosenTheme, setChosenTheme] = useContext(ActiveThemeContext);
  const theme = useTheme();

  const handleToggle = () => {
    if (chosenTheme === THEME_NAMES.light) {
      window.localStorage.setItem(THEME_NAMES.local, THEME_NAMES.dark);
      setChosenTheme(THEME_NAMES.dark);
      return;
    }

    window.localStorage.setItem(THEME_NAMES.local, THEME_NAMES.light);
    setChosenTheme(THEME_NAMES.light);
  };

  const SunImg = styled.img`
    height: 2rem;
    transform: ${() =>
      chosenTheme === THEME_NAMES.light
        ? "translateY(0)"
        : "translateY(100px)"};
  `;
  const MoonImg = styled.img`
    height: 2rem;
    transform: ${() =>
      chosenTheme === THEME_NAMES.light
        ? "translateY(100px)"
        : "translateY(0)"};
  `;

  const Toggle = styled.button`
    background: ${theme.toggleBg};
    border: 2px solid ${theme.toggleBorder};
    border-radius: 30px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    padding: 0.3rem;
    position: relative;
    width: 6rem;
    height: 2.5rem;
    transition: all 3s linear;
  `;

  return (
    <Toggle onClick={handleToggle}>
      <MoonImg src={Moon} />
      <SunImg src={Sun} />
    </Toggle>
  );
};
export default ThemeToggle;
