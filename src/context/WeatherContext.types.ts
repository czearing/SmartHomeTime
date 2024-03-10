export type WeatherIntervalValues = {
  precipitationProbability: number;
  sunriseTime: string;
  sunsetTime: string;
  temperature: number;
  weatherCode: number;
  windSpeed: number;
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
  sunriseTime: string;
  sunsetTime: string;
};
