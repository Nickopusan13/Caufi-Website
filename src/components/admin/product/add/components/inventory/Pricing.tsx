import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { ProductCreate } from "@/utils/api";
import { useState } from "react";

export const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});
export default function Pricing({
  formData,
  handleChange,
}: {
  formData: Pick<ProductCreate, "regularPrice" | "discountPrice">;
  handleChange: <K extends keyof ProductCreate>(
    key: K,
    value: ProductCreate[K]
  ) => void;
}) {
  const [, setRegularPrice] = useState<string>("");
  const [, setDiscountPrice] = useState<string>("");
  const [discountPercentage, setDiscountPercentage] = useState<string>("");
  const handleRegularPriceChange = (raw: string) => {
    const cleaned = raw.replace(/[^\d]/g, "");
    const val = cleaned === "" ? 0 : parseInt(cleaned, 10);
    const discountVal = parseInt(formData.discountPrice?.toString() || "0", 10);
    if (discountVal > val) {
      handleChange("discountPrice", val);
    }
    handleChange("regularPrice", val);
    setRegularPrice(val.toString());
  };
  const handleDiscountPriceChange = (raw: string) => {
    let val = raw.replace(/[^\d]/g, "");
    val = val === "" ? "0" : val;
    let numVal = parseInt(val, 10);
    const regularVal = parseInt(formData.regularPrice?.toString() || "0", 10);
    if (numVal > regularVal) {
      numVal = regularVal;
    }
    const percentage =
      regularVal === 0
        ? 0
        : Math.round(((regularVal - numVal) / regularVal) * 100);
    handleChange("discountPrice", numVal);
    setDiscountPrice(numVal.toString());
    setDiscountPercentage(percentage.toString());
  };
  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor="regular-price">Regular Price</Label>
        <Input
          type="text"
          required
          autoComplete="off"
          inputMode="numeric"
          value={formatter.format(formData.regularPrice)}
          id="regular-price"
          onChange={(e) => handleRegularPriceChange(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor="discount-price">Discount Price</Label>
        <Input
          type="text"
          required
          autoComplete="off"
          inputMode="numeric"
          value={formatter.format(formData.discountPrice)}
          id="discount-price"
          onChange={(e) => handleDiscountPriceChange(e.target.value)}
        />
        <span className="text-center">{`${discountPercentage}%`}</span>
      </div>
    </>
  );
}
