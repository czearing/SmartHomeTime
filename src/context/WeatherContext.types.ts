export type WeatherIntervalValues = {
  precipitationProbability: number;
  sunriseTime: string;
  sunsetTime: string;
  temperature: number;
  weatherCode: number;
  windSpeed: number;
  humidity: number;
};

export type WeatherInterval = {
  startTime: string;
  values: WeatherIntervalValues;
};

export type WeatherTimeline = {
  timestep: string;
  endTime: string;
  startTime: string;
  intervals: WeatherInterval[];
};

export type WeatherData = {
  dailyData: WeatherTimeline;
  firstDay: WeatherIntervalValues;
};

export type WeatherContextValue = {
  weather: WeatherData | null;
};
