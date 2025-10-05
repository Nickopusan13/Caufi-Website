"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useState } from "react";
import type { ProductCreate } from "@/utils/api";

export default function Stock({
  formData,
  handleChange,
}: {
  formData: Pick<ProductCreate, "stock" | "stockType">;
  handleChange: <K extends keyof ProductCreate>(
    key: K,
    value: ProductCreate[K]
  ) => void;
}) {
  const [, setCurrentStock] = useState<string>("");
  const handleStock = (raw: string) => {
    const cleaned = raw.replace(/[^\d]/g, "");
    setCurrentStock(cleaned);
    handleChange("stock", cleaned == "" ? 0 : parseInt(cleaned, 10));
  };
  return (
    <div className="flex flex-col w-full gap-5">
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor="add-to-stock">Add to Stock</Label>
        <Input
          id="add-to-stock"
          required
          autoComplete="off"
          type="text"
          inputMode="numeric"
          min={0}
          value={formData.stock}
          onChange={(e) => handleStock(e.target.value)}
        />
      </div>
      <RadioGroup.Root
        className="flex gap-2 items-center justify-center"
        value={formData.stockType}
        onValueChange={(val) =>
          handleChange("stockType", val as ProductCreate["stockType"])
        }
      >
        {["In Stock", "Unavailable", "Coming Soon"].map((item, idx) => (
          <Label key={idx} htmlFor={item}>
            <RadioGroup.Item
              className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center"
              value={item}
              id={item}
            >
              <RadioGroup.Indicator className="w-3 h-3 rounded-full bg-blue-500" />
            </RadioGroup.Item>
            {item}
          </Label>
        ))}
      </RadioGroup.Root>
      <div className="flex flex-col gap-2 pr-40 text-[15px]">
        <div className="flex justify-between">
          <span>Current stock:</span>
          <span className="opacity-60">
            {Number(formData.stock).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Last time restocked:</span>
          <span className="opacity-60">30th June, 2025</span>
        </div>
      </div>
    </div>
  );
}
