import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import {
  fetchJobData,
  selectJobData,
  selectJobLoading,
} from "../jobs/jobSlice";
import { useEffect } from "react";

export default function MyJobsTable() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectJobLoading);
  const data = useAppSelector(selectJobData);
  useEffect(() => {
    !data && dispatch(fetchJobData());
  }, [data]);
  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Your Posted Jobs!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your posted job!
            </p>
          </div>
          {/* <div className="flex items-center space-x-2">
            <UserNav />
          </div> */}
        </div>
        <DataTable data={data || []} columns={columns} />
      </div>
    </>
  );
}
