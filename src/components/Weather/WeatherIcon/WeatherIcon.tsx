import Image from "next/image";
import { WeatherIconProps } from "./WeatherIcon.types";
import { weatherCode } from "src/utils";

const getWeatherIconName = (weatherCode: number) => {
  switch (weatherCode) {
    // Clear
    case 1000:
      return "clear-day";
    case 10000:
      return "clear-day";
    case 10001:
      return "clear-night";
    // Mostly Clear
    // case 1100:
    //   weatherIconName = "clear-day";
    // case 11000:
    //   weatherIconName = "clear-day";
    // case 11001:
    //   weatherIconName = "clear-night";
    // Partly Cloudy
    case 1101:
      return "partly-cloudy-day";
    case 11010:
      return "partly-cloudy-day";
    case 11011:
      return "partly-cloudy-night";
    // Mostly Cloudy
    // case 1102:
    //   weatherIconName = "partly-cloudy-day";
    // case 11020:
    //   weatherIconName = "partly-cloudy-day";
    // case 11021:
    //   weatherIconName = "partly-cloudy-night";
    //  Cloudy
    case 1001:
      return "cloudy";
    case 10010:
      return "cloudy";
    case 10011:
      return "cloudy";
    // Partly Cloudy and Mostly Clear
    // case 1103:
    //   return "cloudy";
    // case 11030:
    //   return "cloudy";
    // case 11031:
    //   return "cloudy";
    //  Light fog
    case 2100:
      return "haze";
    case 21000:
      return "haze";
    case 21001:
      return "haze";
    //  Fog
    case 2000:
      return "fog";
    case 20000:
      return "fog";
    case 20001:
      return "fog";
    //  mostly clear + haze
    case 2101:
      return "haze-day";
    case 21010:
      return "haze-day";
    case 21011:
      return "haze-night";
    //  partially cloudy + haze
    case 2102:
      return "partly-cloudy-day-haze";
    case 21020:
      return "partly-cloudy-day-haze";
    case 21021:
      return "partly-cloudy-night-haze";
    //  mostly cloudy + haze
    case 2103:
      return "partly-cloudy-day-haze";
    case 21030:
      return "partly-cloudy-day-haze";
    case 21031:
      return "partly-cloudy-night-haze";
    //  mostly clear + fog
    case 2106:
      return "fog-day";
    case 21060:
      return "fog-day";
    case 21061:
      return "fog-night";
    //  partially cloudy + fog
    case 2107:
      return "partly-cloudy-day-fog";
    case 21070:
      return "partly-cloudy-day-fog";
    case 21071:
      return "partly-cloudy-night-fog";
    //  mostly cloudy + haze
    case 2108:
      return "partly-cloudy-day-fog";
    case 21080:
      return "partly-cloudy-day-fog";
    case 21081:
      return "partly-cloudy-night-fog";
    // Drizzle
    case 4000:
      return "drizzle";
    case 40000:
      return "drizzle";
    case 40001:
      return "drizzle";
    // Light rain
    case 4200:
      return "drizzle";
    case 42000:
      return "drizzle";
    case 42001:
      return "drizzle";
    // Rain
    case 4001:
      return "rain";
    case 40010:
      return "rain";
    case 40011:
      return "rain";
    // Heavy rain
    case 4201:
      return "rain";
    case 42010:
      return "rain";
    case 42011:
      return "rain";
    // Drizzle + mostly clear
    case 4203:
      return "partly-cloudy-day-drizzle";
    case 42030:
      return "partly-cloudy-day-drizzle";
    case 42031:
      return "partly-cloudy-night-drizzle";
    // Drizzle + partially cloudy
    case 4204:
      return "partly-cloudy-day-drizzle";
    case 42040:
      return "partly-cloudy-day-drizzle";
    case 42041:
      return "partly-cloudy-night-drizzle";
    // Drizzle + mostly cloudy
    case 4205:
      return "drizzle";
    case 42050:
      return "drizzle";
    case 42051:
      return "drizzle";
    // Drizzle + mostly clear
    case 4203:
      return "partly-cloudy-day-drizzle";
    case 42030:
      return "partly-cloudy-day-drizzle";
    case 42031:
      return "partly-cloudy-night-drizzle";
    // Drizzle + partially cloudy
    case 4204:
      return "partly-cloudy-day-drizzle";
    case 42040:
      return "partly-cloudy-day-drizzle";
    case 42041:
      return "partly-cloudy-night-drizzle";
    // Drizzle + mostly cloudy
    case 4205:
      return "drizzle";
    case 42050:
      return "drizzle";
    case 42051:
      return "drizzle";
    // Light Rain + mostly clear
    case 4213:
      return "partly-cloudy-day-drizzle";
    case 42130:
      return "partly-cloudy-day-drizzle";
    case 42131:
      return "partly-cloudy-night-drizzle";
    // Light Rain + partially cloudy
    case 4214:
      return "partly-cloudy-day-drizzle";
    case 42140:
      return "partly-cloudy-day-drizzle";
    case 42141:
      return "partly-cloudy-night-drizzle";
    // Light Rain + mostly cloudy
    case 4215:
      return "drizzle";
    case 42150:
      return "drizzle";
    case 42151:
      return "drizzle";
    // Rain + mostly clear
    case 4209:
      return "partly-cloudy-day-rain";
    case 42090:
      return "partly-cloudy-day-rain";
    case 42091:
      return "partly-cloudy-night-rain";
    // Rain + partially cloudy
    case 4208:
      return "partly-cloudy-day-rain";
    case 42080:
      return "partly-cloudy-day-rain";
    case 42081:
      return "partly-cloudy-night-rain";
    // Rain + mostly cloudy
    case 4210:
      return "rain";
    case 42100:
      return "rain";
    case 42101:
      return "rain";
    // Heavy rain + mostly clear
    case 4211:
      return "partly-cloudy-day-rain";
    case 42110:
      return "partly-cloudy-day-rain";
    case 42111:
      return "partly-cloudy-night-rain";
    // Heavy rain + partially cloudy
    case 4202:
      return "partly-cloudy-day-rain";
    case 42020:
      return "partly-cloudy-day-rain";
    case 42021:
      return "partly-cloudy-night-rain";
    // Heavy rain + mostly cloudy
    case 4212:
      return "rain";
    case 42120:
      return "rain";
    case 42121:
      return "rain";
    // Flurries
    case 5001:
      return "sleet";
    case 50010:
      return "sleet";
    case 50011:
      return "sleet";
    // Light snow
    case 5100:
      return "snow";
    case 51000:
      return "snow";
    case 51001:
      return "snow";
    // Snow
    case 5000:
      return "snow";
    case 50000:
      return "snow";
    case 50001:
      return "snow";
    // Heavy snow
    case 5101:
      return "snow";
    case 51010:
      return "snow";
    case 51011:
      return "snow";
  }
};

/**
 * Displays the appropriate weather icon based on the weather code
 */
export const WeatherIcon = (props: WeatherIconProps) => {
  const { weatherCode } = props;

  let weatherIconName = getWeatherIconName(weatherCode);

  return (
    <Image
      src={`/icons/weather/${weatherIconName}.svg`}
      width={64}
      height={64}
    />
  );
};
