import * as React from "react";
import {
  Card,
  LargeTitle,
  Subtitle2,
  tokens,
  makeStyles,
  shorthands,
  Body1,
  Spinner,
  Body1Strong,
} from "@fluentui/react-components";
import { WeatherIcon } from "./WeatherIcon";
import { WeatherContext } from "../../context";
import { weatherCode, weatherLinearGradients } from "../../utils";

const useStyles = makeStyles({
  weatherContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
    width: "330px",
    ...shorthands.gap(tokens.spacingHorizontalM),
    // TODO: Add specific gradients based on the weather
    // backgroundImage: "linear-gradient(135deg, #87CEEB 0%, #B0E0E6 100%)",
  },
  columnContainer: {
    display: "flex",
    marginBottom: "-35px",
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
  mainContainer: {
    display: "flex",
    ...shorthands.gap(tokens.spacingHorizontalXXXL),
    alignItems: "center",
    height: "100%",
  },
  weatherTextContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  weatherIconContainer: {
    display: "flex",
  },
  flex: {
    display: "flex",
  },
});

export const Weather = () => {
  const { weather } = React.useContext(WeatherContext);
  const styles = useStyles();

  return (
    <Card className={styles.weatherContainer} appearance="filled">
      {weather ? (
        <div className={styles.mainContainer}>
          <div className={styles.weatherTextContainer}>
            <div className={styles.weatherIconContainer}>
              <WeatherIcon weatherCode={weather?.firstDay?.weatherCode} />
              <div className={styles.flex}>
                <LargeTitle>
                  {Math.round(weather?.firstDay?.temperature)}
                </LargeTitle>
                <Body1Strong>°F</Body1Strong>
              </div>
            </div>

            <Subtitle2>{weatherCode[weather?.firstDay?.weatherCode]}</Subtitle2>
          </div>

          <div className={styles.columnContainer}>
            <div className={styles.rowContainer}>
              <Body1Strong>Wind</Body1Strong>
              <Body1>{Math.round(weather?.firstDay?.windSpeed)} mph</Body1>
            </div>
            <div className={styles.rowContainer}>
              <Body1Strong>Humidity</Body1Strong>
              <Body1>{Math.round(weather?.firstDay?.humidity)}%</Body1>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </Card>
  );
};
