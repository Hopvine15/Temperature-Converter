import { View, WindyStrong, RainDrop, Fog } from "@carbon/icons-react";

interface MetricCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string | number;
  unit: string;
  color: string;
}

// Individual metric card component - set to be repeating the same structure of stylign per card and then same format of inputs
// to be passed in from parent component - keeps uniform throughout
function MetricCard({
  icon: Icon,
  title,
  value,
  unit,
  color,
}: MetricCardProps) {
  return (
    <div
      className="bg-carbon-gray-10 p-4 border-l-4"
      style={{ borderLeftColor: color }}
    >
      <p className="mb-1 text-xs text-carbon-gray-70">
        <Icon className="inline-block mr-1 w-4 h-4" /> {title}
      </p>
      <p className="text-2xl font-mono text-carbon-gray-100">{value}</p>
      <p className="mt-1 text-xs text-carbon-gray-70">{unit}</p>
    </div>
  );
}

export function MetricCards() {
  const metrics = [
    {
      icon: RainDrop,
      title: "Humidity",
      value: "10%",
      unit: "",
      color: "#0f62fe",
    },
    {
      icon: WindyStrong,
      title: "Wind Speed",
      value: 10,
      unit: "km/h",
      color: "#8a3ffc",
    },
    {
      icon: Fog,
      title: "Pressure",
      value: 1025,
      unit: "hPa",
      color: "#fa4d56",
    },
    {
      icon: View,
      title: "Visibility",
      value: 10,
      unit: "km",
      color: "#0043ce",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
}
