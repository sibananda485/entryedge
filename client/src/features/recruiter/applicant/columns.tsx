import { ColumnDef } from "@tanstack/react-table";
import { statuses } from "./chips";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { AppliedJob } from "@/features/candidate/appliedJobs/appliedJobSlice";
import { S3_BUCKET_URL } from "@/lib/constants";

export const columns: ColumnDef<AppliedJob>[] = [
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
  },
  {
    id: "fullName",
    accessorFn: (row) =>
      row.personalData.firstName + " " + row.personalData.lastName,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    id: "email",
    accessorFn: (row) => row.personalData.User.email,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    id: "contact",
    accessorFn: (row) => row.personalData.phone,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact" />
    ),
  },
  {
    id: "city",
    accessorFn: (row) => row.personalData.city,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="City" />
    ),
  },
  {
    id: "resume",
    accessorFn: (row) => row.personalData.resumeFileName,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="City" />
    ),
    cell: ({ row }) => {
      return (
        <a
          href={S3_BUCKET_URL + row.original.personalData.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {row.original.personalData.resumeFileName}
        </a>
      );
    },
  },
  {
    id: "createdAt",
    accessorFn: (row) =>
      new Date(row.personalData.createdAt).toLocaleDateString(),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Applied On" />
    ),
  },
  {
    id: "remarks",
    accessorFn: (row) => row.remarks,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Remarks" />
    ),
  },
  {
    id: "status",
    accessorKey: "status",
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
              className={`mr-1 w-4 ${
                value == "pending"
                  ? "text-blue-500"
                  : value == "rejected"
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            />
          )}
          <span
            className={`font-semibold ${
              value == "pending"
                ? "text-blue-500"
                : value == "rejected"
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
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
