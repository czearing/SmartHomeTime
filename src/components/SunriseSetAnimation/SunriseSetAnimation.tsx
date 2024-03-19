import * as React from "react";
import Image from "next/image";
import { useWeather } from "src/context";

export const SunriseSetAnimation = () => {
  const { weather } = useWeather();
  const sunriseTime = weather?.firstDay?.sunriseTime;
  const sunSetTime = weather?.firstDay?.sunsetTime;

  const stars = Array.from({ length: 100 }).map((_, index) => ({
    id: index,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
  }));

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
        background:
          "linear-gradient(to top, #000104 0%, #0a0f1a 60%, #1b2b41 100%)",
      }}
    >
      <Image
        src="/icons/weather/static/clear-night.svg"
        width={"80px"}
        height={"80px"}
        style={{ zIndex: 1000 }}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {stars.map((star) => (
          <div
            key={star.id}
            style={{
              position: "absolute",
              top: star.top,
              left: star.left,
              width: "2px",
              height: "2px",
              backgroundColor: "#fff",
              borderRadius: "50%",
            }}
          ></div>
        ))}
      </div>

      {/* <div style={sunStyle}></div> This div represents the sun */}
    </div>
  );
};
