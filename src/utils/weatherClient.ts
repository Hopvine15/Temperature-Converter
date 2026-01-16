import type { WeatherData } from "../types/weather";
import { celsiusToFahrenheit } from "./temperature";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

// Normalise openweather api response into my WeatherData shape and fill safe defaults
function mapToWeatherData(payload: any): WeatherData {
  const tempC = Number(payload?.main?.temp ?? 0);
  const feelsLikeC = Number(payload?.main?.feels_like ?? tempC);

  return {
    tempC,
    tempF: celsiusToFahrenheit(tempC),
    feelsLikeC,
    feelsLikeF: celsiusToFahrenheit(feelsLikeC),
    tempMinC: Number(payload?.main?.temp_min ?? tempC),
    tempMaxC: Number(payload?.main?.temp_max ?? tempC),
    humidity: Number(payload?.main?.humidity ?? 0),
    pressure: Number(payload?.main?.pressure ?? 0),
    visibility: Number((payload?.visibility ?? 0) / 1000),
    windSpeed: Number(payload?.wind?.speed ?? 0),
    windDeg: payload?.wind?.deg,
    windGust: payload?.wind?.gust,
    description: payload?.weather?.[0]?.description ?? "-",
    condition: payload?.weather?.[0]?.main ?? "-",
    icon: payload?.weather?.[0]?.icon,
    clouds: payload?.clouds?.all,
    rain1h: payload?.rain?.["1h"],
    snow1h: payload?.snow?.["1h"],
    timestamp: Number(payload?.dt ?? Date.now() / 1000),
    timezoneOffset: Number(payload?.timezone ?? 0),
  };
}

export async function fetchWeather(
  lat: number,
  lon: number,
  units: "metric",
): Promise<WeatherData> {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`,
  );
  if (!response.ok) {
    throw new Error(`Error fetching weather data: ${response.statusText}`);
  }

  const data = await response.json();
  console.log("Fetched weather data:", data);
  return mapToWeatherData(data);
}
