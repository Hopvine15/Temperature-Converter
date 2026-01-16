import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { Header } from "./components/Header";
import { Location as LocationPin } from "@carbon/icons-react";
import type { Location } from "./types/location";
import { COUNTRY_NAME_BY_CODE } from "./data/countries";
import { TemperatureCard } from "./components/TemperatureCard";
import { MapCard } from "./components/MapCard";
import type { WeatherData } from "./types/weather";
import { fetchWeather } from "./utils/weatherClient";
import { MixedDataCard } from "./components/MixedDataCard";
import { TempScaleCard } from "./components/TempScaleCard";

type TemperatureUnit = "celsius" | "fahrenheit";

function App() {
  const [primaryUnit, setPrimaryUnit] = useState<TemperatureUnit>("celsius");
  const [location, setLocation] = useState<Location | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  useEffect(() => {
    if (!location) return;
    setIsLoadingWeather(true);
    setWeatherError(null);
    fetchWeather(location.lat, location.lon, "metric")
      .then(setWeather)
      .catch((error) => {
        setWeatherError(error.message);
        setWeather(null);
      })
      .finally(() => setIsLoadingWeather(false));
  }, [location]);

  const countryName = location?.country
    ? (COUNTRY_NAME_BY_CODE[location.country] ?? location.country)
    : undefined;

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

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_560px] gap-4 my-4 items-stretch">
          <div className="bg-white border border-carbon-gray-20 h-full flex flex-col">
            <div className="border-b border-carbon-gray-20 px-6 py-4">
              <h2 className="text-carbon-gray-100 font-medium text-lg m-0">
                Current Conditions
              </h2>
            </div>
            <div className="p-6 flex-1" aria-label="Temperature Information">
              {weather ? (
                <TemperatureCard primaryUnit={primaryUnit} weather={weather} />
              ) : (
                <p className="text-sm text-carbon-gray-70 m-0">
                  {isLoadingWeather
                    ? "Loading current conditions..."
                    : weatherError
                      ? `Unable to load weather data: ${weatherError}`
                      : "Select a city to view current conditions."}
                </p>
              )}
            </div>
          </div>

          {/* Location map */}
          <MapCard
            lat={location?.lat}
            lon={location?.lon}
            locationName={location?.name}
            countryName={countryName}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 mb-24 items-stretch">
          {weather ? (
            <>
              <MixedDataCard weather={weather} primaryUnit={primaryUnit} />
              <TempScaleCard weather={weather} />
            </>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default App;
