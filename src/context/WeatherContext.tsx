import React from "react";
import { WeatherContextValue } from "./WeatherContext.types";

export const WeatherContext = React.createContext<WeatherContextValue>({
  weather: null,
});

export const WeatherProvider = WeatherContext.Provider;

export const useWeather = () => React.useContext(WeatherContext);
