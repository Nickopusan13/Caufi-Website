import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import WeeklySales from "./WeeklySales";
import Shipping from "./Shipping";

export default function WelcomeCard() {
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle className="text-2xl text-green-700">
            Good Afternoon, Nickopusan!
          </CardTitle>
          <p className="text-sm">{`Here's what happening with your store today`}</p>
          <div className="flex gap-5">
            <div className="flex flex-col gap-2 items-center justify-center shadow-md p-2 rounded-md">
              <h2 className="opacity-50 text-sm">{`Today's visit`}</h2>
              <p className="text-lg font-bold text-blue-600">14,200</p>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center shadow-md p-2 rounded-md">
              <h2 className="opacity-50 text-sm">{`Today's total sales`}</h2>
              <p className="before:content-['Rp.'] text-lg font-bold text-blue-600">
                1.200.000
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Shipping />
          <WeeklySales />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="w-full bg-gradient-to-r from-green-300 to-green-300/50 px-5 py-0.5 rounded-full text-sm text-green-800 flex items-center justify-between">
            <div className="flex gap-1 items-center">
              <GoDotFill />
              <span className="font-bold">5 products</span> need to be
              delivered!
            </div>
            <Link className="flex gap-1 items-center hover:underline" href="/">
              View Products
              <MdOutlineKeyboardArrowRight />
            </Link>
          </div>
          <div className="w-full bg-gradient-to-r from-blue-300 to-blue-300/50 px-5 py-0.5 rounded-full text-sm text-blue-800 flex items-center justify-between">
            <div className="flex gap-1 items-center">
              <GoDotFill />
              <span className="font-bold">7 orders</span> have payments that
              need to be captured
            </div>
            <Link className="flex gap-1 items-center hover:underline" href="/">
              View Paymemts
              <MdOutlineKeyboardArrowRight />
            </Link>
          </div>
          <div className="w-full bg-gradient-to-r from-blue-300 to-blue-300/50 px-5 py-0.5 rounded-full text-sm text-blue-800 flex items-center justify-between">
            <div className="flex gap-1 items-center">
              <GoDotFill />
              <span className="font-bold">50+ orders</span>need to be fullfilled
            </div>
            <Link className="flex gap-1 items-center hover:underline" href="/">
              View Orders
              <MdOutlineKeyboardArrowRight />
            </Link>
          </div>
        </div>
        <div className="text-center">
          <button className="opacity-50 text-sm hover:underline">
            View more
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
