"use client";

import ChartCard from "../ChartCard";
import {
  ResponsiveContainer,
  Bar,
  BarChart,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { monthlyCategorySales } from "@/components/admin/item";
import { CustomTooltipProps } from "../CustomTooltip";

export default function CategoryChart() {
  return (
    <ChartCard title="Top Categories">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart barSize={18} barGap={1} data={monthlyCategorySales}>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            content={(props: CustomTooltipProps) => {
              const { active, payload } = props;
              if (active && payload && payload.length) {
                const { month, shirts, shoes, hats, bags } = payload[0].payload;
                return (
                  <div className="bg-white p-2 rounded shadow border border-gray-200 text-sm">
                    <p className="font-bold">{month}</p>
                    <p className="text-[#4c78a8]">Shirts: {shirts}</p>
                    <p className="text-[#54a24b]">Bags: {bags}</p>
                    <p className="text-[#f58518]">Shoes: {shoes}</p>
                    <p className="text-[#72b7b2]">Hats: {hats}</p>
                  </div>
                );
              }
            }}
          />
          <XAxis
            dy={5}
            fontSize={15}
            type="category"
            dataKey="month"
            width={100}
          />
          <YAxis dx={-10} fontSize={15} type="number" />
          <Legend />
          <Bar
            name="Shirts"
            dataKey="shirts"
            fill="#4c78a8"
            radius={[20, 20, 0, 0]}
          />
          <Bar
            name="Bags"
            dataKey="bags"
            fill="#54a24b"
            radius={[20, 20, 0, 0]}
          />
          <Bar
            name="Shoes"
            dataKey="shoes"
            fill="#f58518"
            radius={[20, 20, 0, 0]}
          />
          <Bar
            name="Hats"
            dataKey="hats"
            fill="#72b7b2"
            radius={[20, 20, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
