import { render, screen } from "@testing-library/react";
import { MetricCards } from "../MetricCards";

const buildWeather = () => ({
  tempC: 10,
  tempF: 50,
  feelsLikeC: 8,
  feelsLikeF: 46.4,
  tempMinC: 9,
  tempMaxC: 12,
  humidity: 45,
  pressure: 1013,
  visibility: 8,
  windSpeed: 12,
  description: "clear",
  condition: "Clear",
  timestamp: 0,
  timezoneOffset: 0,
});

describe("MetricCards", () => {
  it("renders the four metric tiles with values and units", () => {
    render(<MetricCards weather={buildWeather()} />);

    expect(screen.getByText("Humidity")).toBeInTheDocument();
    expect(screen.getByText("Wind Speed")).toBeInTheDocument();
    expect(screen.getByText("Pressure")).toBeInTheDocument();
    expect(screen.getByText("Visibility")).toBeInTheDocument();

    expect(screen.getByText("45%")).toBeInTheDocument();
    expect(screen.getByText("km/h")).toBeInTheDocument();
    expect(screen.getByText("hPa")).toBeInTheDocument();
    expect(screen.getByText("km")).toBeInTheDocument();
  });
});
