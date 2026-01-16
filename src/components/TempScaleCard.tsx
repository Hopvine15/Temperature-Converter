import type { WeatherData } from "../types/weather";
import { Tile } from "@carbon/react";
import { celsiusToFahrenheit } from "../utils/temperature";

type TemperatureUnit = "celsius" | "fahrenheit";

interface TempScaleCardProps {
  weather: WeatherData;
  primaryUnit: TemperatureUnit;
}

export function TempScaleCard({ weather, primaryUnit }: TempScaleCardProps) {
  const scaleMinC = -20;
  const scaleMaxC = 40;
  // Scale segments with both classification and tick labels
  const scaleSegments = [
    { label: "Freezing", min: -20, max: -5, tick: -20 },
    { label: "V. Cold", min: -5, max: 0, tick: -5 },
    { label: "Near Zero", min: 0, max: 5, tick: 0 },
    { label: "Cold", min: 5, max: 10, tick: 5 },
    { label: "Cool", min: 10, max: 15, tick: 10 },
    { label: "Mild", min: 15, max: 20, tick: 15 },
    { label: "Comfort", min: 20, max: 25, tick: 20 },
    { label: "Warm", min: 25, max: 30, tick: 25 },
    { label: "Hot", min: 30, max: 40, tick: 30 },
    { label: "V. Hot", min: 40, max: scaleMaxC, tick: 40 },
  ];

  const primaryTemp =
    primaryUnit === "celsius"
      ? weather.tempC
      : celsiusToFahrenheit(weather.tempC);
  const secondaryTemp =
    primaryUnit === "celsius"
      ? celsiusToFahrenheit(weather.tempC)
      : weather.tempC;
  const primaryLabel = primaryUnit === "celsius" ? "C" : "F";
  const secondaryLabel = primaryUnit === "celsius" ? "F" : "C";

  const scaleMin =
    primaryUnit === "celsius" ? scaleMinC : celsiusToFahrenheit(scaleMinC);
  const scaleMax =
    primaryUnit === "celsius" ? scaleMaxC : celsiusToFahrenheit(scaleMaxC);

  // Keep the marker inside the visible bar
  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);
  const clampedTemp = clamp(primaryTemp, scaleMin, scaleMax);
  const markerPosition =
    ((clampedTemp - scaleMin) / (scaleMax - scaleMin)) * 100;

  // First segment whose max is above the temperature wins
  const classification =
    scaleSegments.find((segment, index) =>
      index === scaleSegments.length - 1
        ? weather.tempC >= segment.min && weather.tempC <= segment.max
        : weather.tempC >= segment.min && weather.tempC < segment.max
    ) ?? scaleSegments[scaleSegments.length - 1];

  const gradientStyle =
    "linear-gradient(90deg, #4589ff 0%, #42be65 30%, #f1c21b 50%, #da1e28 100%)";

  const formatTemp = (value: number, decimals: number) =>
    Number.isFinite(value) ? value.toFixed(decimals) : "--";

  return (
    <div className="space-y-6 h-full">
      <div className="bg-white border border-carbon-gray-20 h-full flex flex-col">
        <div className="border-b border-carbon-gray-20 px-6 py-4">
          <h2 className="text-carbon-gray-100 font-medium text-lg m-0">
            Temperature Scale
          </h2>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Tile className="p-5 py-7">
              <p className="mb-1 text-xs text-carbon-gray-70">
                {primaryUnit === "celsius" ? "Celsius" : "Fahrenheit"}
              </p>
              <p className="text-2xl font-mono text-carbon-gray-100">
                {formatTemp(primaryTemp, 2)}
                {"\u00b0"}
                {primaryLabel}
              </p>
            </Tile>
            <Tile className="p-5 py-7">
              <p className="mb-1 text-xs text-carbon-gray-70">
                {primaryUnit === "celsius" ? "Fahrenheit" : "Celsius"}
              </p>
              <p className="text-2xl font-mono text-carbon-gray-100">
                {formatTemp(secondaryTemp, 2)}
                {"\u00b0"}
                {secondaryLabel}
              </p>
            </Tile>
          </div>
          <div className="mt-6 border border-carbon-gray-20 bg-carbon-gray-10 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-carbon-gray-90 m-0">
                Temperature Classification
              </p>
              <span className="text-xs px-3 py-1 text-white bg-carbon-blue-60">
                {classification.label}
              </span>
            </div>
            <div
              className="temp-scale-track mt-3"
              style={{ background: gradientStyle }}
            >
              {[0, 25, 50, 75, 100].map((pos) => (
                <div
                  key={pos}
                  className="temp-scale-track-marker"
                  style={{ left: `${pos}%` }}
                />
              ))}
              <div
                className="temp-scale-marker"
                style={{ left: `${markerPosition}%` }}
              >
                <div className="temp-marker-tick" />
                <div className="temp-marker-float">
                  <div className="temp-marker-diamond" />
                  <div className="temp-marker-label font-mono font-medium">
                    {formatTemp(primaryTemp, 1)}
                    {"\u00b0"}
                    {primaryLabel}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative mt-10 min-h-9 text-xs text-carbon-gray-80">
              {scaleSegments.map((segment, index) => {
                const displayTick =
                  primaryUnit === "celsius"
                    ? segment.tick
                    : celsiusToFahrenheit(segment.tick);
                const position =
                  ((displayTick - scaleMin) / (scaleMax - scaleMin)) * 100;
                const alignment =
                  index === 0
                    ? "absolute top-0 translate-x-0 whitespace-nowrap text-left"
                    : index === scaleSegments.length - 1
                      ? "absolute top-0 -translate-x-full whitespace-nowrap text-right"
                      : "absolute top-0 -translate-x-1/2 whitespace-nowrap text-center";
                return (
                  <div
                    key={segment.label}
                    className={alignment}
                    style={{ left: `${position}%` }}
                  >
                    <div className="text-carbon-gray-90">{segment.label}</div>
                    <div className="text-carbon-gray-70 font-mono">
                      {formatTemp(displayTick, 0)}
                      {"\u00b0"}
                      {primaryLabel}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Conversion formulas box */}
          <div className="mt-7">
            <Tile
              className="bg-carbon-gray-10 p-4 border-l-2 border-carbon-gray-20"
              style={{ borderLeftColor: "var(--carbon-blue-60)" }}
            >
              <p className="text-md text-carbon-gray-100 mb-2">
                Celsius {"\u2194"} Fahrenheit
              </p>
              <div className="flex flex-col gap-2 text-sm font-mono text-carbon-gray-70">
                <span>
                  {"\u00b0"}F = ({"\u00b0"}C x 9/5) + 32
                </span>
                <span>
                  {"\u00b0"}C = ({"\u00b0"}F - 32) x 5/9
                </span>
              </div>
            </Tile>
          </div>

          {/* Educational / disclaimer text */}
          <div className="mt-6 border border-carbon-gray-20 bg-carbon-gray-20 px-3 py-2 text-xs text-carbon-gray-70">
            <span className="font-semibold text-carbon-gray-90">Note:</span>{" "}
            <span className="text-carbon-gray-70">
              Temperature classifications are approximate and may vary based on
              personal comfort, humidity, wind chill, and regional climate
              adaptation
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}