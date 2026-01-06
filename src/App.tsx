import { useState } from "react";
import { Header } from "./components/Header";
import type { Location } from "./types/location";

type TemperatureUnit = "celsius" | "fahrenheit";

function App() {
  const [primaryUnit, setPrimaryUnit] = useState<TemperatureUnit>("celsius");
  const [location, setLocation] = useState<Location | null>(null);

  return (
    <div className="min-h-screen bg-carbon-gray-10">
      <Header primaryUnit={primaryUnit} setPrimaryUnit={setPrimaryUnit} onLocationChange={setLocation} />
      <main className="pt-28 md:pt-24 px-4 md:px-8">
        {/* Other Page content... */}
        <p>{location ? `${location.name}, ${location.country}` : "No location selected"}</p>
      </main>
    </div>
  );
}

export default App;
