"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { RiMapPin2Fill } from "react-icons/ri";
import { BiMapPin } from "react-icons/bi";
import { IoIosCloseCircle } from "react-icons/io";
import InputSearch from "./mapcomponents/InputMap";
import {
  ForceMapResize,
  CurrentLocationButton,
  LocationWatcher,
  RecenterMap,
} from "./mapcomponents/MapComponent";
import { reverseGeocode } from "@/utils/api";

export default function MapPicker({
  onSelectLocation,
}: {
  onSelectLocation: (addr: string) => void;
}) {
  const [openMap, setOpenMap] = useState<boolean>(false);
  return (
    <>
      <div className="w-full flex flex-col bg-zinc-200 dark:bg-zinc-800 justify-center items-center py-2 gap-2 rounded-4xl">
        <div className="flex flex-col items-center px-2 text-center">
          <h1 className="text-sm font-bold">Set Pinpoint</h1>
          <p className="text-sm">
            Pinpoint your address so it will pick your location instantly
          </p>
        </div>
        <div className="flex text-sm">
          <button
            className="bg-zinc-100 dark:bg-zinc-700 py-2 px-4 flex items-center justify-center gap-1 font-bold rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 outline-none"
            onClick={() => setOpenMap(true)}
            type="button"
          >
            Add Pinpoint
            <BiMapPin className="text-[20px]" />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {openMap && (
          <OpenMap
            onOpen={openMap}
            onSelectLocation={onSelectLocation}
            onClose={() => setOpenMap(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

const OpenMap = ({
  onOpen,
  onClose,
  onSelectLocation,
}: {
  onOpen: boolean;
  onClose: () => void;
  onSelectLocation: (addr: string) => void;
}) => {
  const [position, setPosition] = useState<[number, number]>([
    -6.2088, 106.8456,
  ]);
  const [fromSearch, setFromSearch] = useState(false);
  const [address, setAddress] = useState("");
  useEffect(() => {
    const timeout = setTimeout(async () => {
      const addr = await reverseGeocode(position[0], position[1]);
      setAddress(addr);
    }, 500);

    return () => clearTimeout(timeout);
  }, [position]);

  return (
    <Dialog
      className="fixed inset-0 px-2 z-100 flex items-center justify-center backdrop-blur-sm"
      open={onOpen}
      onClose={onClose}
    >
      <motion.div
        initial={{ backgroundColor: "rgba(0,0,0,0)", opacity: 0 }}
        animate={{ backgroundColor: "rgba(0,0,0,0.5)", opacity: 1 }}
        exit={{ backgroundColor: "rgba(0,0,0,0)", opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="flex items-center justify-center rounded-2xl w-full max-w-2xl md:px-0 px-2"
      >
        <DialogPanel className="rounded-xl w-full">
          <div className="md:h-[600px] rounded-xl grid grid-cols-1 md:grid-cols-2">
            <InputSearch
              address={address}
              onClose={onClose}
              onSelect={(lat: number, lon: number) => {
                setFromSearch(true);
                setPosition([lat, lon]);
              }}
              onSelectLocation={(addr: string) => {
                setAddress(addr);
                onSelectLocation(addr);
              }}
            />
            <div className="relative h-[50vh] md:h-full w-full">
              <MapContainer
                center={position}
                zoom={20}
                scrollWheelZoom={true}
                attributionControl={false}
                className="h-full w-full rounded-b-2xl md:rounded-bl-none md:rounded-r-2xl"
              >
                <ForceMapResize />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RecenterMap
                  position={position}
                  fromSearch={fromSearch}
                  setFromSearch={setFromSearch}
                />
                <CurrentLocationButton />
                <LocationWatcher onChange={setPosition} />
              </MapContainer>
              <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] text-4xl text-green-700">
                <RiMapPin2Fill />
              </div>
              <motion.button
                className="absolute z-400 top-2 right-2 text-[30px] text-zinc-500 hover:text-zinc-600"
                type="button"
                onClick={onClose}
              >
                <IoIosCloseCircle />
              </motion.button>
            </div>
          </div>
        </DialogPanel>
      </motion.div>
    </Dialog>
  );
};
