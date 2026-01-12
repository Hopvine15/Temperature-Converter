import { MetricCards } from "./MetricCards";
import type { WeatherData } from "../types/weather";

type TemperatureUnit = "celsius" | "fahrenheit";

interface TemperatureCardProps {
  primaryUnit: TemperatureUnit;
  weather: WeatherData;
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

const formatCondition = (condition: string) =>
  condition
    .split(" ")
    .map((word) =>
      word.length ? `${word[0].toUpperCase()}${word.slice(1)}` : ""
    )
    .join(" ")
    .trim();

const formatOffset = (offsetSeconds: number) => {
  const sign = offsetSeconds >= 0 ? "+" : "-";
  const totalMinutes = Math.abs(Math.round(offsetSeconds / 60));
  const hours = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (totalMinutes % 60).toString().padStart(2, "0");
  return `${sign}${hours}:${minutes}`;
};

const formatTimestamp = (timestamp: number, offsetSeconds: number) => {
  const safeTimestamp = Number.isFinite(timestamp)
    ? timestamp
    : Date.now() / 1000;
  const localMillis = (safeTimestamp + offsetSeconds) * 1000;
  const localDate = new Date(localMillis);

  const dateTimeLabel = new Intl.DateTimeFormat("en-CA", {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  }).format(localDate);

  const offsetLabel = formatOffset(offsetSeconds);
  return { dateTimeLabel, offsetLabel };
};

export function TemperatureCard({
  primaryUnit,
  weather,
}: TemperatureCardProps) {
  const feelsLikeF = weather.feelsLikeF ?? weather.tempF ?? 0;

  const primaryTemp = primaryUnit === "celsius" ? weather.tempC : weather.tempF;
  const secondaryTemp =
    primaryUnit === "celsius" ? weather.tempF : weather.tempC;
  const feelsPrimary =
    primaryUnit === "celsius" ? weather.feelsLikeC : feelsLikeF;
  const feelsSecondary =
    primaryUnit === "celsius" ? feelsLikeF : weather.feelsLikeC;
  const primaryLabel = primaryUnit === "celsius" ? "C" : "F";
  const secondaryLabel = primaryUnit === "celsius" ? "F" : "C";

  const condition = formatCondition(
    weather.description ?? weather.condition ?? "-"
  );
  const { dateTimeLabel, offsetLabel } = formatTimestamp(
    weather.timestamp,
    weather.timezoneOffset ?? 0
  );

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
      <MetricCards weather={weather} />
      <div className="border border-carbon-gray-20 bg-carbon-gray-20 px-3 py-2 text-xs text-carbon-gray-70">
        <span className="font-semibold text-carbon-gray-90">Last updated:</span>{" "}
        <span className="text-carbon-gray-70">
          {dateTimeLabel} (UTC{offsetLabel})
        </span>
      </div>
    </div>
  );
}
