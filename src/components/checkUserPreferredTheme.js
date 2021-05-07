import { THEME_NAMES } from "./themeData";

const checkUserPreferredTheme = () => {
  const localTheme = window.localStorage.getItem(THEME_NAMES.local);
  if (localTheme) {
    return localTheme;
  }
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return THEME_NAMES.dark;
  }
  return THEME_NAMES.light;
};
export default checkUserPreferredTheme;
