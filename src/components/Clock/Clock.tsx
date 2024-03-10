import * as React from "react";
import { Card, tokens, makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  clockContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
    width: "250px",
  },
  clock: {
    fontSize: tokens.fontSizeHero900,
  },
});

export const Clock = () => {
  const [currentTime, setCurrentTime] = React.useState("");
  const styles = useStyles();

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      setCurrentTime(`${hours}:${minutes}:${seconds} ${ampm}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className={styles.clockContainer} appearance="filled">
      <div className={styles.clock}>{currentTime}</div>
    </Card>
  );
};
