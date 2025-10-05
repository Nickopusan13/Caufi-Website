"use client";

import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { FaFilter, FaFileExport } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaymentData, columns } from "./ColumnItem";
import { useState } from "react";
import { DropdownMenuCheckboxItem } from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function RecentPurhaces() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [action, setAction] = useState("");
  const table = useReactTable({
    data: PaymentData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 7,
      },
    },
  });
  return (
    <Card className="px-10">
      <CardHeader className="flex  items-center justify-between">
        <CardTitle>Recent Purhaces</CardTitle>
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn("email")?.setFilterValue(e.target.value)
            }
          />
        </div>
        {table.getSelectedRowModel().rows.length > 0 ? (
          <div className="flex gap-3">
            <Select onValueChange={setAction}>
              <SelectTrigger className="flex gap-1 w-25 items-center justify-between shadow-lg px-3 py-1 rounded border-2 hover:scale-105 text-sm">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="refund">Refund</SelectItem>
                <SelectItem value="archive">Archive</SelectItem>
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
              className="flex gap-1 items-center justify-center shadow-lg px-3 py-1 rounded border-2 hover:scale-105 text-sm"
            >
              Apply
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex gap-1 items-center justify-center shadow-lg px-3 py-1 rounded border-2 hover:scale-105 text-sm">
                <FaFilter /> Filter
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="p-2 w-full h-full shadow-lg rounded-md border"
                align="end"
              >
                {table
                  .getAllColumns()
                  .filter((col) => col.getCanHide())
                  .map((col) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={col.id}
                        checked={col.getIsVisible()}
                        className="capitalize p-2 justify-between text-sm flex items-center gap-2 hover:bg-gray-200 outline-none rounded"
                        onCheckedChange={(val) => col.toggleVisibility(!!val)}
                      >
                        {col.id}
                        {col.getIsVisible() && (
                          <Check className="w-4 h-4 text-right text-green-500" />
                        )}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <button className="flex gap-1 items-center justify-center shadow-lg px-3 py-1 rounded border-2 hover:scale-105 text-sm">
              <FaFileExport />
              Export
            </button>
          </div>
        )}
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
                <TableCell colSpan={columns.length}>No results.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
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
        <div className="flex gap-1">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="shadow border opacity-70 rounded font-medium px-5 py-1"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="bg-blue-500 text-white rounded font-medium px-5 py-1"
          >
            Next
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
