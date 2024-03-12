import type { QueryFunctionContext } from "@tanstack/react-query";
import type { WeatherData } from "../../context";
import queryString from "query-string";

type Location = { lat: number; lng: number };

export type WeatherQueryKey = [_key: string, location: Location];

const createWeatherQuery = (incomingLocation: Location) => {
  const getTimelineURL = "https://api.tomorrow.io/v4/timelines";
  const apikey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  const fields = [
    "weatherCode",
    "weatherCodeDay",
    "weatherCodeNight",
    "temperature",
    "sunriseTime",
    "sunsetTime",
    "precipitationProbability",
    "windSpeed",
    "humidity",
  ];

  const units = "imperial";
  const timesteps = ["current", "1h", "1d"];
  const location = [incomingLocation.lat, incomingLocation.lng];
  const timezone = "auto";

  const now = new Date();
  const startTime = now.toISOString();
  const endTime = new Date(
    now.getTime() + 24 * 60 * 60 * 1000 * 2
  ).toISOString();

  const getTimelineParameters = queryString.stringify(
    {
      apikey,
      location,
      fields,
      units,
      timesteps,
      timezone,
      startTime,
      endTime,
    },
    { arrayFormat: "comma" }
  );

  return getTimelineURL + "?" + getTimelineParameters;
};

export async function fetchWeather(
  context: QueryFunctionContext<WeatherQueryKey>
): Promise<WeatherData> {
  const [_key, location] = context.queryKey;

  const res = await fetch(createWeatherQuery(location), {
    method: "GET",
  });

  const data = await res.json();

  const dailyData = data.data.timelines.find(
    (timeline: any) => timeline?.timestep === "1d"
  );

  const firstDay = dailyData.intervals[0].values;

  return { dailyData, firstDay };
}
