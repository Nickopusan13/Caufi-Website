"use client";

import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  Legend,
} from "recharts";
import { ReturningCustomerRatio } from "@/components/admin/item";

interface DataItem {
  month: string;
  date: number;
  newUsers: number;
  returning: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: DataItem }[];
}

export default function Chart() {
  const filteredData = ReturningCustomerRatio.filter(
    (item) => (item.date - 1) % 4 === 0
  );
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={filteredData}>
        <XAxis
          fontSize={13}
          dataKey="date"
          tickFormatter={(_, index) => {
            const d = filteredData[index];
            return `${d.month} ${d.date}`;
          }}
        />
        <YAxis fontSize={13} />
        <Tooltip
          content={(props: CustomTooltipProps) => {
            const { active, payload } = props;
            if (active && payload && payload.length) {
              const { month, date, newUsers, returning } = payload[0].payload;
              return (
                <div className="bg-white p-2 rounded shadow border border-gray-200 text-sm">
                  <p className="font-bold">
                    {month} {date}
                  </p>
                  <p className="text-red-500">Returning: {returning}</p>
                  <p className="text-blue-500">New Users: {newUsers}</p>
                </div>
              );
            }
          }}
        />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Area
          type="monotone"
          stroke="blue"
          fillOpacity={0.2}
          dataKey="newUsers"
          strokeWidth={2}
          fill="blue"
          name="New Users"
        />
        <Area
          type="monotone"
          stroke="red"
          fillOpacity={0.2}
          dataKey="returning"
          strokeWidth={2}
          fill="red"
          name="Returning"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
