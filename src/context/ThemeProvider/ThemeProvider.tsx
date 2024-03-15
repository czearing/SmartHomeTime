import React from "react";
import { ThemeProviderContextValue } from "./ThemeProvider.types";

export const ThemeProviderContext =
  React.createContext<ThemeProviderContextValue>({
    theme: null,
  });

export const ThemeProvider = ThemeProviderContext.Provider;

export const useTheme = () => React.useContext(ThemeProviderContext);
