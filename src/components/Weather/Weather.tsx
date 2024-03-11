import * as React from "react";
import {
  Card,
  LargeTitle,
  Subtitle1,
  Subtitle2,
  tokens,
  makeStyles,
  shorthands,
  Body1,
  Spinner,
  Body1Strong,
  Divider,
} from "@fluentui/react-components";
import { WeatherIcon } from "./WeatherIcon";
import { WeatherContext } from "../../context";
import { formatTime, weatherCode } from "../../utils";

const useStyles = makeStyles({
  weatherContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
    width: "380px",
    ...shorthands.gap(tokens.spacingHorizontalM),
    // backgroundImage: "linear-gradient(to bottom, #d3d3d3, #a9a9a9)",
  },
  columnContainer: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "column",
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  rowContainer: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
    ...shorthands.gap(tokens.spacingHorizontalS),
  },
});

export const Weather = () => {
  const { weather } = React.useContext(WeatherContext);
  const styles = useStyles();

  return (
    <Card className={styles.weatherContainer} appearance="filled">
      {weather ? (
        <div
          style={{
            display: "flex",
            gap: tokens.spacingHorizontalXXXL,
            alignItems: "center",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: tokens.spacingVerticalM,
            }}
          >
            <div className={styles.columnContainer}>
              <WeatherIcon weatherCode={weather?.firstDay?.weatherCode} />
              <Subtitle2>
                {weatherCode[weather?.firstDay?.weatherCode]}
              </Subtitle2>
            </div>
            <LargeTitle>
              {Math.round(weather?.firstDay?.temperature) + " F"}
            </LargeTitle>
          </div>
          {/* <Divider vertical style={{ height: "100%" }} /> */}
          <div className={styles.columnContainer}>
            <div className={styles.rowContainer}>
              <Body1Strong>Wind</Body1Strong>
              <Body1>{Math.round(weather?.firstDay?.windSpeed)} mph</Body1>
            </div>
            <div className={styles.rowContainer}>
              <Body1Strong>Humidity</Body1Strong>
              <Body1>{Math.round(weather?.firstDay?.humidity)}%</Body1>
            </div>
            {/* <div className={styles.rowContainer}>
              <Body1Strong>Sunrise</Body1Strong>
              <Body1>{formatTime(weather?.firstDay?.sunriseTime)}</Body1>
            </div>
            <div className={styles.rowContainer}>
              <Body1Strong>Sunset</Body1Strong>
              <Body1>{formatTime(weather?.firstDay?.sunsetTime)}</Body1>
            </div> */}
          </div>

          {/* <div className={styles.columnContainer}>
            <div className={styles.rowContainer}>
              <Body1Strong>Sunrise</Body1Strong>
              <Body1>{formatTime(weather?.firstDay?.sunriseTime)}</Body1>
            </div>

            <div className={styles.rowContainer}>
              <Body1Strong>Sunset</Body1Strong>
              <Body1>{formatTime(weather?.firstDay?.sunsetTime)}</Body1>
            </div>
          </div> */}
        </div>
      ) : (
        <Spinner />
      )}
    </Card>
  );
};
