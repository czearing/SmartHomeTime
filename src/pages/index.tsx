import * as React from "react";
import { tokens, makeStyles, shorthands } from "@fluentui/react-components";
import { Clock, SunRiseSet, Weather } from "../components";
import { useQuery } from "@tanstack/react-query";
import { fetchWeather, WeatherQueryKey } from "../server";
import { useLocation } from "../utils";
import { WeatherProvider } from "src/context";

const useStyles = makeStyles({
  container: {
    display: "flex",
    ...shorthands.gap(tokens.spacingHorizontalM),
  },
});

const mockData = {
  dailyData: {
    timestep: "1d",
    endTime: "2024-03-11T06:00:00-07:00",
    startTime: "2024-03-10T06:00:00-07:00",
    intervals: [
      {
        startTime: "2024-03-10T06:00:00-07:00",
        values: {
          humidity: 92,
          precipitationProbability: 98,
          sunriseTime: "2024-03-10T14:29:00Z",
          sunsetTime: "2024-03-11T02:06:00Z",
          temperature: 45.84,
          weatherCode: 4200,
          windSpeed: 9.77,
        },
      },
      {
        startTime: "2024-03-11T06:00:00-07:00",
        values: {
          humidity: 85.97,
          precipitationProbability: 95,
          sunriseTime: "2024-03-11T14:27:00Z",
          sunsetTime: "2024-03-12T02:07:00Z",
          temperature: 45.8,
          weatherCode: 4200,
          windSpeed: 12.92,
        },
      },
    ],
  },
  firstDay: {
    humidity: 92,
    precipitationProbability: 98,
    sunriseTime: "2024-03-10T14:29:00Z",
    sunsetTime: "2024-03-11T02:06:00Z",
    temperature: 45.84,
    weatherCode: 4200,
    windSpeed: 9.77,
  },
};

export default function Home() {
  const styles = useStyles();

  const location = useLocation();

  const { data, isLoading } = useQuery({
    queryKey: ["weather", location!],
    // TODO: Replace any with the correct type, I'm lazy atm
    queryFn: (context) => fetchWeather(context as any),
    enabled: !!location,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
    retry: false,
  });

  return (
    <WeatherProvider value={{ weather: mockData! }}>
      <div className={styles.container}>
        <Clock />
        <Weather />
        <SunRiseSet />
      </div>
    </WeatherProvider>
  );
}
