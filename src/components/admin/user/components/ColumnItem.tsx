import { ColumnDef } from "@tanstack/react-table";
import { UserOut } from "@/utils/api";
import { Checkbox } from "@/components/ui/checkbox";
import TableFilter from "@/components/ui/TableFilter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { GoKebabHorizontal } from "react-icons/go";
import Image from "next/image";

export const getColumns = (
  handleDelete: (id: number) => void,
  handleEdit: (user: UserOut) => void
): ColumnDef<UserOut>[] => [
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
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("image") as { imageUrl?: string } | null;
      const imageUrl = image?.imageUrl || "/default-avatar.png";
      return (
        <Image src={imageUrl} alt="Profile Image" width={60} height={60} />
      );
    },
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => <TableFilter column={column} title="First Name" />,
    cell: ({ row }) => <span>{row.getValue("firstName")}</span>,
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => <TableFilter column={column} title="Last Name" />,
    cell: ({ row }) => <span>{row.getValue("lastName")}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span>{row.getValue("email")}</span>,
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => <span>{row.getValue("phoneNumber")}</span>,
  },
  {
    accessorKey: "registerTime",
    header: ({ column }) => (
      <TableFilter column={column} title="Register Time" />
    ),
    cell: ({ row }) => <span>{row.getValue("registerTime")}</span>,
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <TableFilter column={column} title="Status Active" />
    ),
    cell: ({ row }) => {
      const active = row.getValue("isActive") as boolean;
      return (
        <span className={active ? "text-green-600" : "text-red-600"}>
          {active ? "Active" : "Inactive"}
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
