import { MetricCards } from "./MetricCards";
type TemperatureUnit = "celsius" | "fahrenheit";

interface TemperatureCardProps {
  primaryUnit: TemperatureUnit;
  temperatureC: number;
  temperatureF: number;
  feelsLikeC: number;
  feelsLikeF: number;
  condition: string;
}

const formatTemp = (value: number) =>
  Number.isInteger(value) ? value.toString() : value.toFixed(1);

const getConditionColor = (condition: string) => {
  const c = condition.toLowerCase();
  if (c.includes("sun") || c.includes("clear")) return "#f1c21b";
  if (c.includes("cloud")) return "#8a8a8a";
  if (c.includes("rain") || c.includes("storm")) return "#0f62fe";
  if (c.includes("snow")) return "#a6c8ff";
  return "#6f6f6f";
};

export function TemperatureCard({
  primaryUnit,
  temperatureC,
  temperatureF,
  feelsLikeC,
  feelsLikeF,
  condition,
}: TemperatureCardProps) {
  const primaryTemp = primaryUnit === "celsius" ? temperatureC : temperatureF;
  const secondaryTemp = primaryUnit === "celsius" ? temperatureF : temperatureC;
  const feelsPrimary = primaryUnit === "celsius" ? feelsLikeC : feelsLikeF;
  const feelsSecondary = primaryUnit === "celsius" ? feelsLikeF : feelsLikeC;

  const primaryLabel = primaryUnit === "celsius" ? "C" : "F";
  const secondaryLabel = primaryUnit === "celsius" ? "F" : "C";

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-baseline gap-4">
            <span className="text-6xl text-carbon-gray-100 font-mono leading-none">
              {formatTemp(primaryTemp)}
              {"\u00b0"}
            </span>
            <div className="leading-tight">
              <p className="text-2xl text-carbon-gray-70 m-0">{primaryLabel}</p>
              <p className="text-xl text-carbon-gray-70 m-0">
                {formatTemp(secondaryTemp)}
                {"\u00b0"}
                {secondaryLabel}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getConditionColor(condition) }}
              aria-hidden="true"
            />
            <p className="text-xl text-carbon-gray-100 m-0">{condition}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-carbon-gray-70 mb-1">Feels like</p>
          <p className="text-2xl text-carbon-gray-100 font-mono m-0 leading-tight">
            {formatTemp(feelsPrimary)}
            {"\u00b0"}
            {primaryLabel}
          </p>
          <p className="text-sm text-carbon-gray-60 m-0">
            {formatTemp(feelsSecondary)}
            {"\u00b0"}
            {secondaryLabel}
          </p>
        </div>
      </div>
      <MetricCards />
      <div className="border border-carbon-gray-20 bg-carbon-gray-20 px-3 py-2 text-xs text-carbon-gray-70">
        <span className="font-semibold text-carbon-gray-90">Last updated:</span>{" "}
        <span className="text-carbon-gray-70">
          2025-01-09 12:00 GMT (UTC+0)
        </span>
      </div>
    </div>
  );
}
