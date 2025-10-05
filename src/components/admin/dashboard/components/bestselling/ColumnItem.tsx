import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { LuArrowUpDown } from "react-icons/lu";

export const BestSellingData: BestSelling[] = [
  {
    name: "Crazy T-Shirt",
    category: "T-Shirt",
    orders: 102,
    orderPercentage: 12,
    revenue: 1200000,
    revenuePercentage: 30,
  },
  {
    name: "Classic Hoodie",
    category: "Hoodie",
    orders: 95,
    orderPercentage: 11,
    revenue: 1500000,
    revenuePercentage: 28,
  },
  {
    name: "Sport Sneakers",
    category: "Shoes",
    orders: 88,
    orderPercentage: 10,
    revenue: 2000000,
    revenuePercentage: 32,
  },
  {
    name: "Summer Shorts",
    category: "Shorts",
    orders: 75,
    orderPercentage: 9,
    revenue: 900000,
    revenuePercentage: 22,
  },
  {
    name: "Leather Jacket",
    category: "Jacket",
    orders: 60,
    orderPercentage: 7,
    revenue: 2500000,
    revenuePercentage: 40,
  },
  {
    name: "Casual Cap",
    category: "Accessories",
    orders: 55,
    orderPercentage: 6,
    revenue: 550000,
    revenuePercentage: 15,
  },
  {
    name: "Graphic Socks",
    category: "Socks",
    orders: 48,
    orderPercentage: 5,
    revenue: 300000,
    revenuePercentage: 10,
  },
  {
    name: "Denim Jeans",
    category: "Pants",
    orders: 42,
    orderPercentage: 4,
    revenue: 1200000,
    revenuePercentage: 25,
  },
  {
    name: "Formal Shirt",
    category: "Shirt",
    orders: 38,
    orderPercentage: 3.5,
    revenue: 950000,
    revenuePercentage: 20,
  },
  {
    name: "Yoga Pants",
    category: "Pants",
    orders: 30,
    orderPercentage: 3,
    revenue: 600000,
    revenuePercentage: 18,
  },
];

export type BestSelling = {
  name: string;
  category: string;
  orders: number;
  orderPercentage: number;
  revenue: number;
  revenuePercentage: number;
};

export const columns: ColumnDef<BestSelling>[] = [
  {
    accessorKey: "name",
    header: "Best Selling Products",
    cell: ({ row }) => (
      <Link
        href={row.getValue("name")}
        className="flex flex-col gap-1 hover:underline"
      >
        <span className="font-bold">{row.getValue("name")}</span>
        <span className="opacity-70">{row.original.category}</span>
      </Link>
    ),
  },
  {
    accessorKey: "orders",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center justify-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Orders
          <LuArrowUpDown />
        </button>
      );
    },
    cell: ({ row }) => <span>{row.getValue("orders")}</span>,
  },
  {
    accessorKey: "orderPercentage",
    header: "Order(%)",
    cell: ({ row }) => <span>{row.getValue("orderPercentage")}%</span>,
  },
  {
    accessorKey: "revenue",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center justify-end gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Revenue
          <LuArrowUpDown />
        </button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("revenue"));
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "revenuePercentage",
    header: "Revenue(%)",
    cell: ({ row }) => <span>{row.getValue("revenuePercentage")}%</span>,
  },
];
