import * as React from "react";
import { makeStyles, shorthands } from "@fluentui/react-components";
const appContainerStyles = { height: "100%" };

const useStyles = makeStyles({
  container: {
    height: "100%",
    ...shorthands.padding("20px"),
  },
});

export const AppContainer: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const styles = useStyles();

  return <div className={styles.container}>{props.children}</div>;
};
