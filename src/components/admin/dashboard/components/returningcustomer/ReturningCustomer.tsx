import { PopOverKebab } from "../ChartCard";
import { Card, CardTitle } from "@/components/ui/card";
import { IoMdTrendingUp } from "react-icons/io";
import Filter from "../Filter";
import Chart from "./Chart";

export default function ReturningCustomer() {
  return (
    <Card className="w-[50%] px-10">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle className="font-bold text-xl">
            Returning Customer rate
          </CardTitle>
          <div className="flex items-center gap-2">
            <p className="before:content-['Rp.'] text-lg text-blue-500 font-bold">
              1.200.000
            </p>
            <div className="bg-blue-500/50 px-2 rounded-2xl text-sm items-center flex justify-center gap-1">
              <IoMdTrendingUp />
              <p>3.5%</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <Filter />
          <PopOverKebab />
        </div>
      </div>
      <Chart />
    </Card>
  );
}
