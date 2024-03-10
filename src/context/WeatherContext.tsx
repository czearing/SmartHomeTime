import React from "react";

export type WeatherData = {
  data: {
    timelines: [
      {
        timestep: string;
        endTime: string;
        startTime: string;
        intervals: Array<{
          startTime: string;
          values: {
            weatherCode: number;
            temperature: number;
          };
        }>;
      },
    ];
  };
};

export type WeatherContextValue = {
  weather: WeatherData | null;
  setWeather: React.Dispatch<React.SetStateAction<WeatherData | null>>;
};

export const WeatherContext = React.createContext<WeatherContextValue>({
  weather: null,
  setWeather: () => {},
});

export const WeatherProvider = WeatherContext.Provider;

export const useWeather = () => React.useContext(WeatherContext);
