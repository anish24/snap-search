"use client";

import { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";

type Region = {
  name: string;
  country?: string;
  lat?: number;
  lng?: number;
};

interface RegionInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (region: Region) => void;
}

export default function RegionInput({
  value = "",
  onChange,
  onSelect,
}: RegionInputProps) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<Region[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `/api/regions?query=${encodeURIComponent(query)}`
        );
        if (!res.ok) throw new Error("Failed to fetch regions");
        const data = await res.json();
        setResults(data.regions ?? []);
      } catch (err) {
        console.error("Region search failed:", err);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = useCallback(
    (region: Region) => {
      setQuery(region.name);
      setOpen(false);
      onSelect?.(region);
      onChange?.(region.name);
    },
    [onSelect, onChange]
  );

  return (
    <div className="relative w-full">
      <label htmlFor="region" className="block text-sm font-medium mb-1">
        Destination
      </label>

      <div
        className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-lg h-10 px-3 focus-within:ring-2 focus-within:ring-amber-400 transition-shadow"
      >
        <Search size={16} className="text-gray-500" />
        <input
          id="region"
          type="text"
          autoComplete="off"
          placeholder="Try 'London' or 'Miami'"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            onChange?.(e.target.value);
          }}
          onFocus={() => query && setOpen(true)}
          className="flex-1 bg-transparent focus:outline-none text-sm"
        />
      </div>

      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          {isLoading && (
            <div className="px-4 py-2 text-sm text-gray-500">Searching...</div>
          )}

          {!isLoading && results.length === 0 && query.length >= 2 && (
            <div className="px-4 py-2 text-sm text-gray-500">
              No results found
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <ul className="max-h-56 overflow-auto">
              {results.map((region, i) => (
                <li
                  key={i}
                  onClick={() => handleSelect(region)}
                  className="px-4 py-2 text-sm hover:bg-amber-50 cursor-pointer"
                >
                  {region.name}
                  {region.country && (
                    <span className="text-gray-500">, {region.country}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
