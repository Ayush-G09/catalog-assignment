import { Mode } from "./types";

const lightMode = {
  primary: "#fafafa",
  secondary: "#ffffff",
  font: "#000000",
  border: "#EFF1F3",
};

const darkMode = {
  primary: "#222222",
  secondary: "#272727",
  font: "#ffffff",
  border: "#121212",
};

export const generateTheme = (mode: Mode) => ({
  font: mode === "light" ? lightMode.font : darkMode.font,
  primary: mode === "light" ? lightMode.primary : darkMode.primary,
  secondary: mode === "light" ? lightMode.secondary : darkMode.secondary,
  shadowInset: "inset 0px 0px 5px 0px rgba(0, 0, 0, 0.3)",
  border: mode === "light" ? lightMode.border : darkMode.border,
});
