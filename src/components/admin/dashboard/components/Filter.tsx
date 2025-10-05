import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Filter() {
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("default", { month: "long" })
  );
  return (
    <Select>
      <SelectTrigger className="w-50">
        <SelectValue placeholder="Select Month" />
      </SelectTrigger>
      <SelectContent className="h-60">
        {months.map((item, index) => (
          <SelectItem
            className="cursor-pointer"
            key={index}
            value={index.toString()}
          >
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
