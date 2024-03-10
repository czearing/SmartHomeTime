import {
  WeatherSunnyRegular,
  WeatherPartlyCloudyDayRegular,
  WeatherCloudyRegular,
  WeatherRainRegular,
  WeatherDrizzleRegular,
  WeatherFogRegular,
  WeatherRainSnowRegular,
  WeatherSnowflakeRegular,
  WeatherHailDayRegular,
  WeatherThunderstormRegular,
} from "@fluentui/react-icons";

const iconSize = 48;
// export const weatherCode = {
//   "0": "Unknown",
//   "1000": "Clear, Sunny",
//   "1100": "Mostly Clear",
//   "1101": "Partly Cloudy",
//   "1102": "Mostly Cloudy",
//   "1001": "Cloudy",
//   "2000": "Fog",
//   "2100": "Light Fog",
//   "4000": "Drizzle",
//   "4001": "Rain",
//   "4200": "Light Rain",
//   "4201": "Heavy Rain",
//   "5000": "Snow",
//   "5001": "Flurries",
//   "5100": "Light Snow",
//   "5101": "Heavy Snow",
//   "6000": "Freezing Drizzle",
//   "6001": "Freezing Rain",
//   "6200": "Light Freezing Rain",
//   "6201": "Heavy Freezing Rain",
//   "7000": "Ice Pellets",
//   "7101": "Heavy Ice Pellets",
//   "7102": "Light Ice Pellets",
//   "8000": "Thunderstorm",
// };

type WeatherIconProps = { weatherCode: number };

export const WeatherIcon = (props: WeatherIconProps) => {
  const { weatherCode } = props;

  switch (weatherCode) {
    case 1000:
    case 1100:
      return <WeatherSunnyRegular fontSize={iconSize} />;
    case 1101:
      return <WeatherPartlyCloudyDayRegular fontSize={iconSize} />;
    case 1001:
    case 1102:
      return <WeatherCloudyRegular fontSize={iconSize} />;
    case 2000:
    case 2100:
      return <WeatherFogRegular fontSize={iconSize} />;
    case 4000:
      return <WeatherDrizzleRegular fontSize={iconSize} />;
    case 4001:
    case 4200:
    case 4201:
      return <WeatherRainRegular fontSize={iconSize} />;
    case 5000:
    case 5100:
    case 5101:
      return <WeatherSnowflakeRegular fontSize={iconSize} />;
    case 5001:
      return <WeatherRainSnowRegular fontSize={iconSize} />;
    case 7000:
    case 7101:
    case 7102:
      return <WeatherHailDayRegular fontSize={iconSize} />;
    case 8000:
      return <WeatherThunderstormRegular fontSize={iconSize} />;
    default:
      return <span />;
  }
};
