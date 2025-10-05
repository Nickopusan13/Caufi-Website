import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { LuArrowUpDown } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { GoKebabHorizontal } from "react-icons/go";

export const PaymentData: Payment[] = [
  {
    customer: "m5gr84i9",
    amount: 316,
    category: "Shoes",
    product: "Nike",
    status: "success",
    email: "ken99@example.com",
  },
  {
    customer: "3u1reuv4",
    amount: 242,
    category: "Shoes",
    product: "Nike",
    status: "success",
    email: "Abe45@example.com",
  },
  {
    customer: "derv1ws0",
    amount: 837,
    category: "Shoes",
    product: "Nike",
    status: "processing",
    email: "Monserrat44@example.com",
  },
  {
    customer: "5kma53ae",
    amount: 874,
    category: "Shoes",
    product: "Nike",
    status: "success",
    email: "Silas22@example.com",
  },
  {
    customer: "bhqecj4p",
    amount: 721,
    category: "Shoes",
    product: "Nike",
    status: "failed",
    email: "carmella@example.com",
  },
  {
    customer: "bhqecj4p",
    amount: 721,
    category: "Shoes",
    product: "Nike",
    status: "failed",
    email: "carmella@example.com",
  },
  {
    customer: "bhqecj4p",
    amount: 721,
    category: "Shoes",
    product: "Nike",
    status: "failed",
    email: "carmella@example.com",
  },
  {
    customer: "bhqecj4p",
    amount: 721,
    category: "Shoes",
    product: "Nike",
    status: "failed",
    email: "carmella@example.com",
  },
  {
    customer: "bhqecj4p",
    amount: 721,
    category: "Shoes",
    product: "Nike",
    status: "failed",
    email: "carmella@example.com",
  },
  {
    customer: "bhqecj4p",
    amount: 721,
    category: "Shoes",
    product: "Nike",
    status: "failed",
    email: "carmella@example.com",
  },
  {
    customer: "bhqecj4p",
    amount: 721,
    category: "Shoes",
    product: "Nike",
    status: "failed",
    email: "carmella@example.com",
  },
];

export type Payment = {
  customer: string;
  amount: number;
  category: string;
  product: string;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="border-blue-900"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(val) => table.toggleAllPageRowsSelected(!!val)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="border-blue-900"
        checked={row.getIsSelected()}
        onCheckedChange={(val) => row.toggleSelected(!!val)}
        aria-label="select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => <span>{row.getValue("customer")}</span>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center justify-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <LuArrowUpDown />
        </button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center justify-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <LuArrowUpDown />
        </button>
      );
    },
    cell: ({ row }) => <span>{row.getValue("status")}</span>,
  },
  {
    accessorKey: "product",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center justify-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product
          <LuArrowUpDown />
        </button>
      );
    },
    cell: ({ row }) => <span>{row.getValue("product")}</span>,
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center justify-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <LuArrowUpDown />
        </button>
      );
    },
    cell: ({ row }) => <span>{row.getValue("category")}</span>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 w-full justify-end"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount <LuArrowUpDown />
      </button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <GoKebabHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Refund</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-orange-600">
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
