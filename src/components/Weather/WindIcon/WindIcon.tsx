import * as React from "react";
import type { WindIconProps } from "./WindIcon.types";
import Image from "next/image";

const beaufortScaleBoundaries = [
  1, 3, 7, 12, 18, 24, 31, 38, 46, 54, 63, 72, 100,
];

function mphToBeaufort(mph: number): number {
  for (let i = 0; i < beaufortScaleBoundaries.length; i++) {
    if (mph < beaufortScaleBoundaries[i]) {
      return i;
    }
  }
  return beaufortScaleBoundaries.length;
}

export const WindIcon: React.FC<WindIconProps> = (props) => {
  const { windSpeed } = props;

  const beaufortNumber = mphToBeaufort(windSpeed);

  return (
    <Image
      src={`/icons/wind/wind-beaufort-${beaufortNumber}.svg`}
      alt={`Beaufort scale: ${beaufortNumber}`}
      width={48}
      height={48}
    />
  );
};
