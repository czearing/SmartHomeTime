import * as React from "react";
import type { UvIconProps } from "./UvIcon.types";
import Image from "next/image";

export const UvIcon: React.FC<UvIconProps> = (props) => {
  const { uvIndex } = props;

  console.log(uvIndex);
  return (
    <Image
      src={
        uvIndex === 0
          ? `/icons/uv/uv-index-1.svg`
          : `/icons/uv/uv-index-${uvIndex}.svg`
      }
      alt={`UV index: ${uvIndex}`}
      width={32}
      height={32}
    />
  );
};
