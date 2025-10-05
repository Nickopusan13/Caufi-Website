import Sales from "./components/saleschart/Sales";
import CardComponent from "./components/Card";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaBoxesStacked } from "react-icons/fa6";
import { LuBoxes } from "react-icons/lu";
import { PiWarehouseFill } from "react-icons/pi";
import { BiSolidPackage } from "react-icons/bi";
import WelcomeCard from "./components/welcome/WelcomeCard";
import CategoryChart from "./components/categorychart/CategoryChart";
import ReturningCustomer from "./components/returningcustomer/ReturningCustomer";
import Earnings from "./components/earnings/Earnings";
import RecentPurhaces from "./components/recentpurhaces/RecentPurhaces";
import BestSelling from "./components/bestselling/BestSelling";
import AdminMain from "../AdminMain";

export default function Dashboard() {
  return (
    <AdminMain>
      <WelcomeCard />
      <div className="flex justify-between">
        <CardComponent
          style="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-2 text-[50px] rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-200"
          icon={HiMiniUserGroup}
          percentage="11.10%"
          title="Total Customers"
          value="6,000"
          trend="up"
        />

        <CardComponent
          style="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-2 text-[50px] rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-200"
          icon={FaBoxesStacked}
          percentage="11.20%"
          title="Total Orders"
          value="6,898"
          trend="up"
        />

        <CardComponent
          style="bg-gradient-to-br from-pink-500 to-rose-600 text-white p-2 text-[50px] rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-200"
          icon={LuBoxes}
          percentage="11.80%"
          title="Total Product"
          value="6,898"
          trend="up"
        />

        <CardComponent
          style="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-2 text-[50px] rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-200"
          icon={PiWarehouseFill}
          percentage="13.10%"
          title="Total Stock"
          value="6,898"
          trend="up"
        />

        <CardComponent
          style="bg-gradient-to-br from-purple-500 to-violet-600 text-white p-2 text-[50px] rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-200"
          icon={BiSolidPackage}
          percentage="13.10%"
          title="Pending Orders Today"
          value="6,898"
          trend="up"
        />
      </div>
      <Sales />
      <CategoryChart />
      <div className="flex gap-2">
        <ReturningCustomer />
        <Earnings />
      </div>
      <RecentPurhaces />
      <BestSelling />
    </AdminMain>
  );
}
