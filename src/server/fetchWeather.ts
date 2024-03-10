import type { QueryFunctionContext } from "@tanstack/react-query";
import type { WeatherData } from "../context";

export type WeatherQueryKey = [
  _key: string,
  location: { lat: number; lng: number },
];

const cleanWeatherJson = (data: WeatherData) => {
  let cleanedData: any = {};

  const intervals = data.data.timelines[0].intervals;

  for (let interval of intervals) {
    let startTime = interval.startTime;
    let weatherCode = interval.values.weatherCode;
    let temperature = interval.values.temperature;

    let date = startTime.slice(0, 10);

    cleanedData[date] = { weatherCode, temperature };
  }

  // Return the cleanedData object
  return cleanedData;
};

export async function fetchWeather(
  context: QueryFunctionContext<WeatherQueryKey>
): Promise<WeatherData> {
  const [_key, location] = context.queryKey;

  const res = await fetch(
    `https://api.tomorrow.io/v4/timelines?location=${location?.lat},${location?.lng}&fields=weatherCode,temperature&timesteps=1d&units=metric&apikey=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`,

    {
      method: "GET",
    }
  );

  const data = await res.json();

  return cleanWeatherJson(data);
}
