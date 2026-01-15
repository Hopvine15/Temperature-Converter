import type { WeatherData } from "../types/weather";
import { Tile } from "@carbon/react";

interface TempScaleCardProps {
  weather: WeatherData;
}

export function TempScaleCard({ weather }: TempScaleCardProps) {
  const scaleMin = -20;
  const scaleMax = 40;
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
    { label: "V. Hot", min: 40, max: scaleMax, tick: 40 },
  ];

  // Keep the marker inside the visible bar
  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);
  const clampedTemp = clamp(weather.tempC, scaleMin, scaleMax);
  const markerPosition =
    ((clampedTemp - scaleMin) / (scaleMax - scaleMin)) * 100;

  // First segment whose max is above the temperature wins
  const classification =
    scaleSegments.find((segment, index) =>
      index === scaleSegments.length - 1
        ? clampedTemp >= segment.min && clampedTemp <= segment.max
        : clampedTemp >= segment.min && clampedTemp < segment.max
    ) ?? scaleSegments[scaleSegments.length - 1];

  const gradientStyle =
    "linear-gradient(90deg, #4589ff 0%, #42be65 30%, #f1c21b 50%, #da1e28 100%)";

  return (
    <div className="space-y-6">
      <div className="bg-white border border-carbon-gray-20">
        <div className="border-b border-carbon-gray-20 px-6 py-4">
          <h2 className="text-carbon-gray-100 font-medium text-lg m-0">
            Temperature Scale
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Tile className="p-4">
              <p className="mb-1 text-xs text-carbon-gray-70">Celsius</p>
              <p className="text-2xl font-mono text-carbon-gray-100">
                {weather.tempC.toFixed(1)}°C
              </p>
            </Tile>
            <Tile className="p-4">
              <p className="mb-1 text-xs text-carbon-gray-70">Fahrenheit</p>
              <p className="text-2xl font-mono text-carbon-gray-100">
                {weather.tempF.toFixed(1)}°F
              </p>
            </Tile>
          </div>
          <div className="mt-6 rounded border border-carbon-gray-20 bg-carbon-gray-10 p-4">
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
                    {weather.tempC.toFixed(1)}°C
                  </div>
                </div>
              </div>
            </div>
            <div className="relative mt-10 min-h-9 text-xs text-carbon-gray-80">
              {scaleSegments.map((segment, index) => {
                const position =
                  ((segment.tick - scaleMin) / (scaleMax - scaleMin)) * 100;
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
                      {segment.tick}° 
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
