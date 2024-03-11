import * as React from "react";
import {
  makeStyles,
  shorthands,
  FluentProvider,
  tokens,
  webLightTheme,
  webDarkTheme,
} from "@fluentui/react-components";
import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../../server";
import { WeatherProvider } from "src/context";

const fluentProviderStyles = {
  height: "100%",
  backgroundColor: tokens.colorNeutralBackground2,
};

const useStyles = makeStyles({
  container: {
    height: "100%",
    ...shorthands.padding("10px"),
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

export const AppContainer: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [theme, setTheme] = React.useState(webLightTheme);
  const styles = useStyles();

  const { data, isLoading } = useQuery({
    queryKey: ["weather", location!],
    // TODO: Replace any with the correct type, I'm lazy atm
    queryFn: (context) => fetchWeather(context as any),
    enabled: !!location,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
    retry: false,
  });

  React.useEffect(() => {
    const updateThemeBasedOnTime = () => {
      const now = new Date();
      const sunriseTime = mockData && new Date(mockData.firstDay.sunriseTime);
      const sunsetTime = mockData && new Date(mockData.firstDay.sunsetTime);

      if (sunriseTime && sunsetTime && now >= sunriseTime && now < sunsetTime) {
        // If the current time is after sunrise but before sunset, use the light theme
        setTheme(webLightTheme);
      } else {
        // If the current time is after sunset or before sunrise, use the dark theme
        setTheme(webDarkTheme);
      }
    };

    // Calculate the milliseconds until the next hour to align theme updates
    const now = new Date();
    const msUntilNextHour =
      (60 - now.getMinutes()) * 60 * 1000 - now.getSeconds() * 1000;
    const timeoutId = setTimeout(() => {
      updateThemeBasedOnTime();

      // After the first timeout, set an interval to update the theme every hour
      setInterval(updateThemeBasedOnTime, 3600000);
    }, msUntilNextHour);

    updateThemeBasedOnTime();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <FluentProvider theme={theme} style={fluentProviderStyles}>
      <WeatherProvider value={{ weather: mockData! }}>
        <div className={styles.container}>{props.children}</div>
      </WeatherProvider>
    </FluentProvider>
  );
};
