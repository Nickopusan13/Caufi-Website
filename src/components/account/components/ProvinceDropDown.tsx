"use client";

import { IoIosCloseCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import {
  IndonesiaLocation,
  getProvincies,
  getDistricts,
  getRegencies,
  getVillages,
} from "@/utils/api";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function LocationSelector({
  title,
  items,
  onSelect,
  search,
  loading,
}: {
  title: string;
  items: IndonesiaLocation[];
  onSelect: (item: IndonesiaLocation) => void;
  search: string;
  loading: boolean;
}) {
  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <div className="w-full bg-zinc-200 dark:bg-zinc-700 py-3 rounded-b-sm mb-3">
        <h3 className="font-semibold text-[15px] text-center">{title}</h3>
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-6">
          <AiOutlineLoading3Quarters className="animate-spin text-3xl text-zinc-500" />
        </div>
      ) : (
        <div className="flex flex-col gap-1 h-100 scrollbar-thin scrollbar-track-white dark:scrollbar-track-zinc-900 scrollbar-thumb-zinc-400 overflow-y-auto">
          {filtered.map((item) => (
            <button
              className="w-full text-left px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 border-b"
              key={item.id}
              onClick={() => onSelect(item)}
            >
              {item.name}
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-sm text-zinc-500 py-2">No Result</p>
          )}
        </div>
      )}
    </>
  );
}

export default function ProvinceDropDown({
  onClose,
  onSelectAddress,
}: {
  onClose: () => void;
  onSelectAddress: (address: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState<{
    provinces: IndonesiaLocation[];
    regencies: IndonesiaLocation[];
    districts: IndonesiaLocation[];
    villages: IndonesiaLocation[];
  }>({
    provinces: [],
    regencies: [],
    districts: [],
    villages: [],
  });
  const [selectedProvince, setSelectedProvince] =
    useState<IndonesiaLocation | null>(null);
  const [selectedRegency, setSelectedRegency] =
    useState<IndonesiaLocation | null>(null);
  const [selectedDistrict, setSelectedDistrict] =
    useState<IndonesiaLocation | null>(null);
  const [open, setOpen] = useState<
    "province" | "regency" | "district" | "village" | null
  >("province");

  useEffect(() => {
    setLoading(true);
    getProvincies()
      .then((data) => {
        setLocations((prev) => ({
          ...prev,
          provinces: data.sort((a, b) => a.name.localeCompare(b.name)),
        }));
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      setLoading(true);
      getRegencies(selectedProvince.id)
        .then((data) => {
          setLocations((prev) => ({
            ...prev,
            regencies: data.sort((a, b) => a.name.localeCompare(b.name)),
          }));
        })
        .finally(() => setLoading(false));
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedRegency) {
      setLoading(true);
      getDistricts(selectedRegency.id)
        .then((data) => {
          setLocations((prev) => ({
            ...prev,
            districts: data.sort((a, b) => a.name.localeCompare(b.name)),
          }));
        })
        .finally(() => setLoading(false));
    }
  }, [selectedRegency]);

  useEffect(() => {
    if (selectedDistrict) {
      setLoading(true);
      getVillages(selectedDistrict.id)
        .then((data) => {
          setLocations((prev) => ({
            ...prev,
            villages: data.sort((a, b) => a.name.localeCompare(b.name)),
          }));
        })
        .finally(() => setLoading(false));
    }
  }, [selectedDistrict]);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <h1 className="font-bold text-xl">Enter Address Detail</h1>
        <button
          className="text-[30px] text-zinc-500 hover:text-zinc-600 dark:text-zinc-200 dark:hover:text-zinc-400"
          onClick={onClose}
        >
          <IoIosCloseCircle />
        </button>
      </div>
      <div className="w-full relative flex flex-col">
        <input
          className="bg-white dark:bg-zinc-700 dark:text-white text-black rounded-lg outline-none border-2 px-7 p-2 w-full mb-3"
          type="text"
          name="search-address"
          id="search-address"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="off"
        />
        <FaSearch className="absolute left-2 top-3 text-zinc-400" />
        {open === "province" && (
          <LocationSelector
            loading={loading}
            title="Select Provincies"
            items={locations.provinces}
            search={search}
            onSelect={(prov) => {
              setSelectedProvince(prov);
              setOpen("regency");
              setSearch("");
            }}
          />
        )}
        {selectedProvince && (
          <>
            <button
              className="w-full bg-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 dark:bg-zinc-800 duration-200 transition-all py-2 rounded-t-sm border-b"
              onClick={() => {
                setOpen("province");
                setSelectedDistrict(null);
                setSelectedProvince(null);
                setSelectedRegency(null);
              }}
            >
              <h2 className="text-[15px] text-center">
                {selectedProvince.name}
              </h2>
            </button>
            {open === "regency" && (
              <LocationSelector
                loading={loading}
                title="Select Regencies"
                items={locations.regencies}
                search={search}
                onSelect={(reg) => {
                  setSelectedRegency(reg);
                  setOpen("district");
                }}
              />
            )}
          </>
        )}
        {selectedRegency && (
          <>
            <button
              className="w-full bg-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 dark:bg-zinc-800 duration-200 transition-all py-2 border-b"
              onClick={() => {
                setOpen("regency");
                setSelectedRegency(null);
                setSelectedDistrict(null);
              }}
            >
              <h2 className="text-[15px] text-center">
                {selectedRegency.name}
              </h2>
            </button>
            {open === "district" && (
              <LocationSelector
                loading={loading}
                title="Select District"
                items={locations.districts}
                search={search}
                onSelect={(dis) => {
                  setSelectedDistrict(dis);
                  setOpen("village");
                }}
              />
            )}
          </>
        )}
        {open === "village" && selectedDistrict && (
          <>
            <button
              className="w-full py-2 border-b bg-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 dark:bg-zinc-800 duration-200 transition-all"
              onClick={() => {
                setOpen("district");
                setSelectedDistrict(null);
              }}
            >
              <h2 className="text-[15px] text-center">
                {selectedDistrict.name}
              </h2>
            </button>
            <LocationSelector
              loading={loading}
              title="Select village"
              items={locations.villages}
              search={search}
              onSelect={(vil) => {
                const fullAddr = [
                  selectedProvince?.name,
                  selectedRegency?.name,
                  selectedDistrict?.name,
                  vil.name,
                ]
                  .filter(Boolean)
                  .join(", ");
                onSelectAddress(fullAddr);
                onClose();
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
