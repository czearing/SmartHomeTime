import * as React from "react";
import { tokens, makeStyles, shorthands } from "@fluentui/react-components";
import {
  Clock,
  SunRiseSet,
  Weather,
  ChatBot,
  HourlyWeather,
} from "../components";

const useStyles = makeStyles({
  container: {
    display: "flex",
    ...shorthands.gap(tokens.spacingHorizontalM),
  },
  columnContainer: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap(tokens.spacingHorizontalM),
    height: "100%",
  },
});

export default function Home() {
  const styles = useStyles();

  return (
    <div className={styles.columnContainer}>
      <div className={styles.container}>
        <Clock />
        <Weather />
        <SunRiseSet />
      </div>
      <div className={styles.container}>
        <ChatBot />
        <HourlyWeather />
      </div>
    </div>
  );
}
