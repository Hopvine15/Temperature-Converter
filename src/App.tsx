import { useCallback, useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { Header } from "./components/Header";
import { Location as LocationPin } from "@carbon/icons-react";
import { ActionableNotification, Loading } from "@carbon/react";
import type { Location } from "./types/location";
import { COUNTRY_NAME_BY_CODE } from "./data/countries";
import { TemperatureCard } from "./components/TemperatureCard";
import { MapCard } from "./components/MapCard";
import type { WeatherData } from "./types/weather";
import { fetchWeather } from "./utils/weatherClient";
import { MixedDataCard } from "./components/MixedDataCard";
import { TempScaleCard } from "./components/TempScaleCard";
import { Footer } from "./components/Footer";

type TemperatureUnit = "celsius" | "fahrenheit";
const TEMPERATURE_UNIT_STORAGE_KEY = "temperatureUnit";

const getWeatherErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    if (message.includes("not found")) {
      return "Weather data was not found for that location.";
    }
    if (message.includes("failed to fetch")) {
      return "Network issue while loading weather data. Please try again.";
    }
  }
  return "Unable to load weather data right now. Please try again.";
};

function App() {
  const [primaryUnit, setPrimaryUnit] = useState<TemperatureUnit>(() => {
    if (typeof window === "undefined") return "celsius";
    const savedUnit = window.localStorage.getItem(TEMPERATURE_UNIT_STORAGE_KEY);
    return savedUnit === "celsius" || savedUnit === "fahrenheit"
      ? savedUnit
      : "celsius";
  });
  const [location, setLocation] = useState<Location | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const weatherAbortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    window.localStorage.setItem(TEMPERATURE_UNIT_STORAGE_KEY, primaryUnit);
  }, [primaryUnit]);

  const loadWeather = useCallback((targetLocation: Location) => {
    const controller = new AbortController();
    weatherAbortRef.current?.abort();
    weatherAbortRef.current = controller;

    setIsLoadingWeather(true);
    setWeatherError(null);

    fetchWeather(
      targetLocation.lat,
      targetLocation.lon,
      "metric",
      controller.signal
    )
      .then((data) => {
        if (weatherAbortRef.current !== controller) return;
        setWeather(data);
      })
      .catch((error) => {
        if (weatherAbortRef.current !== controller) return;
        if (error instanceof Error && error.name === "AbortError") return;
        setWeatherError(getWeatherErrorMessage(error));
        setWeather(null);
      })
      .finally(() => {
        if (weatherAbortRef.current === controller) {
          setIsLoadingWeather(false);
        }
      });
  }, []);

  useEffect(() => {
    if (!location) {
      setWeather(null);
      setWeatherError(null);
      return;
    }
    loadWeather(location);
  }, [location, loadWeather]);

  useEffect(() => {
    return () => weatherAbortRef.current?.abort();
  }, []);

  const handleRetryWeather = () => {
    if (!location) return;
    loadWeather(location);
  };

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
            <section
              className="p-6 flex-1 relative"
              aria-label="Temperature information"
            >
              {weatherError && (
                <div className="mb-4">
                  <ActionableNotification
                    inline
                    kind="error"
                    lowContrast
                    title="Weather data unavailable"
                    subtitle={weatherError}
                    hideCloseButton
                    actionButtonLabel="Retry"
                    onActionButtonClick={handleRetryWeather}
                  />
                </div>
              )}
              {weather ? (
                <TemperatureCard primaryUnit={primaryUnit} weather={weather} />
              ) : (
                <p className="text-sm text-carbon-gray-70 m-0">
                  {isLoadingWeather
                    ? "Loading current conditions..."
                    : "Select a city to view current conditions."}
                </p>
              )}
              {isLoadingWeather && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                  <Loading
                    active
                    small
                    withOverlay={false}
                    description="Loading current conditions"
                  />
                </div>
              )}
            </section>
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
          <MixedDataCard
            weather={weather}
            primaryUnit={primaryUnit}
            isLoading={isLoadingWeather}
          />
          <TempScaleCard
            weather={weather}
            primaryUnit={primaryUnit}
            isLoading={isLoadingWeather}
          />
        </div>
      </main>
      {/* Kept outside the main to avoid position issues with padding from rest of main */}
      <Footer />
    </div>
  );
}

export default App;
