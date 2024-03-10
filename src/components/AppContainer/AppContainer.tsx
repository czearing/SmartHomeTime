import { ReactNode } from "react";

const appContainerStyles = { height: "100%" };

export const AppContainer = (props: { children: ReactNode }) => {
  return <div style={appContainerStyles}>{props.children}</div>;
};
