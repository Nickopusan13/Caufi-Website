"use client";

import { weeklySales } from "@/components/admin/item";
import { Bar, ResponsiveContainer, BarChart, Tooltip, XAxis } from "recharts";
import { IoMdTrendingUp } from "react-icons/io";

interface DataItem {
  day: string;
  sales: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: DataItem }[];
}

export default function WeeklySales() {
  return (
    <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-md w-90">
      <div className="flex flex-col justify-center gap-1">
        <p className="font-semibold text-sm text-gray-600">Weekly Sales</p>
        <p className="text-xl font-bold text-gray-800 before:content-['Rp.']">
          1.200.000
        </p>
        <span className="text-xs flex items-center gap-1 bg-green-100 text-green-700 rounded-full px-2 py-0.5 w-fit">
          <IoMdTrendingUp />
          3.5%
        </span>
      </div>
      <div className="flex-1 h-16">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklySales}>
            <XAxis dataKey="day" hide />
            <Tooltip
              content={(props: CustomTooltipProps) => {
                const { active, payload } = props;
                if (active && payload && payload.length) {
                  const { day, sales } = payload[0].payload;
                  return (
                    <div className="bg-white text-xs p-1 rounded shadow border border-gray-200">
                      {`${day}: ${sales}`}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="sales" fill="blue" radius={[20, 20, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
