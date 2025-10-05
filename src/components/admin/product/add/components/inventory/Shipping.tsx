import * as RadioGroup from "@radix-ui/react-radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ProductCreate } from "@/utils/api";

const shippingType = [
  {
    title: "Delivered by Vendor",
    desc: "You’ll be responsible for product delivery. Any damage or delay during shipping may cost you a Damage fee.",
    value: "Vendor",
  },
  {
    title: "Delivered by Caufi",
    desc: "Your product, Our responsibility. For a measly fee, we will handle the delivery process for you.",
    value: "Caufi",
  },
];

export default function Shipping({
  formData,
  handleChange,
}: {
  formData: Pick<ProductCreate, "shippingType">;
  handleChange: <K extends keyof ProductCreate>(
    key: K,
    value: ProductCreate[K]
  ) => void;
}) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <h1 className="text-sm font-bold">Shipping Type</h1>
      <RadioGroup.Root
        value={formData.shippingType}
        onValueChange={(val) =>
          handleChange("shippingType", val as ProductCreate["shippingType"])
        }
        className="flex gap-3"
      >
        {shippingType.map((item, idx) => (
          <Tooltip key={idx}>
            <TooltipTrigger asChild>
              <RadioGroup.Item
                className={`flex-1 cursor-pointer rounded-lg border border-gray-300 p-4 text-center transition-shadow duration-200 hover:shadow-md outline-none ${
                  formData.shippingType === item.value
                    ? "ring-2 ring-blue-500"
                    : ""
                }`}
                value={item.value}
              >
                <RadioGroup.Indicator className="hidden" />
                <span className="block text-sm font-medium">{item.title}</span>
              </RadioGroup.Item>
            </TooltipTrigger>
            <TooltipContent>
              <p className="w-60 text-center">{item.desc}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </RadioGroup.Root>
    </div>
  );
}
