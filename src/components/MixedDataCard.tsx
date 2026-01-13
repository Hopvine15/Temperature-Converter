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
} from "@carbon/react";

interface MixedDataCardProps {
  weather: WeatherData;
  primaryUnit: "celsius" | "fahrenheit";
}

export function MixedDataCard({ weather, primaryUnit }: MixedDataCardProps) {
  const headers = [
    { key: "metric", header: "Metric" },
    { key: "value", header: "Value" },
    { key: "type", header: "Type" },
  ];

  const formatTemperature = (celsius: number, fahrenheit: number) => {
    const primary =
      primaryUnit === "celsius"
        ? `${celsius.toFixed(0)}°C`
        : `${fahrenheit.toFixed(1)}°F`;
    const secondary =
      primaryUnit === "celsius"
        ? `${fahrenheit.toFixed(1)}°F`
        : `${celsius.toFixed(0)}°C`;
    return `${primary} (${secondary})`;
  };

  const formatCondition = (value: string) =>
    value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : "-";

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

  const windSpeedKph = weather.windSpeed * 3.6;

  const rows = [
    {
      id: "current-temp",
      metric: "Current Temperature",
      value: formatTemperature(weather.tempC, weather.tempF),
      type: (
        <Tag size="sm" type="gray">
          temperature
        </Tag>
      ),
    },
    {
      id: "feels-like",
      metric: "Feels Like",
      value: formatTemperature(weather.feelsLikeC, weather.feelsLikeF),
      type: (
        <Tag size="sm" type="gray">
          temperature
        </Tag>
      ),
    },
    {
      id: "humidity",
      metric: "Humidity",
      value: `${weather.humidity}%`,
      type: (
        <Tag size="sm" type="gray">
          percentage
        </Tag>
      ),
    },
    {
      id: "pressure",
      metric: "Atmospheric Pressure",
      value: `${weather.pressure} hPa`,
      type: (
        <Tag size="sm" type="gray">
          pressure
        </Tag>
      ),
    },
    {
      id: "wind-speed",
      metric: "Wind Speed",
      value: `${windSpeedKph.toFixed(1)} km/h`,
      type: (
        <Tag size="sm" type="gray">
          speed
        </Tag>
      ),
    },
    {
      id: "visibility",
      metric: "Visibility",
      value: `${weather.visibility.toFixed(1)} km`,
      type: (
        <Tag size="sm" type="gray">
          distance
        </Tag>
      ),
    },
    {
      id: "condition",
      metric: "Condition",
      value: formatCondition(weather.description || weather.condition),
      type: (
        <Tag size="sm" type="gray">
          status
        </Tag>
      ),
    },
    {
      id: "timezone",
      metric: "Timezone",
      value: formatTimezone(weather.timezoneOffset),
      type: (
        <Tag size="sm" type="gray">
          time
        </Tag>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-carbon-gray-20">
        <div className="border-b border-carbon-gray-20 px-6 py-4">
          <h2 className="text-carbon-gray-100 font-medium text-lg m-0">
            Atmospheric Data
          </h2>
        </div>
        <div className="p-6">
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
        </div>
      </div>
    </div>
  );
}
