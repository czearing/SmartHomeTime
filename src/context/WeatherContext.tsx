import React from "react";
import { WeatherData } from "./WeatherContext.types";

export type WeatherContextValue = {
  weather: WeatherData | null;
};

export const WeatherContext = React.createContext<WeatherContextValue>({
  weather: null,
});

export const WeatherProvider = WeatherContext.Provider;

export const useWeather = () => React.useContext(WeatherContext);
