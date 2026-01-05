import { Button, Tag } from "@carbon/react";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="weather-card">
          <h1
            className="text-4xl font-bold mb-2"
            style={{ color: "var(--carbon-blue-60)" }}
          >
            Temperature Converter
          </h1>
          <p className="!mb-4" style={{ color: "var(--carbon-gray-70)" }}>
            React + TypeScript + Vite + Carbon + Tailwind v4 ✅
          </p>

          <div className="flex gap-6 items-center">
            <Button kind="primary">Carbon Button</Button>
            <Tag type="blue">Working! </Tag>
          </div>
        </div>

        <div className="weather-card">
          <h2 className="text-2xl font-bold !mb-4">Color Test</h2>

          <div className="flex gap-2 flex-wrap">
            <div
              className="w-16 h-16 rounded shadow bg-carbon-blue-60"
            ></div>
            <div
              className="w-16 h-16 rounded shadow bg-carbon-gray-100"
            ></div>
            <div
              className="w-16 h-16 rounded shadow bg-temp-freezing"
            ></div>
            <div
              className="w-16 h-16 rounded shadow bg-temp-mild"
            ></div>
            <div
              className="w-16 h-16 rounded shadow bg-temp-hot"
            ></div>
            <div
              className="w-16 h-16 rounded shadow bg-temp-extreme"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
