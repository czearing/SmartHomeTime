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
import Image from "next/image";

const iconSize = 48;

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
    case 4200:
      return (
        <Image
          src="/image/slightlyRainy.svg"
          alt="Slightly rainy"
          height={iconSize}
          width={iconSize}
        />
      );
    case 4001:
    case 4201:
      return (
        <Image
          src="/image/rainy.svg"
          alt="Slightly rainy"
          height={iconSize}
          width={iconSize}
        />
      );
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
