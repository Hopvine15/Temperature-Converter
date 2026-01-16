import { ActionableNotification, Loading, Search, Theme } from "@carbon/react";
import { useState, useEffect, useCallback } from "react";
import type { Location } from "../types/location";
import { COUNTRY_NAME_BY_CODE } from "../data/countries";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

interface SearchBarProps {
  onCitySelect: (location: Location | null) => void;
}

export function SearchBar({ onCitySelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      setActiveIndex(-1);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(searchQuery)}&limit=3&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch city data");
      }

      const data: Location[] = await response.json();
      setSuggestions(data);
      setActiveIndex(data.length > 0 ? 0 : -1);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError(
        "Unable to load city suggestions. Check your connection and try again."
      );
      setSuggestions([]);
      setActiveIndex(-1);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchSuggestions(query);
    }, 300); // 300ms debounce

    return () => clearTimeout(debounceTimer);
  }, [query, fetchSuggestions]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSuggestionSelect = (selectedItem: Location) => {
    // Keep the selection saved in parent state
    onCitySelect(selectedItem);

    // Clear UI
    setQuery("");
    setSuggestions([]);
    setActiveIndex(-1);
    setError(null);
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    setActiveIndex(-1);
    setError(null);
    onCitySelect(null);
  };

  const handleRetry = () => {
    if (!query.trim()) return;
    fetchSuggestions(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % suggestions.length);
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        setActiveIndex(
          (prev) => (prev - 1 + suggestions.length) % suggestions.length
        );
        break;
      }
      case "Enter": {
        // If a suggestion is highlighted, select it
        if (activeIndex >= 0 && activeIndex < suggestions.length) {
          e.preventDefault();
          handleSuggestionSelect(suggestions[activeIndex]);
        }
        break;
      }
      case "Escape": {
        e.preventDefault();
        setSuggestions([]);
        setActiveIndex(-1);
        break;
      }
    }
  };

  const suggestionsId = "city-suggestions";
  const activeDescendantId =
    activeIndex >= 0 ? `city-suggestion-${activeIndex}` : undefined;

  return (
    <Theme theme="g90">
      <div className="flex-1 md:flex-initial min-w-48 sm:min-w-72 relative">
        <Search
          closeButtonLabelText="Clear search input"
          id="city-search"
          size="md"
          labelText="Search for a city"
          placeholder="Search cities..."
          value={query}
          onChange={handleSearchChange}
          onClear={handleClear}
          onKeyDown={handleKeyDown}
          aria-autocomplete="list"
          aria-expanded={suggestions.length > 0}
          aria-controls={suggestionsId}
          aria-activedescendant={activeDescendantId}
          className="bg-carbon-gray-90 text-white rounded-lg"
        />
        {isLoading && (
          <div className="absolute top-full left-0 right-0 bg-white rounded-b-lg shadow-lg p-3 text-sm text-carbon-gray-80 flex items-center gap-2">
            <Loading
              active
              small
              withOverlay={false}
              description="Loading city suggestions"
            />
            <span>Searching cities...</span>
          </div>
        )}
        {error && (
          <div className="absolute top-full left-0 right-0 bg-white rounded-b-lg shadow-lg p-3 text-sm text-carbon-gray-80">
            <ActionableNotification
              inline
              kind="error"
              lowContrast
              title="Search unavailable"
              subtitle={error}
              hideCloseButton
              actionButtonLabel="Retry"
              onActionButtonClick={handleRetry}
            />
          </div>
        )}
        {suggestions.length > 0 && (
          <div
            id={suggestionsId}
            role="listbox"
            aria-label="City suggestions"
            className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg border border-carbon-gray-20 overflow-hidden z-20"
          >
            {suggestions.map((suggestion, index) => {
              const countryName =
                COUNTRY_NAME_BY_CODE[suggestion.country] ?? suggestion.country;
              const isActive = index === activeIndex;

              return (
                <button
                  id={`city-suggestion-${index}`}
                  key={`${suggestion.lat}-${suggestion.lon}-${index}`}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  className={`w-full text-left px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carbon-blue-60 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                    index !== 0 ? "border-t border-carbon-gray-20" : ""
                  } ${isActive ? "bg-carbon-gray-20" : "hover:bg-carbon-gray-20"}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => handleSuggestionSelect(suggestion)}
                >
                  <div className="text-base text-carbon-gray-100">
                    {suggestion.name}
                  </div>
                  <div className="text-sm text-carbon-gray-60">
                    {countryName}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </Theme>
  );
}
