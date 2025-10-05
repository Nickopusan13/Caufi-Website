"use client";

import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { FaMapLocationDot } from "react-icons/fa6";

export function ForceMapResize() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [map]);
  return null;
}

export function LocationWatcher({
  onChange,
}: {
  onChange: (pos: [number, number]) => void;
}) {
  const map = useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      onChange([center.lat, center.lng]);
    },
  });
  return null;
}

export function RecenterMap({
  position,
  fromSearch,
  setFromSearch,
}: {
  position: [number, number];
  fromSearch: boolean;
  setFromSearch: (val: boolean) => void;
}) {
  const map = useMap();
  useEffect(() => {
    if (fromSearch) {
      map.flyTo(position, 18);
      setFromSearch(false);
    }
  }, [position, fromSearch, map, setFromSearch]);
  return null;
}

export function CurrentLocationButton() {
  const map = useMap();
  const goToCurrentLocation = () => {
    map.locate();
    map.once("locationfound", (e) => {
      map.flyTo(e.latlng, map.getZoom());
    });
  };

  return (
    <button
      className="absolute flex gap-2 items-center justify-center z-400 bg-blue-400 text-black hover:scale-110 active:scale-95 transition-all duration-200 bottom-4 font-bold text-lg shadow-lg px-4 py-1 rounded left-1/2 -translate-x-1/2 text-nowrap"
      onClick={goToCurrentLocation}
    >
      Go to Current Location
      <span>
        <FaMapLocationDot />
      </span>
    </button>
  );
}
