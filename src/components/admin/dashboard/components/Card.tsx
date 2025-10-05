import { Card, CardHeader, CardContent } from "@/components/ui/card";
import React from "react";
import { IoMdTrendingUp, IoMdTrendingDown } from "react-icons/io";

export default function CardComponent({
  icon: Icon,
  title,
  value,
  percentage,
  trend = "up",
  style,
}: {
  icon: React.ElementType;
  title: string;
  value: number | string;
  percentage: string;
  trend?: "up" | "down";
  style: string;
}) {
  return (
    <Card className={`h-50 transition-all duration-200 hover:shadow-lg w-60`}>
      <CardHeader>
        <Icon className={style} />
      </CardHeader>
      <CardContent className="flex justify-between items-end p-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm opacity-50 whitespace-nowrap">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="flex bg-green-200/50 px-2 rounded-full gap-1 text-green-600 items-center text-sm">
          {trend === "up" ? <IoMdTrendingUp /> : <IoMdTrendingDown />}
          <span>{percentage}</span>
        </div>
      </CardContent>
    </Card>
  );
}
