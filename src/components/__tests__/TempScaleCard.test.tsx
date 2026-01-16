import { render, screen } from "@testing-library/react";
import { TempScaleCard } from "../TempScaleCard";
import { celsiusToFahrenheit } from "../../utils/temperature";

const buildWeather = (tempC: number) => {
  const tempF = celsiusToFahrenheit(tempC);
  return {
    tempC,
    tempF,
    feelsLikeC: tempC,
    feelsLikeF: tempF,
    tempMinC: tempC,
    tempMaxC: tempC,
    humidity: 0,
    pressure: 0,
    visibility: 0,
    windSpeed: 0,
    description: "clear",
    condition: "Clear",
    timestamp: 0,
    timezoneOffset: 0,
  };
};

const getMarkerLeft = (container: HTMLElement) => {
  const marker = container.querySelector(".temp-scale-marker") as HTMLElement;
  if (!marker) {
    throw new Error("Expected temperature marker to be rendered.");
  }
  return Number.parseFloat(marker.style.left.replace("%", ""));
};

const getBadgeText = () => {
  const label = screen.getByText("Temperature Classification");
  const badge = label.parentElement?.querySelector("span");
  if (!badge) {
    throw new Error("Expected classification badge to be rendered.");
  }
  return badge.textContent ?? "";
};

describe("TempScaleCard classification scale", () => {
  it("renders all 10 classification zones", () => {
    const { container } = render(
      <TempScaleCard weather={buildWeather(12)} primaryUnit="celsius" />
    );

    const labels = [
      "Freezing",
      "V. Cold",
      "Near Zero",
      "Cold",
      "Cool",
      "Mild",
      "Comfort",
      "Warm",
      "Hot",
      "V. Hot",
    ];

    const labelsContainer = container.querySelector(".temp-scale-labels");
    if (!labelsContainer) {
      throw new Error("Expected temperature labels container to be rendered.");
    }

    labels.forEach((label) => {
      const matches = Array.from(labelsContainer.querySelectorAll("div")).filter(
        (node) => new RegExp(`^${label}$`, "i").test(node.textContent ?? "")
      );
      expect(matches.length).toBeGreaterThan(0);
    });

    const zoneNodes = labelsContainer.querySelectorAll(":scope > div");
    expect(zoneNodes).toHaveLength(10);
  });

  it("classifies extreme cold temperatures below the minimum as Freezing", () => {
    render(<TempScaleCard weather={buildWeather(-30)} primaryUnit="celsius" />);
    expect(getBadgeText()).toMatch(/^freezing$/i);
  });

  it("classifies extreme hot temperatures above the maximum as V. Hot", () => {
    render(<TempScaleCard weather={buildWeather(50)} primaryUnit="celsius" />);
    expect(getBadgeText()).toMatch(/^v\. hot$/i);
  });

  it("updates the classification badge when temperature changes", () => {
    const { rerender } = render(
      <TempScaleCard weather={buildWeather(5)} primaryUnit="celsius" />
    );

    expect(getBadgeText()).toMatch(/^cold$/i);

    rerender(<TempScaleCard weather={buildWeather(22)} primaryUnit="celsius" />);
    expect(getBadgeText()).toMatch(/^comfort$/i);
  });

  it("positions the marker accurately across the range", () => {
    const { container, rerender } = render(
      <TempScaleCard weather={buildWeather(-20)} primaryUnit="celsius" />
    );
    expect(getMarkerLeft(container)).toBeCloseTo(0, 3);

    rerender(<TempScaleCard weather={buildWeather(10)} primaryUnit="celsius" />);
    expect(getMarkerLeft(container)).toBeCloseTo(50, 3);

    rerender(<TempScaleCard weather={buildWeather(40)} primaryUnit="celsius" />);
    expect(getMarkerLeft(container)).toBeCloseTo(100, 3);
  });

  it("clamps the marker when temperatures fall outside the scale", () => {
    const { container, rerender } = render(
      <TempScaleCard weather={buildWeather(-30)} primaryUnit="celsius" />
    );
    expect(getMarkerLeft(container)).toBeCloseTo(0, 3);

    rerender(<TempScaleCard weather={buildWeather(60)} primaryUnit="celsius" />);
    expect(getMarkerLeft(container)).toBeCloseTo(100, 3);
  });

  it("updates tick labels and marker position when switching to Fahrenheit", () => {
    const { container } = render(
      <TempScaleCard weather={buildWeather(0)} primaryUnit="fahrenheit" />
    );

    const freezingLabel = screen.getByText("Freezing").parentElement;
    expect(freezingLabel?.textContent).toMatch(/-4.*F/);

    const markerLeft = getMarkerLeft(container);
    expect(markerLeft).toBeCloseTo(33.33, 2);
  });

  it("keeps the gradient definition consistent", () => {
    const { container } = render(
      <TempScaleCard weather={buildWeather(15)} primaryUnit="celsius" />
    );
    const track = container.querySelector(".temp-scale-track") as HTMLElement;
    expect(track?.style.background).toBe(
      "linear-gradient(90deg, #4589ff 0%, #42be65 30%, #f1c21b 50%, #da1e28 100%)"
    );
  });

  it("keeps the layout responsive with the expected grid classes", () => {
    const { container } = render(
      <TempScaleCard weather={buildWeather(18)} primaryUnit="celsius" />
    );

    const grid = container.querySelector(".grid");
    expect(grid?.className).toMatch(/grid-cols-1/);
    expect(grid?.className).toMatch(/md:grid-cols-2/);
  });
});
