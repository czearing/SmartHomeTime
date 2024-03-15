export type WeatherIconProps = {
  /**
   * The weather code to display the appropriate icon
   */
  weatherCode: number;

  /**
   * Whether the icon should be animated
   *
   * @default true
   */
  animated?: boolean;

  /**
   * The size of the icon
   *
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
};
