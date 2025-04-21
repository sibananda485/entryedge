import { ColumnDef } from "@tanstack/react-table";
import { employmentTypes, statuses } from "./chips";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Job } from "@/features/jobs/jobSlice";
import { Banknote, MapPin } from "lucide-react";

export const columns: ColumnDef<Job>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    // enableSorting: false,
    // enableHiding: false,
  },
  {
    id: "job title",
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("job title")}
          </span>
        </div>
      );
    },
  },
  {
    id: "type",
    accessorKey: "employmentType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const employmentType = employmentTypes.find(
        (employmentType) => employmentType.value == row.original.employmentType
      );
      if (!employmentType) return null;
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate flex items-center gap-1">
            {employmentType.icon && (
              <employmentType.icon className="mr-2 h-4 w-4 text-muted-foreground" />
            )}
            {row.getValue("type")}
          </span>
        </div>
      );
    },
  },
  {
    id: "location",
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate flex items-center gap-1">
            <MapPin className="w-4" /> {row.getValue("location")}
          </span>
        </div>
      );
    },
  },
  {
    id: "salary range",
    accessorKey: "salaryMax",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Salary Range" />
    ),
    cell: ({ row }) => {
      const employmentType = employmentTypes.find(
        (employmentType) => employmentType.value == row.original.employmentType
      );
      if (!employmentType) return null;
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate flex items-center gap-1">
            <Banknote className="mr-2 h-4 w-4 text-muted-foreground" />
            {row.original.salaryMin + "-" + row.getValue("salary range")}
          </span>
        </div>
      );
    },
  },
  {
    id: "deadline",
    accessorKey: "deadline",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deadline" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate ">
            {new Date(row.getValue("deadline")).toLocaleDateString()}
          </span>
        </div>
      );
    },
  },
  {
    id: "status",
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("status");
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon
              className={`mr-2 h-2 w-2 fill-current  ${
                value ? "text-green-500" : "text-red-500"
              }`}
            />
          )}
          <span className={`${value ? "text-green-500" : "text-red-500"}`}>
            {status.label}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
