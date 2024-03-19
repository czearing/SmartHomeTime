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
import { useOpenAi, usePersona } from "../../utils";
import { WeatherContext } from "../../context";
import { weatherCode } from "../../utils";

const useStyles = makeStyles({
  chatBotContainer: {
    display: "flex",
    height: "100%",
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

  // const { persona } = usePersona(
  //   `You are a chat bot that is instructed to create persona prompts for chatbots.`,
  //   `It should be in the following JSON format: {name: "persona name", description: "5-6 word brief description", prompt: "the persona prompt"}`
  // );

  const mainBotPrompt =
    openAiPromptData &&
    "You are a not very helpful chat bot that only can discuss frogs and seagulls and what they are doing today and nothing related to the weather";

  const weatherPrompt =
    openAiPromptData &&
    `Today is ${openAiPromptData.currentTime} around ${openAiPromptData.currentTime}. The weather is currently ${openAiPromptData.weather} with a temperature of ${openAiPromptData.temperature}, wind speeds of ${openAiPromptData.wind}, and a humidity of  ${openAiPromptData.humidity}.`;

  const openAiPrompt = openAiPromptData && mainBotPrompt + " " + weatherPrompt;

  const instructions =
    "Briefly tell me something cool about today and a concise overview of the weather.";

  const { data } = useOpenAi(openAiPrompt!, instructions);

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
      {/* {JSON.stringify(persona)} */}
      <CardHeader
        image={<Avatar />}
        header={<Body1Strong>Weather bot</Body1Strong>}
        description={<Caption1>The best weather robot ever</Caption1>}
      />
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
