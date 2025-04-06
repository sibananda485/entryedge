import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { UserNav } from "./components/user-nav";
// import { data } from "./data/data";
import {
  fetchJobData,
  selectJobData,
  selectJobLoading,
} from "../jobs/jobSlice";
import { useEffect } from "react";

export default function Tasks() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectJobLoading);
  const data = useAppSelector(selectJobData);
  useEffect(() => {
    !data && dispatch(fetchJobData());
  }, [data]);
  console.log(loading);
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
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={data || []} columns={columns} />
      </div>
    </>
  );
}
