import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { motifs, materials, colors, size, categories } from "./Item";
import type { ProductCreate } from "@/utils/api";

export default function Attributes({
  formData,
  handleChange,
}: {
  formData: Pick<
    ProductCreate,
    "motif" | "material" | "colors" | "sizes" | "category"
  >;
  handleChange: <K extends keyof ProductCreate>(
    key: K,
    value: ProductCreate[K]
  ) => void;
}) {
  return (
    <div className="grid grid-cols-2 w-full gap-x-4">
      <div className="flex flex-col gap-2 items-center">
        <Label>Select Motif</Label>
        <Select
          value={formData.motif}
          onValueChange={(val) =>
            handleChange("motif", val as ProductCreate["motif"])
          }
        >
          <SelectTrigger className="w-full hover:bg-zinc-100">
            <SelectValue placeholder="Select Motif" />
          </SelectTrigger>
          <SelectContent>
            {motifs.map((motif, idx) => (
              <SelectItem value={motif} key={idx} className="cursor-pointer">
                {motif}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Label htmlFor="material">Select Material</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="material"
              variant="outline"
              className="w-full justify-between"
            >
              {formData.material.length > 0 ? (
                <div className="max-h-24 overflow-y-auto scrollbar-none">
                  <span>
                    {formData.material.map((m) => m.material).join(", ")}
                  </span>
                </div>
              ) : (
                <span className="opacity-50">Select Material</span>
              )}
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            className="w-full max-h-60 overflow-auto p-2 scrollbar-thin scrollbar-track-white scrollbar-thumb-zinc-200"
          >
            {materials.map((material, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 p-2 rounded hover:bg-zinc-100 cursor-pointer"
              >
                <Checkbox
                  checked={formData.material?.some(
                    (m) => m.material === material
                  )}
                  onCheckedChange={(checked) => {
                    const updated = checked
                      ? [...formData.material, { material }]
                      : formData.material.filter(
                          (m) => m.material !== material
                        );

                    handleChange("material", updated);
                  }}
                  value={material}
                  className="shrink-0"
                />
                <span className="text-sm">{material}</span>
              </label>
            ))}
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Label htmlFor="color">Select Color</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="color"
              variant="outline"
              className="w-full justify-between"
            >
              {formData.colors.length > 0 ? (
                <div className="max-h-24 overflow-y-auto scrollbar-none">
                  <span>{formData.colors.map((c) => c.color).join(", ")}</span>
                </div>
              ) : (
                <span className="opacity-50">Select Color</span>
              )}
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            className="w-full max-h-60 overflow-auto p-2 scrollbar-thin scrollbar-track-white scrollbar-thumb-zinc-200"
          >
            {colors.map((color, idx) => (
              <label
                key={idx}
                className="flex justify-between items-center gap-2 p-2 rounded hover:bg-zinc-100 cursor-pointer"
              >
                <Checkbox
                  checked={formData.colors?.some(
                    (c) => c.color === color.color
                  )}
                  onCheckedChange={(checked) => {
                    const updated = checked
                      ? [
                          ...formData.colors,
                          { color: color.color, hex: color.hex },
                        ]
                      : formData.colors.filter((c) => c.color !== color.color);

                    handleChange("colors", updated);
                  }}
                  value={color.color}
                  className="shrink-0"
                />
                <span className="text-sm">{color.color}</span>
                <span
                  className="ml-2 w-4 h-4 rounded border-black border"
                  style={{ backgroundColor: color.hex }}
                />
              </label>
            ))}
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Label htmlFor="size">Select Size</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="size"
              variant="outline"
              className="w-full justify-between"
            >
              {formData.sizes.length > 0 ? (
                <div className="max-h-24 overflow-y-auto">
                  <span>{formData.sizes.map((s) => s.size).join(", ")}</span>
                </div>
              ) : (
                <span className="opacity-50">Select Size</span>
              )}
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            className="w-full max-h-60 overflow-auto p-2 scrollbar-thin scrollbar-track-white scrollbar-thumb-zinc-200"
          >
            {size.map((size, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 p-2 rounded hover:bg-zinc-100 cursor-pointer"
              >
                <Checkbox
                  checked={formData.sizes?.some((m) => m.size === size)}
                  onCheckedChange={(checked) => {
                    const updated = checked
                      ? [...formData.sizes, { size }]
                      : formData.sizes.filter((m) => m.size !== size);

                    handleChange("sizes", updated);
                  }}
                  value={size}
                  className="shrink-0"
                />
                <span className="text-sm">{size}</span>
              </label>
            ))}
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex col-span-2 flex-col gap-2 items-center">
        <Label>Select Category</Label>
        <Select
          value={formData.category}
          onValueChange={(val) =>
            handleChange("category", val as ProductCreate["category"])
          }
        >
          <SelectTrigger className="w-full hover:bg-zinc-100">
            <SelectValue placeholder="Select Motif" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category, idx) => (
              <SelectItem value={category} key={idx} className="cursor-pointer">
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
