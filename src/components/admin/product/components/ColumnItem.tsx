import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { GoKebabHorizontal } from "react-icons/go";
import { ProductOut } from "@/utils/api";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TableFilter from "@/components/ui/TableFilter";
import { formatter } from "../add/components/inventory/Pricing";

export const getColumns = (
  handleDelete: (id: number) => void,
  handleEdit: (product: ProductOut) => void
): ColumnDef<ProductOut>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="border-blue-900"
        checked={
          table.getIsAllRowsSelected() ||
          (table.getIsSomeRowsSelected() && "indeterminate")
        }
        onCheckedChange={(val) => table.toggleAllRowsSelected(!!val)}
        aria-label="Select all rows"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="border-blue-900"
        checked={row.getIsSelected()}
        onCheckedChange={(val) => row.toggleSelected(!!val)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => {
      const images = row.getValue("images") as { imageUrl: string }[];
      const imageUrl = images[0]?.imageUrl;
      return (
        <Image
          src={imageUrl}
          alt={row.getValue("name")}
          width={60}
          height={60}
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link className="hover:underline" href={row.getValue("name")}>
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    accessorKey: "stock",
    header: ({ column }) => <TableFilter column={column} title="Stock" />,
    cell: ({ row }) => <span>{row.getValue("stock")}</span>,
  },
  {
    accessorKey: "regularPrice",
    header: ({ column }) => (
      <TableFilter column={column} title="Regular Price" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("regularPrice") as number;
      const formatted = formatter.format(value);
      return <span>{formatted}</span>;
    },
  },
  {
    accessorKey: "discountPrice",
    header: ({ column }) => (
      <TableFilter column={column} title="Discount Price" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("discountPrice") as number;
      const formatted = formatter.format(value);
      return <span>{formatted}</span>;
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => <TableFilter column={column} title="Category" />,
    cell: ({ row }) => <span>{row.getValue("category")}</span>,
    filterFn: "equalsString",
  },
  {
    accessorKey: "shippingType",
    header: ({ column }) => (
      <TableFilter column={column} title="Shipping Type" />
    ),
    cell: ({ row }) => <span>{row.getValue("shippingType")}</span>,
  },
  {
    accessorKey: "colors",
    header: "Color",
    cell: ({ row }) => {
      const colors = row.getValue("colors") as { color: string; hex: string }[];
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1">
              {colors.slice(0, 3).map((c, idx) => (
                <span
                  key={idx}
                  className="w-4 h-4 rounded-full border-black border shadow-sm"
                  style={{ backgroundColor: c.hex }}
                  title={c.color}
                />
              ))}
              {colors.length > 3 && (
                <span className="w-6 h-6 flex items-center justify-center text-xs rounded-full bg-gray-200 cursor-pointer">
                  +{colors.length - 3}
                </span>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="grid grid-cols-6 gap-2">
              {colors.map((c, idx) => (
                <span
                  key={idx}
                  className="w-5 h-5 rounded-full border shadow-sm"
                  style={{ backgroundColor: c.hex }}
                  title={c.color}
                />
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: "sizes",
    header: "Size",
    cell: ({ row }) => {
      const sizes = row.getValue("sizes") as { size: string }[];
      return (
        <span className="max-w-10">
          {sizes.map((color) => color.size).join(", ")}
        </span>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <GoKebabHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>View</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleEdit(row.original)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-orange-600">
            Archive
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600"
            onClick={() => handleDelete(row.original.id)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
