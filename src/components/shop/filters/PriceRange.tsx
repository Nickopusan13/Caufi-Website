"use client";

import React, { useState } from "react";
import { Range } from "react-range";
import { FaMinus } from "react-icons/fa";

const MIN = 0;
const MAX = 1000000;
const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

export const PriceRange: React.FC = () => {
  const [values, setValues] = useState([0, 1000000]);
  return (
    <div className="flex flex-col items-center">
      <div className="min-w-70">
        <Range
          step={10000}
          min={MIN}
          max={MAX}
          values={values}
          onChange={(vals) => setValues(vals)}
          renderTrack={({ props, children }) => {
            const { ref, style, ...restProps } = props;
            return (
              <div
                {...restProps}
                className="h-2 w-full rounded-2xl bg-gray-300"
                style={style}
              >
                <div
                  className="h-2 bg-blue-900 rounded-2xl"
                  style={{
                    marginLeft: `${((values[0] - MIN) / (MAX - MIN)) * 100}%`,
                    width: `${((values[1] - values[0]) / (MAX - MIN)) * 100}%`,
                  }}
                ></div>
                {children}
              </div>
            );
          }}
          renderThumb={({ props, isDragged }) => {
            const { key, style, ...restProps } = props;
            return (
              <div
                key={key}
                {...restProps}
                className={`h-5 w-5 rounded-full bg-white border-2 border-blue-600 shadow-md ${
                  isDragged ? "" : ""
                } transition-all duration-75`}
                style={{
                  ...style,
                  top: "20%",
                }}
                aria-label={`Price at ${values[0]} to ${values[1]}`}
              ></div>
            );
          }}
        />
        <div className="flex justify-between w-full mt-3 items-center">
          <input
            type="text"
            inputMode="numeric"
            className="border px-2 py-2 w-30 rounded-[10px] text-sm text-center focus:outline-none"
            value={formatter.format(values[0])}
            min={MIN}
            max={MAX}
            step={10000}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^\d]/g, "");
              let val = parseInt(raw || "0", 10);
              val = Math.max(MIN, Math.min(val, MAX));

              if (val <= values[1]) {
                setValues([val, values[1]]);
              }
            }}
          />
          <FaMinus />
          <input
            type="text"
            inputMode="numeric"
            className="border px-2 py-2 w-30 rounded-[10px] text-sm text-center focus:outline-none"
            value={formatter.format(values[1])}
            min={values[0]}
            max={MAX}
            step={10000}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^\d]/g, "");
              let val = parseInt(raw || "0", 10);
              val = Math.max(MIN, Math.min(val, MAX));
              if (val >= values[0]) {
                setValues([values[0], val]);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
