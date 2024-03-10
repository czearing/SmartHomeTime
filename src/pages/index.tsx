import * as React from "react";
import { tokens, makeStyles, shorthands } from "@fluentui/react-components";
import { Clock } from "../components";
import { useQuery } from "@tanstack/react-query";
import { fetchWeather, WeatherQueryKey } from "../server";
import { useLocation } from "../utils";

const useStyles = makeStyles({
  container: {
    display: "flex",
    ...shorthands.gap(tokens.spacingHorizontalM),
  },
});

export default function Home() {
  const styles = useStyles();

  const location = useLocation();

  const { data } = useQuery({
    queryKey: ["weather", location!],
    // TODO: Replace any with the correct type, I'm lazy atm
    queryFn: (context) => fetchWeather(context as any),
    enabled: !!location,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
    retry: false,
  });

  return (
    <div className={styles.container}>
      {JSON.stringify(data)} asd
      {JSON.stringify(location)}
      <Clock />
    </div>
  );
}
