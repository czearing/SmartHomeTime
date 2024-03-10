import * as React from "react";
import {
  Card,
  LargeTitle,
  Subtitle1,
  tokens,
  makeStyles,
  shorthands,
  Body1,
  Spinner,
} from "@fluentui/react-components";
import { WeatherIcon } from "./WeatherIcon";
import { WeatherContext } from "../../context";

const useStyles = makeStyles({
  clockContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
    width: "250px",
    ...shorthands.gap(tokens.spacingHorizontalM),
  },
});

export const Weather = () => {
  const { weather } = React.useContext(WeatherContext);
  const styles = useStyles();

  return (
    <Card className={styles.clockContainer} appearance="filled">
      {weather ? (
        <>
          <WeatherIcon weatherCode={weather?.firstDay?.weatherCode} />
          <Body1>{JSON.stringify(weather?.firstDay?.temperature) + " F"}</Body1>
        </>
      ) : (
        <Spinner />
      )}
    </Card>
  );
};
