import * as React from "react";
import {
  Card,
  LargeTitle,
  Subtitle1,
  tokens,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";

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

export const Clock = () => {
  const [currentTime, setCurrentTime] = React.useState("");
  const [currentDate, setCurrentDate] = React.useState("");
  const styles = useStyles();

  React.useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");

      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // Convert hour '0' to '12'
      setCurrentTime(`${hours}:${minutes} ${ampm}`);

      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        day: "numeric",
        month: "short",
      };
      setCurrentDate(now.toLocaleDateString(undefined, options));
    };

    const interval = setInterval(updateDateTime, 1000);
    updateDateTime(); // Initial update

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className={styles.clockContainer} appearance="filled">
      <Subtitle1>{currentDate}</Subtitle1>
      <LargeTitle>{currentTime}</LargeTitle>
    </Card>
  );
};
