import { Cloud } from "@carbon/icons-react";
import { Header as CarbonHeader, Theme } from "@carbon/react";
import { TemperatureToggle } from "./TemperatureToggle";
import { SearchBar } from "./SearchBar";
import type { Location } from "../types/location";

type TemperatureUnit = "celsius" | "fahrenheit";

interface HeaderProps {
  primaryUnit: TemperatureUnit;
  setPrimaryUnit: (unit: TemperatureUnit) => void;
  onLocationChange: (location: Location | null) => void;
}

export function Header({
  primaryUnit,
  setPrimaryUnit,
  onLocationChange,
}: HeaderProps) {
  return (
    <Theme theme="g100">
      <CarbonHeader
        aria-label="Global Weather Monitor"
        className="min-h-35 md:min-h-18 sticky top-0 z-50"
      >
        <div className="w-full max-w-6xl mx-auto! px-3 sm:px-4 md:px-8 py-5 md:py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Left: Icon + Title + Subtitle */}
            <div className="flex min-w-0 items-start sm:items-center gap-3">
              <Cloud className="w-6 h-6" />
              <div className="leading-tight">
                <h1 className="m-0 text-base md:text-lg leading-5 md:leading-6">
                  Global Weather Monitor
                </h1>
                <p className="m-0 text-xs sm:text-sm text-carbon-gray-30 leading-5 md:leading-6">
                  Real-time temperature analysis and monitoring
                </p>
              </div>
            </div>

            {/* Right: Temperature Toggle + Search */}
            <div className="flex w-full items-center gap-3 sm:gap-4 md:min-w-105 md:w-auto">
              <TemperatureToggle
                primaryUnit={primaryUnit}
                setPrimaryUnit={setPrimaryUnit}
              />
              <SearchBar onCitySelect={onLocationChange} />
            </div>
          </div>
        </div>
      </CarbonHeader>
    </Theme>
  );
}
