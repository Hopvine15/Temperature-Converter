import { useState } from "react";
import { Header } from "./components/Header";
import { Location as LocationPin } from "@carbon/icons-react";
import type { Location } from "./types/location";
import { COUNTRY_NAME_BY_CODE } from "./data/countries";

type TemperatureUnit = "celsius" | "fahrenheit";

function App() {
  const [primaryUnit, setPrimaryUnit] = useState<TemperatureUnit>("celsius");
  const [location, setLocation] = useState<Location | null>(null);

  const countryName = location?.country
    ? (COUNTRY_NAME_BY_CODE[location?.country] ?? location.country)
    : undefined;

  return (
    <div className="min-h-screen bg-carbon-gray-10">
      <Header
        primaryUnit={primaryUnit}
        setPrimaryUnit={setPrimaryUnit}
        onLocationChange={setLocation}
      />
      <main className="pt-12 md:pt-12 px-4 md:px-16">
        {/* Other Page content... */}
        <div className="bg-white border border-carbon-gray-20 mb-4">
          <div className="px-6 py-4 flex items-center gap-2">
            <LocationPin className="w-5 h-5 text-carbon-blue-60" />
            <h2 className="text-carbon-gray-100 text-base">
              {location?.name}, {countryName}
            </h2>
            <span className="text-sm text-carbon-gray-70">
              ({location?.lat.toFixed(2)}°, {location?.lon.toFixed(2)}°)
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
