import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { settings } from "./Item";
import Attributes from "./Attributes";
import Stock from "./Stock";
import Pricing from "./Pricing";
import Shipping from "./Shipping";
import type { ProductCreate } from "@/utils/api";
import { memo } from "react";

export default memo(function Inventory({
  formData,
  handleChange,
}: {
  formData: Pick<
    ProductCreate,
    | "stock"
    | "stockType"
    | "shippingType"
    | "colors"
    | "motif"
    | "regularPrice"
    | "discountPrice"
    | "category"
    | "material"
    | "sizes"
  >;
  handleChange: <K extends keyof ProductCreate>(
    key: K,
    value: ProductCreate[K]
  ) => void;
}) {
  const [activeTab, setActiveTab] = useState<string>("Pricing");
  return (
    <Card className="w-full h-86">
      <CardHeader>
        <CardTitle>Inventory</CardTitle>
        <CardDescription>People can see it</CardDescription>
      </CardHeader>
      <CardContent className="flex h-full">
        <div className="flex flex-col w-[20%] border-r-2 border-t-2 h-full gap-1 py-2 items-center">
          {settings.map((item, idx) => (
            <button
              type="button"
              key={idx}
              className={`w-full h-full flex items-center gap-2 px-1 ${
                activeTab === item.title ? "bg-zinc-200" : "bg-zinc-100"
              }`}
              onClick={() => setActiveTab(item.title)}
            >
              {item.icon} {item.title}
            </button>
          ))}
        </div>
        <div className="flex w-full gap-3 px-3 py-2 border-t-2">
          {activeTab === "Pricing" && (
            <Pricing formData={formData} handleChange={handleChange} />
          )}
          {activeTab === "Restock" && (
            <Stock formData={formData} handleChange={handleChange} />
          )}
          {activeTab === "Shipping" && (
            <Shipping formData={formData} handleChange={handleChange} />
          )}
          {activeTab === "Attributes" && (
            <Attributes formData={formData} handleChange={handleChange} />
          )}
        </div>
      </CardContent>
    </Card>
  );
});
