import React from "react";
import { ThemeContextValue } from "./ThemeProvider.types";

export const ThemeContext = React.createContext<ThemeContextValue>({
  theme: null,
});

export const ThemeProvider = ThemeContext.Provider;

export const useTheme = () => React.useContext(ThemeContext);
