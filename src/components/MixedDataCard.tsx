import type { WeatherData } from "../types/weather";
import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  Tag,
  Theme,
  Loading,
} from "@carbon/react";

interface MixedDataCardProps {
  weather?: WeatherData | null;
  primaryUnit: "celsius" | "fahrenheit";
  isLoading?: boolean;
}

export function MixedDataCard({
  weather,
  primaryUnit,
  isLoading = false,
}: MixedDataCardProps) {
  const hasWeather = Boolean(weather);
  const headers = [
    { key: "metric", header: "Metric" },
    { key: "value", header: "Value" },
    { key: "type", header: "Type" },
  ];

  const formatTemperature = (celsius: number, fahrenheit: number) => {
    if (!hasWeather) return "--";
    const primary =
      primaryUnit === "celsius"
        ? `${celsius.toFixed(0)}\u00b0C`
        : `${fahrenheit.toFixed(1)}\u00b0F`;
    const secondary =
      primaryUnit === "celsius"
        ? `${fahrenheit.toFixed(1)}\u00b0F`
        : `${celsius.toFixed(0)}\u00b0C`;
    return `${primary} (${secondary})`;
  };

  const formatCondition = (value: string) =>
    value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : "--";

  const formatTimezone = (offsetSeconds: number) => {
    const totalMinutes = Math.round(offsetSeconds / 60);
    const sign = totalMinutes >= 0 ? "+" : "-";
    const absMinutes = Math.abs(totalMinutes);
    const hours = Math.floor(absMinutes / 60);
    const minutes = absMinutes % 60;
    const minuteSuffix = minutes
      ? `:${minutes.toString().padStart(2, "0")}`
      : "";
    return `UTC${sign}${hours}${minuteSuffix}`;
  };

  const windSpeedKph = weather ? weather.windSpeed * 3.6 : 0;

  const rows = [
    {
      id: "current-temp",
      metric: "Current Temperature",
      value: hasWeather
        ? formatTemperature(weather!.tempC, weather!.tempF)
        : "--",
      type: (
        <Tag size="sm" type="gray">
          temperature
        </Tag>
      ),
    },
    {
      id: "feels-like",
      metric: "Feels Like",
      value: hasWeather
        ? formatTemperature(weather!.feelsLikeC, weather!.feelsLikeF)
        : "--",
      type: (
        <Tag size="sm" type="gray">
          temperature
        </Tag>
      ),
    },
    {
      id: "humidity",
      metric: "Humidity",
      value: hasWeather ? `${weather!.humidity}%` : "--",
      type: (
        <Tag size="sm" type="gray">
          percentage
        </Tag>
      ),
    },
    {
      id: "pressure",
      metric: "Atmospheric Pressure",
      value: hasWeather ? `${weather!.pressure} hPa` : "--",
      type: (
        <Tag size="sm" type="gray">
          pressure
        </Tag>
      ),
    },
    {
      id: "wind-speed",
      metric: "Wind Speed",
      value: hasWeather ? `${windSpeedKph.toFixed(1)} km/h` : "--",
      type: (
        <Tag size="sm" type="gray">
          speed
        </Tag>
      ),
    },
    {
      id: "visibility",
      metric: "Visibility",
      value: hasWeather ? `${weather!.visibility.toFixed(1)} km` : "--",
      type: (
        <Tag size="sm" type="gray">
          distance
        </Tag>
      ),
    },
    {
      id: "condition",
      metric: "Condition",
      value: hasWeather
        ? formatCondition(weather!.description || weather!.condition)
        : "--",
      type: (
        <Tag size="sm" type="gray">
          status
        </Tag>
      ),
    },
    {
      id: "timezone",
      metric: "Timezone",
      value: hasWeather ? formatTimezone(weather!.timezoneOffset) : "--",
      type: (
        <Tag size="sm" type="gray">
          time
        </Tag>
      ),
    },
  ];

  return (
    <div className="space-y-6 h-full">
      <div className="bg-white border border-carbon-gray-20 h-full flex flex-col">
        <div className="border-b border-carbon-gray-20 px-6 py-4">
          <h2 className="text-carbon-gray-100 font-medium text-lg m-0">
            Atmospheric Data
          </h2>
        </div>
        <div className="p-6 flex-1 flex flex-col relative">
          <Theme theme="g10">
            <DataTable rows={rows} headers={headers}>
              {({
                rows,
                headers,
                getHeaderProps,
                getRowProps,
                getTableProps,
              }) => (
                <TableContainer>
                  <Table {...getTableProps()}>
                    <TableHead>
                      <TableRow>
                        {headers.map((header) => (
                          <TableHeader
                            {...getHeaderProps({ header })}
                            key={header.key}
                          >
                            {header.header}
                          </TableHeader>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow {...getRowProps({ row })} key={row.id}>
                          {row.cells.map((cell) => (
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </DataTable>
          </Theme>
          <div
            className="bg-carbon-gray-10 p-4 mt-5 border-l-4"
            style={{ borderLeftColor: "#0f62fe" }}
          >
            <span className="mb-1 text-sm font-bold text-carbon-gray-70">
              Current Condition:{" "}
            </span>
            <span className="mb-1 text-sm text-carbon-gray-70">
              {hasWeather
                ? formatCondition(weather!.description || weather!.condition)
                : "Select a city to view live conditions."}
            </span>
            <p className="mt-1 text-xs text-carbon-gray-70">
              {hasWeather
                ? "Live weather data for your selected location. See last updated time above."
                : "Atmospheric metrics will appear once a location is selected."}
            </p>
          </div>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80">
              <Loading
                active
                small
                withOverlay={false}
                description="Loading atmospheric data"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
