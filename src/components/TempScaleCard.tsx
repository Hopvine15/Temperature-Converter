import type { WeatherData } from "../types/weather";
import { Tile } from "@carbon/react";

interface TempScaleCardProps {
  weather: WeatherData;
}

export function TempScaleCard({ weather }: TempScaleCardProps) {

  return (
    <div className="space-y-6">
      <div className="bg-white border border-carbon-gray-20">
        <div className="border-b border-carbon-gray-20 px-6 py-4">
          <h2 className="text-carbon-gray-100 font-medium text-lg m-0">
            Temperature Scale
          </h2>
        </div>
        <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
                <Tile className="p-4">
                  <p className="mb-1 text-xs text-carbon-gray-70">Celsius</p>
                  <p className="text-2xl font-mono text-carbon-gray-100">
                    {weather.tempC}°C
                  </p>
                </Tile>
                <Tile className="p-4">
                  <p className="mb-1 text-xs text-carbon-gray-70">Fahrenheit</p>
                  <p className="text-2xl font-mono text-carbon-gray-100">
                    {weather.tempF}°F
                  </p>
                </Tile>
            </div>
        </div>
      </div>
    </div>
  );
}
