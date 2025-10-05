"use client";

import dynamic from "next/dynamic";

const MapPicker = dynamic(() => import("./MapPicker"), {
  ssr: false,
});

export default function MapPickerWrapper({
  onSelectLocation,
}: {
  onSelectLocation: (addr: string) => void;
}) {
  return <MapPicker onSelectLocation={onSelectLocation} />;
}
