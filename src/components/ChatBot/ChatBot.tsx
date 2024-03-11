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
} from "@fluentui/react-components";
import { useOpenAi } from "../../utils";
import { WeatherContext } from "../../context";
import { weatherCode } from "../../utils";

const useStyles = makeStyles({
  chatBotContainer: {
    display: "flex",
    height: "270px",
    width: "420px",
    ...shorthands.gap(tokens.spacingHorizontalM),
  },
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: "1",
  },
});

export const ChatBot = () => {
  const [currentDateTime, setCurrentDateTime] = React.useState(new Date());

  const { weather } = React.useContext(WeatherContext);
  const styles = useStyles();

  const openAiPromptData = weather && {
    usersName: "Caleb Zearing",
    currentDate: currentDateTime.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    currentTime: currentDateTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    weather: weatherCode[weather?.firstDay?.weatherCode],
    temperature: Math.round(weather?.firstDay?.temperature) + "°F",
    wind: Math.round(weather?.firstDay?.windSpeed) + " mph",
    humidity: Math.round(weather?.firstDay?.humidity) + "%",
    sunSet: new Date(weather?.firstDay?.sunsetTime).toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    ),
    sunRise: new Date(weather?.firstDay?.sunriseTime).toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    ),
    tomorrowSunRise: new Date(
      weather?.dailyData?.intervals[1].values.sunriseTime
    ).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  };

  const mainBotPrompt =
    openAiPromptData &&
    "You are a funny weather bot assistant to Caleb Zearing who is a software engineer.";

  const weatherPrompt =
    openAiPromptData &&
    `Today is ${openAiPromptData.currentDate} around ${openAiPromptData.currentTime}. For today the sun sets at ${openAiPromptData.sunSet} and rises/rised at ${openAiPromptData.sunRise}, tomorrow it will rise ${openAiPromptData.tomorrowSunRise}. The weather is currently ${openAiPromptData.weather} with a temperature of ${openAiPromptData.temperature}, wind speeds of ${openAiPromptData.wind}, and a humidity of  ${openAiPromptData.humidity}.`;

  const openAiPrompt = openAiPromptData && mainBotPrompt + " " + weatherPrompt;

  const { data } = useOpenAi(openAiPrompt!);

  React.useEffect(() => {
    const updateDateTime = () => {
      setCurrentDateTime(new Date());
    };

    updateDateTime();

    const intervalId = setInterval(updateDateTime, 3600000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Card className={styles.chatBotContainer} appearance="filled">
      <CardHeader
        image={<Avatar />}
        header={<Body1Strong>Weather bot</Body1Strong>}
        description={<Caption1>The best weather robot ever</Caption1>}
      />
      {/* {weatherPrompt} */}
      {data ? (
        <Body2>{data?.content}</Body2>
      ) : (
        <div className={styles.centered}>
          <Spinner />
        </div>
      )}
    </Card>
  );
};
