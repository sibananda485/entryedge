import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "@/lib/constants";
import { AppliedJob } from "@/features/candidate/appliedJobs/appliedJobSlice";
import {
  fetchApplicant,
  selectApplicantData,
  selectApplicantLoading,
} from "./applicantSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

export default function Applicants() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectApplicantData);
  const loading = useAppSelector(selectApplicantLoading);

  useEffect(() => {
    dispatch(fetchApplicant(id || ""));
  }, [id]);

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
            <h2 className="text-2xl font-bold tracking-tight">Applicants!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of applicant!
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
