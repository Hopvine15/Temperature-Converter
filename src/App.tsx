import { useState } from "react";
import { Header } from "./components/Header";
import { Location as LocationPin } from "@carbon/icons-react";
import type { Location } from "./types/location";
import { COUNTRY_NAME_BY_CODE } from "./data/countries";
import { TemperatureCard } from "./components/TemperatureCard";

type TemperatureUnit = "celsius" | "fahrenheit";

function App() {
  const [primaryUnit, setPrimaryUnit] = useState<TemperatureUnit>("celsius");
  const [location, setLocation] = useState<Location | null>(null);

  const countryName = location?.country
    ? COUNTRY_NAME_BY_CODE[location.country] ?? location.country
    : undefined;

  const mockConditions = {
    temperatureC: 18,
    temperatureF: 64.4,
    feelsLikeC: 16,
    feelsLikeF: 60.8,
    condition: "Partly Cloudy",
  };

  return (
    <div className="min-h-screen bg-carbon-gray-10">
      <Header
        primaryUnit={primaryUnit}
        setPrimaryUnit={setPrimaryUnit}
        onLocationChange={setLocation}
      />
      <main className="pt-8 px-4 md:px-16">
        <div className="bg-white border border-carbon-gray-20 mb-4">
          <div className="px-6 py-4 flex items-center gap-2">
            <LocationPin className="w-5 h-5 text-carbon-blue-60" />
            <h2 className="text-carbon-gray-100 text-base">
              {location?.name ?? "Select a city"}, {countryName ?? ""}
            </h2>
            <span className="text-sm text-carbon-gray-70">
              ({location?.lat?.toFixed(2) ?? "--"}
              {"\u00b0"}, {location?.lon?.toFixed(2) ?? "--"}
              {"\u00b0"})
            </span>
          </div>
        </div>

        <div className="my-4">
          <div className="bg-white border border-carbon-gray-20">
            <div className="border-b border-carbon-gray-20 px-6 py-4">
              <h2 className="text-carbon-gray-100 text-lg m-0">
                Current Conditions
              </h2>
            </div>
            <div className="p-6" aria-label="Temperature Information">
              <TemperatureCard primaryUnit={primaryUnit} {...mockConditions} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
