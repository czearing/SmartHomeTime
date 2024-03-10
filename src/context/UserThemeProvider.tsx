import React from "react";

export type UserThemeData = "dark" | "light" | "system";

export type UserThemeContextValue = {
  userTheme: UserThemeData;
  setUserTheme: React.Dispatch<React.SetStateAction<UserThemeData>>;
};

export const UserThemeContext = React.createContext<UserThemeContextValue>({
  userTheme: "system",
  setUserTheme: () => {},
});

export const UserThemeProvider = UserThemeContext.Provider;

export const useUserTheme = () => React.useContext(UserThemeContext);
