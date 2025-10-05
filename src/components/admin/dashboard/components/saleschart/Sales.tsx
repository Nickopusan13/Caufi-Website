"use client";

import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { salesData } from "@/components/admin/item";
import ChartCard from "../ChartCard";
import { CustomTooltipProps } from "../CustomTooltip";

export default function Sales() {
  return (
    <ChartCard title="Monthly Sales">
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart barSize={30} data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dy={5} fontSize={15} type="category" dataKey="month" />
          <YAxis dx={-10} fontSize={15} type="number" />
          <Tooltip
            content={(props: CustomTooltipProps) => {
              const { active, payload } = props;
              if (active && payload && payload.length) {
                const {
                  month,
                  2025: year2025,
                  2024: year2024,
                } = payload[0].payload;
                return (
                  <div className="bg-white p-2 rounded shadow border border-gray-200 text-sm">
                    <p className="font-bold">{month}</p>
                    <p className="text-blue-500">2025: {year2025}</p>
                    <p className="text-pink-500">2024: {year2024}</p>
                  </div>
                );
              }
            }}
          />
          <Line
            type={"monotone"}
            dataKey="2025"
            stroke="blue"
            className="to-blue-400"
            tooltipType="none"
          />
          <Line
            type={"monotone"}
            dataKey="2024"
            stroke="pink"
            tooltipType="none"
          />
          <Bar dataKey="2025" fill="blue" radius={[20, 20, 0, 0]} />
          <Bar dataKey="2024" fill="pink" radius={[20, 20, 0, 0]} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
