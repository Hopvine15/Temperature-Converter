import { render, screen } from "@testing-library/react";
import { TemperatureCard } from "../TemperatureCard";

const buildWeather = () => ({
  tempC: 10.5,
  tempF: 50.9,
  feelsLikeC: 9.4,
  feelsLikeF: 48.9,
  tempMinC: 9,
  tempMaxC: 12,
  humidity: 45,
  pressure: 1013,
  visibility: 8,
  windSpeed: 12,
  description: "light rain",
  condition: "Rain",
  timestamp: 0,
  timezoneOffset: 0,
});

describe("TemperatureCard", () => {
  it("renders temperatures and condition in celsius", () => {
    render(<TemperatureCard primaryUnit="celsius" weather={buildWeather()} />);

    expect(screen.getByText(`10.5\u00b0`)).toBeInTheDocument();
    expect(screen.getByText("50.9\u00b0F")).toBeInTheDocument();
    expect(screen.getByText("Feels like")).toBeInTheDocument();
    expect(screen.getByText("9.4\u00b0C")).toBeInTheDocument();
    expect(screen.getByText("Light Rain")).toBeInTheDocument();
    expect(screen.getByText(/UTC\+00:00/)).toBeInTheDocument();
  });

  it("renders temperatures in fahrenheit", () => {
    render(<TemperatureCard primaryUnit="fahrenheit" weather={buildWeather()} />);

    expect(screen.getByText(`50.9\u00b0`)).toBeInTheDocument();
    expect(screen.getByText("10.5\u00b0C")).toBeInTheDocument();
    expect(screen.getByText("48.9\u00b0F")).toBeInTheDocument();
  });
});
