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
import { useLocation } from "../../utils";
import { WeatherProvider } from "src/context";

const fluentProviderStyles = {
  height: "100%",
  backgroundColor: tokens.colorNeutralBackground2,
};

const useStyles = makeStyles({
  container: {
    position: "relative",
    height: "100%",
    ...shorthands.padding("10px"),
    boxSizing: "border-box",
  },
});

// const mockData = {
//   dailyData: {
//     timestep: "1d",
//     endTime: "2024-03-11T06:00:00-07:00",
//     startTime: "2024-03-10T06:00:00-07:00",
//     intervals: [
//       {
//         startTime: "2024-03-10T06:00:00-07:00",
//         values: {
//           humidity: 92,
//           precipitationProbability: 98,
//           sunriseTime: "2024-03-10T14:29:00Z",
//           sunsetTime: "2024-03-11T02:06:00Z",
//           temperature: 45.84,
//           weatherCode: 4200,
//           windSpeed: 9.77,
//         },
//       },
//       {
//         startTime: "2024-03-11T06:00:00-07:00",
//         values: {
//           humidity: 85.97,
//           precipitationProbability: 95,
//           sunriseTime: "2024-03-11T14:27:00Z",
//           sunsetTime: "2024-03-12T02:07:00Z",
//           temperature: 45.8,
//           weatherCode: 4200,
//           windSpeed: 12.92,
//         },
//       },
//     ],
//   },
//   firstDay: {
//     humidity: 92,
//     precipitationProbability: 98,
//     sunriseTime: "2024-03-10T14:29:00Z",
//     sunsetTime: "2024-03-11T02:06:00Z",
//     temperature: 45.84,
//     weatherCode: 4200,
//     windSpeed: 9.77,
//   },
// };

export const AppContainer: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [theme, setTheme] = React.useState(webLightTheme);
  const location = useLocation();
  const styles = useStyles();

  const { data } = useQuery({
    queryKey: ["weather", location],
    queryFn: (context) => fetchWeather(context as any),
    enabled: !!location,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 10,
    // Get the weather every 30 minutes
    refetchInterval: 1000 * 60 * 30,
  });

  React.useEffect(() => {
    const updateThemeBasedOnTime = () => {
      const now = new Date();
      const sunriseTime = data && new Date(data.firstDay.sunriseTime);
      const sunsetTime = data && new Date(data.firstDay.sunsetTime);

      if (sunriseTime && sunsetTime && now >= sunriseTime && now < sunsetTime) {
        // If the current time is after sunrise but before sunset, use the light theme
        setTheme(webLightTheme);
      } else {
        // If the current time is after sunset or before sunrise, use the dark theme
        setTheme(webDarkTheme);
      }
    };

    updateThemeBasedOnTime();

    const intervalId = setInterval(updateThemeBasedOnTime, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [data]);

  return (
    <FluentProvider theme={theme} style={fluentProviderStyles}>
      <WeatherProvider value={{ weather: data! }}>
        <div className={styles.container}>{props.children}</div>
      </WeatherProvider>
    </FluentProvider>
  );
};
