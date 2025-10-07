"use client";

import { IoMdTrendingUp } from "react-icons/io";
import { Line, ResponsiveContainer, LineChart, Tooltip, XAxis } from "recharts";
import { weeklyShipping } from "@/components/admin/item";

interface DataItem {
  day: string;
  shipping: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: DataItem }[];
}

export default function Shipping() {
  return (
    <div className="flex items-center gap-4 p-6 bg-zinc-900 rounded-2xl shadow-md w-90">
      <div className="flex flex-col justify-center gap-1">
        <p className="font-semibold text-sm text-gray-600">Weekly Shipping</p>
        <p className="text-xl font-bold text-gray-500 before:content-['Rp.']">
          1.200.000
        </p>
        <span className="text-xs flex items-center gap-1 bg-green-600 text-green-200 rounded-full px-2 py-0.5 w-fit">
          <IoMdTrendingUp />
          3.5%
        </span>
      </div>
      <ResponsiveContainer height="100%" width="100%">
        <LineChart data={weeklyShipping}>
          <XAxis dataKey="day" hide />
          <Tooltip
            content={(props: CustomTooltipProps) => {
              const { active, payload } = props;
              if (active && payload && payload.length) {
                const { day, shipping } = payload[0].payload;
                return (
                  <div className="bg-white text-xs p-1 rounded shadow border border-gray-200">
                    {`${day}: ${shipping}`}
                  </div>
                );
              }
              return null;
            }}
          />
          <Line dataKey="shipping" fill="red" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
