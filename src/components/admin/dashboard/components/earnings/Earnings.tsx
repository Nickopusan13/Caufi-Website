import { PopOverKebab } from "../ChartCard";
import { Card, CardTitle } from "@/components/ui/card";
import Chart from "./Chart";
import Filter from "../Filter";

export default function Earnings() {
  return (
    <Card className="w-[50%] px-10">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle className="font-bold text-xl">
            Projection vs actual
          </CardTitle>
          <div className="flex items-center gap-2">
            <p className="text-lg opacity-70">
              Actual earnings vs projected earnings
            </p>
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
