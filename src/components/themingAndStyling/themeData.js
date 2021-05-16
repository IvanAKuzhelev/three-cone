const THEME_NAMES = {
  local: "theme",
  light: "light",
  dark: "dark",
  default: "default",
};
const THEMES = {
  light: {
    figure: 0xff0000,
    scene: 0xd3d3d3,
    text: "#011627",
    aside: "#fbfbfb",
    inputText: "#011627",
    toggleBg: "#87ceeb",
    toggleBorder: "#fffd74",
    link: "#1a0dab",
    visitedLink: "#551a8b",
  },
  default: {
    figure: 0xff0000,
    scene: 0xd3d3d3,
    text: "#011627",
    aside: "#fbfbfb",
    inputText: "#011627",
    toggleBg: "#87ceeb",
    toggleBorder: "#fffd74",
    link: "#1a0dab",
    visitedLink: "#551a8b",
  },
  dark: {
    figure: 0xfbfbfb,
    scene: 0x011627,
    text: "#fbfbfb",
    aside: "#010b12",
    inputText: "#011627",
    toggleBg: "#61557f",
    toggleBorder: "#fbfbfb",
    link: "#F3FFB9",
    visitedLink: "pink",
  },
};
export { THEMES, THEME_NAMES };
