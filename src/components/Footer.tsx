export const Footer = () => {
  return (
    <footer className="bg-carbon-gray-100 py-4 px-4 md:px-16 mt-auto">
      <div className="flex w-full items-center text-carbon-gray-30 justify-between">
        <p className="text-sm">
          2026 Global Weather Monitor. Weather data for demonstration purposes.
        </p>
        <nav className="flex gap-4">
          <a
            href="https://github.com/Hopvine15/Temperature-Converter#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="text-carbon-gray-30 transition-colors hover:text-white"
          >
            Documentation
          </a>
          <a
            href="https://openweathermap.org/current"
            target="_blank"
            rel="noopener noreferrer"
            className="text-carbon-gray-30 transition-colors hover:text-white"
          >
            API Reference
          </a>
        </nav>
      </div>
    </footer>
  );
};
