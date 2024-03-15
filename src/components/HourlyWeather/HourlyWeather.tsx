import * as React from "react";
import {
  Avatar,
  Card,
  CardHeader,
  LargeTitle,
  Subtitle1,
  tokens,
  makeStyles,
  shorthands,
  Button,
  Input,
  Spinner,
  Body1Strong,
  Caption1,
  Body1,
  Body2,
  Divider,
} from "@fluentui/react-components";
import { useOpenAi, usePersona } from "../../utils";
import {
  WeatherContext,
  WeatherIntervalValues,
  WeatherInterval,
} from "../../context";
import { weatherCode } from "../../utils";
import { WeatherIcon } from "../Weather";
import Image from "next/image";

const useStyles = makeStyles({
  hourlyWeatherContainer: {
    display: "flex",
    height: "100%",
    width: "420px",
    ...shorthands.gap(tokens.spacingHorizontalM),
  },
});

export const HourlyWeather = () => {
  const { weather } = React.useContext(WeatherContext);
  const [hourlyWeather, setHourlyWeather] = React.useState<
    WeatherInterval[] | null
  >(null);

  const styles = useStyles();

  const findCurrentHourIndex = (intervals: any) => {
    const now = new Date();
    return intervals.findIndex((interval: any) => {
      const intervalStart = new Date(interval.startTime);
      return (
        intervalStart.getHours() === now.getHours() &&
        intervalStart.getDate() === now.getDate()
      );
    });
  };

  const updateHourlyWeather = () => {
    if (!weather?.hourlyData?.intervals) return;

    const currentIndex = findCurrentHourIndex(weather.hourlyData.intervals);
    if (currentIndex === -1) return;

    const next5HoursWeather = weather.hourlyData.intervals.slice(
      currentIndex + 1,
      currentIndex + 6
    );

    setHourlyWeather(next5HoursWeather);
  };

  React.useEffect(() => {
    updateHourlyWeather();

    const intervalId = setInterval(updateHourlyWeather, 10000);

    return () => clearInterval(intervalId);
  }, [weather]);

  return (
    <Card className={styles.hourlyWeatherContainer} appearance="filled">
      <div
        style={{
          display: "flex",
          gap: "10px",
          height: "100%",
          flexDirection: "column",
        }}
      >
        <CardHeader header={<Subtitle1>Hourly weather</Subtitle1>} />
        <div
          style={{
            display: "flex",
            // gap: "10px",
            height: "100%",
            flexDirection: "column",
          }}
        >
          {hourlyWeather?.map((interval, index) => (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: tokens.spacingHorizontalXL,
                }}
              >
                <Body1 style={{ width: "80px" }}>
                  {new Date(interval.startTime).toLocaleTimeString(undefined, {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </Body1>
                <WeatherIcon
                  animated={false}
                  size={"small"}
                  weatherCode={interval.values.weatherCode}
                />
                <Body1Strong>{`${Math.round(
                  interval.values.temperature
                )}°`}</Body1Strong>
                <div style={{}}>
                  <Body1>{interval.values.precipitationProbability}</Body1>
                  <Image
                    src="/icons/weather/static/humidity.svg"
                    width={"18px"}
                    height={"18px"}
                  />
                </div>
              </div>
              {hourlyWeather.length - 1 != index && (
                <Divider
                  style={{
                    display: "flex",
                    flexGrow: "1",
                    height: "100%",
                    maxHeight: "150px",
                  }}
                  appearance="subtle"
                />
              )}
            </>
          ))}
        </div>
      </div>
    </Card>
  );
};