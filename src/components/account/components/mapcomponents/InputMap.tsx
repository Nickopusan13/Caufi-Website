"use client";

import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { searchLocation } from "@/utils/api";

type Location = {
  name: string;
  city?: string;
  state?: string;
  country?: string;
  locality?: string;
  postcode?: string;
  district?: string;
  lat: string;
  lon: string;
};

export default function InputSearch({
  address,
  onSelect,
  onClose,
  onSelectLocation,
}: {
  address: string;
  onSelect: (lat: number, lon: number) => void;
  onClose: () => void;
  onSelectLocation: (address: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Location[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      const locations = await searchLocation(query);
      setResults(locations);
      setShowDropdown(locations.length > 0);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);
  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 rounded-t-2xl md:rounded-l-2xl rounded-r-none h-full flex flex-col px-5 py-4 gap-3">
      <h1 className="font-extrabold text-2xl text-center">Add Pinpoint</h1>
      <div className="relative">
        <input
          className="bg-white dark:bg-zinc-700 dark:text-white text-black rounded-t-lg outline-none border-2 px-7 p-2 w-full"
          type="text"
          name="search-town"
          id="search-town"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.length >= 3) setShowDropdown(true);
            else setShowDropdown(false);
          }}
          placeholder="Search location"
          autoComplete="off"
        />
        <FaSearch className="absolute left-2 top-3 text-zinc-400" />
        {query && (
          <button
            className="absolute text-lg right-2 top-3.5 text-zinc-400"
            type="button"
            onClick={() => setQuery("")}
          >
            <IoCloseSharp />
          </button>
        )}
        {showDropdown && results.length > 0 && (
          <ul className="border rounded-b-2xl overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-white dark:bg-zinc-700 scrollbar-thumb-zinc-500 bg-white text-black w-full max-h-40 overflow-auto absolute z-10 dark:text-white dark:scrollbar-track-zinc-700 dark:scrollbar-thumb-zinc-400">
            {results.map((loc, idx) => (
              <li
                key={idx}
                className="p-2 flex flex-col hover:bg-zinc-200 dark:hover:bg-zinc-600 cursor-pointer"
                onClick={() => {
                  setQuery(loc.name);
                  setShowDropdown(false);
                  onSelect(parseFloat(loc.lat), parseFloat(loc.lon));
                  setQuery("");
                }}
              >
                <span className="font-bold text-sm">{loc.name}</span>
                <span className="text-sm">
                  {[
                    loc.name,
                    loc.locality,
                    loc.district,
                    loc.city,
                    loc.state,
                    loc.postcode,
                    loc.country,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-col rounded text-justify h-full gap-2">
        <h2 className="text-sm font-bold opacity-50">
          Your current location :
        </h2>
        <span>{address}</span>
      </div>
      <div className="flex items-center justify-center text-center">
        <button
          className=" bg-blue-400 px-15 text-black py-3 rounded-sm font-bold hover:scale-110 active:scale-95 transition-all duration-200"
          type="button"
          onClick={() => {
            onSelectLocation(address);
            onClose();
          }}
        >
          Select Location
        </button>
      </div>
    </div>
  );
}
