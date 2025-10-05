"use client";

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { earningsVsProjected } from "@/components/admin/item";
import { CustomTooltipProps } from "../CustomTooltip";

export default function Chart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={earningsVsProjected}>
        <XAxis
          fontSize={13}
          tickFormatter={(_, index) => {
            const d = earningsVsProjected[index];
            return `${d.month} ${d.date}`;
          }}
          dy={10}
        />
        <YAxis fontSize={13} dx={-10} />
        <Tooltip
          content={(props: CustomTooltipProps) => {
            const { active, payload } = props;
            if (active && payload && payload.length) {
              const { month, date, actual, projected } = payload[0].payload;
              return (
                <div className="bg-white p-2 rounded shadow border border-gray-200 text-sm">
                  <p className="font-bold">
                    {month} {date}
                  </p>
                  <p className="text-red-500">Actual: {actual}</p>
                  <p className="text-blue-500">Projected: {projected}</p>
                </div>
              );
            }
          }}
        />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Line dataKey="actual" stroke="red" name="Actual" />
        <Line dataKey="projected" stroke="blue" name="Projected" />
      </LineChart>
    </ResponsiveContainer>
  );
}
