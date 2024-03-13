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
import { WeatherIcon, UvIcon } from "./";
import { WeatherContext } from "../../context";
import { weatherCode } from "../../utils";

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
    alignItems: "center",
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
  const [hourlyWeather, setHourlyWeather] = React.useState<any>(null);

  const styles = useStyles();

  React.useEffect(() => {
    const updateHourlyWeather = () => {
      const now = new Date();
      const currentInterval = weather?.hourlyData.intervals.find((interval) => {
        const intervalStart = new Date(interval.startTime);
        return (
          intervalStart.getDate() === now.getDate() &&
          intervalStart.getHours() === now.getHours()
        );
      });
      setHourlyWeather(currentInterval?.values);
    };

    setHourlyWeather(updateHourlyWeather);

    const intervalId = setInterval(() => {
      setHourlyWeather(updateHourlyWeather);
    }, 60000);

    return () => clearInterval(intervalId);
  }, [weather]);

  return (
    <>
      {/* {JSON.stringify(hourlyWeather)} */}
      <Card className={styles.weatherContainer} appearance="filled">
        {weather ? (
          <div className={styles.mainContainer}>
            <div className={styles.weatherTextContainer}>
              <div className={styles.weatherIconContainer}>
                <WeatherIcon weatherCode={hourlyWeather?.weatherCode} />
                <div className={styles.flex}>
                  <LargeTitle>
                    {Math.round(hourlyWeather?.temperature)}
                  </LargeTitle>
                  <Body1Strong>°F</Body1Strong>
                </div>
              </div>

              <Subtitle2>{weatherCode[hourlyWeather?.weatherCode]}</Subtitle2>
            </div>

            <div className={styles.columnContainer}>
              <div className={styles.rowContainer}>
                <Body1Strong>Wind</Body1Strong>
                {/* <WindIcon windSpeed={hourlyWeather?.windSpeed} /> */}
                <Body1>{Math.round(hourlyWeather?.windSpeed)} mph</Body1>
              </div>
              <div className={styles.rowContainer}>
                <Body1Strong>Humidity</Body1Strong>
                <Body1>{Math.round(hourlyWeather?.humidity)}%</Body1>
              </div>
              <div className={styles.rowContainer}>
                <Body1Strong>UV</Body1Strong>
                <UvIcon uvIndex={hourlyWeather?.uvIndex} />
              </div>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </Card>
    </>
  );
};
