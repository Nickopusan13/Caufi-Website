"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  getSortedRowModel,
  useReactTable,
  flexRender,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getColumns } from "./ColumnItem";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { fetchProducts } from "@/utils/api";
import type { ProductOut } from "@/utils/api";
import { deleteProduct } from "@/utils/api";
import { useRouter } from "next/navigation";

export default function ProductTable() {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [action, setAction] = useState("");
  const [product, setProduct] = useState<ProductOut[]>([]);
  const handleDelete = async (productId: number) => {
    try {
      await deleteProduct(productId);
      setProduct((prev) => prev.filter((p) => p.id !== productId));
    } catch (err) {
      console.error(err);
    }
  };
  const handleEdit = async (product: ProductOut) => {
    router.push(`product/add-product?id=${product.id}`);
  };
  const columns = getColumns(handleDelete, handleEdit);
  useEffect(() => {
    fetchProducts()
      .then((res) => setProduct(res))
      .catch((err) => console.log(err));
  }, []);
  const table = useReactTable({
    data: product as ProductOut[],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 15,
      },
    },
  });
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-xl">Products</CardTitle>
        <Input
          className="w-[300px]"
          type="text"
          placeholder="Search products"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("name")?.setFilterValue(e.target.value)
          }
        />
        <div className="flex gap-2">
          {table.getSelectedRowModel().rows.length > 0 ? (
            <div className="flex gap-3 items-center">
              <Select onValueChange={setAction}>
                <SelectTrigger className="w-32 flex items-center justify-between shadow px-3 py-1 rounded border text-sm">
                  <SelectValue placeholder="Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delete">Delete</SelectItem>
                  <SelectItem value="refund">Refund</SelectItem>
                  <SelectItem value="archive">Export</SelectItem>
                </SelectContent>
              </Select>
              <button
                onClick={() => {
                  const selectedRows = table
                    .getSelectedRowModel()
                    .rows.map((r) => r.id);

                  if (!action || selectedRows.length === 0) return;
                  console.log(action, "rows:", selectedRows);
                }}
                className="px-3 py-1 rounded border shadow text-sm hover:scale-105 transition"
              >
                Apply
              </button>
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <Select
                onValueChange={(val) => {
                  table
                    .getColumn("category")
                    ?.setFilterValue(val === "all" ? undefined : val);
                }}
              >
                <SelectTrigger className="w-40 px-3 py-1 rounded border shadow text-sm">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Category</SelectItem>
                  {Array.from(
                    table
                      .getColumn("category")
                      ?.getFacetedUniqueValues()
                      .keys() ?? []
                  ).map((item) => (
                    <SelectItem value={item} key={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                onValueChange={(val) => {
                  table
                    .getColumn("shippingType")
                    ?.setFilterValue(val === "all" ? undefined : val);
                }}
              >
                <SelectTrigger className="w-32 px-3 py-1 rounded border shadow text-sm">
                  <SelectValue placeholder="Shipping" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Shipping</SelectItem>
                  {["Caufi", "Vendor"].map((item) => (
                    <SelectItem value={item} key={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="bg-zinc-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>No results</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-center items-center whitespace-nowrap">
        <div className="text-muted-foreground text-sm">
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}{" "}
          to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} row(s)
        </div>
        <Pagination className="flex items-center justify-center">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={
                  table.getCanPreviousPage()
                    ? "cursor-pointer"
                    : "pointer-events-none opacity-50"
                }
                onClick={() => table.previousPage()}
              />
            </PaginationItem>
            {Array.from({ length: table.getPageCount() }, (_, idx) => (
              <PaginationItem key={idx}>
                <PaginationLink
                  className={
                    table.getState().pagination.pageIndex === idx
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                  isActive={table.getState().pagination.pageIndex === idx}
                  onClick={() => table.setPageIndex(idx)}
                >
                  {idx + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {table.getPageCount() > 5 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                className={
                  table.getCanNextPage()
                    ? "cursor-pointer"
                    : "pointer-events-none opacity-50"
                }
                onClick={() => table.nextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}
