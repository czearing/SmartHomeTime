import * as React from "react";
import { tokens, makeStyles, shorthands } from "@fluentui/react-components";
import { Clock } from "../components";

const useStyles = makeStyles({
  container: {
    display: "flex",
    ...shorthands.gap(tokens.spacingHorizontalM),
  },
});

export default function Home() {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Clock />
    </div>
  );
}
