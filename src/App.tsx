import { useState } from "react";
import { Header } from "./components/Header";

type TemperatureUnit = "celsius" | "fahrenheit";

function App() {
  const [primaryUnit, setPrimaryUnit] = useState<TemperatureUnit>("celsius");

  return (
    <div className="min-h-screen bg-carbon-gray-10">
      <Header primaryUnit={primaryUnit} setPrimaryUnit={setPrimaryUnit} />
      <main className="pt-28 md:pt-24 px-4 md:px-8">
        {/* Other Page content... */}
      </main>
    </div>
  );
}

export default App;
