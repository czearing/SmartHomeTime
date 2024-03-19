import * as React from "react";
import {
  Card,
  LargeTitle,
  Subtitle1,
  tokens,
  makeStyles,
  shorthands,
  Body1Strong,
  Body1,
  Subtitle2,
  Spinner,
  Subtitle2Stronger,
} from "@fluentui/react-components";
import { WeatherContext } from "../../context";
import { formatTime } from "../../utils";
import { SunriseSetAnimation } from "../SunriseSetAnimation";

const useStyles = makeStyles({
  sunRiseSetContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
    width: "250px",
    ...shorthands.gap(tokens.spacingHorizontalM),
  },
  rowContainer: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
    ...shorthands.gap(tokens.spacingHorizontalS),
  },
});

export const SunRiseSet = () => {
  const { weather } = React.useContext(WeatherContext);
  const [remainingTime, setRemainingTime] = React.useState("");
  const [timeType, setTimeType] = React.useState("");

  const styles = useStyles();

  const updateTimeLeft = () => {
    if (
      weather &&
      weather.firstDay.sunriseTime &&
      weather.firstDay.sunsetTime
    ) {
      const todaySunrise = new Date(weather.firstDay.sunriseTime).getTime();
      const todaySunset = new Date(weather.firstDay.sunsetTime).getTime();
      const tomorrowSunrise = new Date(
        weather.dailyData.intervals[1].values.sunriseTime
      ).getTime();
      const now = new Date().getTime();

      let duration;
      let type;

      if (now < todaySunrise) {
        duration = todaySunrise - now;
        type = "until sunrise";
      } else if (now < todaySunset) {
        duration = todaySunset - now;
        type = "of daylight left";
      } else {
        duration = tomorrowSunrise - now;
        type = "of nighttime left";
      }

      const hoursLeft = Math.floor(duration / (1000 * 60 * 60));
      const minutesLeft = Math.floor(
        (duration % (1000 * 60 * 60)) / (1000 * 60)
      );

      setRemainingTime(`${hoursLeft}h ${minutesLeft}m`);
      setTimeType(type);
    }
  };

  // TODO: We should have the clock share the date and time with this component
  React.useEffect(() => {
    updateTimeLeft();

    const intervalId = setInterval(updateTimeLeft, 10000);

    return () => clearInterval(intervalId);
  }, [weather]);

  return (
    <Card
      className={styles.sunRiseSetContainer}
      appearance="filled"
      style={{ padding: "0px" }}
    >
      {weather ? (
        <>
          <Subtitle2>Sunrise and sunset</Subtitle2>
          <div className={styles.rowContainer}>
            <Subtitle2Stronger>
              {formatTime(weather?.firstDay?.sunriseTime) +
                " & " +
                formatTime(weather?.firstDay?.sunsetTime)}
            </Subtitle2Stronger>
          </div>
          {remainingTime + " " + timeType}
        </>
      ) : (
        <Spinner />
      )}
      {/* <SunriseSetAnimation /> */}
    </Card>
  );
};
