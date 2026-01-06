interface TemperatureToggleProps {
  primaryUnit: 'celsius' | 'fahrenheit';
  setPrimaryUnit: (unit: 'celsius' | 'fahrenheit') => void;
}

export function TemperatureToggle({ primaryUnit, setPrimaryUnit }: TemperatureToggleProps) {
  return (
    <div className="flex items-center gap-3 bg-carbon-gray-80 px-4 py-1.5 rounded-lg">
      <span className={`text-sm font-medium transition-colors ${primaryUnit === 'celsius' ? 'text-white' : 'text-carbon-gray-50'}`}>
        &deg;C
      </span>
      <button
        type="button"
        onClick={() => setPrimaryUnit(primaryUnit === 'celsius' ? 'fahrenheit' : 'celsius')}
        className="relative w-14 h-7 bg-carbon-gray-70 rounded-full transition-colors duration-200 hover:bg-carbon-gray-60 focus:outline-none"
        aria-label="Toggle temperature unit"
      >
        <div
          className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-carbon-blue-60 shadow-sm transition-transform duration-200 ease-out ${
            primaryUnit === 'fahrenheit' ? 'translate-x-7' : 'translate-x-0'
          }`}
        />
      </button>
      <span className={`text-sm font-medium transition-colors ${primaryUnit === 'fahrenheit' ? 'text-white' : 'text-carbon-gray-50'}`}>
        &deg;F
      </span>
    </div>
  );
}
