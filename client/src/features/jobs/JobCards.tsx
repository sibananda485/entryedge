import { useAppDispatch, useAppSelector } from "@/app/hooks";
import ApiError from "@/components/custom/ApiError";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  MapPinIcon,
  BriefcaseIcon,
  CalendarIcon,
  CurrencyIcon as CurrencyDollarIcon,
} from "lucide-react";
import { useEffect } from "react";
import { JobCardsSkeleton } from "./JobCardsSkeleton";
import {
  selectJobLoading,
  selectJobData,
  selectJobDataById,
  selectJobError,
  selectJobSelectedId,
  fetchJobData,
  fetchJobDataById,
} from "./jobSlice";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export const JobCards = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectJobLoading);
  const data = useAppSelector(selectJobData);
  const dataById = useAppSelector(selectJobDataById);
  const error = useAppSelector(selectJobError);
  const selectedId = useAppSelector(selectJobSelectedId);

  useEffect(() => {
    !data && dispatch(fetchJobData());
    if (data && data?.length > 0) {
      !dataById && dispatch(fetchJobDataById(data[0].id));
    }
  }, [data, dataById]);

  const handleGetJobDetails = (id: string) => {
    dispatch(fetchJobDataById(id));
  };

  if (loading) {
    return <JobCardsSkeleton />;
  }

  if (error) {
    return (
      <ApiError
        message="Error whlile getting the job data"
        title="ERROR JOB DATA !"
        onRetry={() => dispatch(fetchJobData())}
      />
    );
  }
  return (
    <div className="space-y-3">
      {data?.map((job) => {
        return (
          <Card
            key={job.id}
            className={selectedId == job.id ? "border-foreground" : ""}
            onClick={() => handleGetJobDetails(job.id)}
          >
            <CardHeader>
              <CardTitle className="text-xl sm:text-base">
                {job.title}
              </CardTitle>
              <CardDescription>{job.Company.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-1 sm:gap-4">
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                  <span>{job.location}</span>
                </div>
                <div className="hidden sm:flex items-center space-x-2">
                  <CurrencyDollarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>
                    ${job.salaryMin} - {job.salaryMax} / year
                  </span>
                </div>
                <div className="hidden sm:flex items-center space-x-2">
                  <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
                  <span>{job.employmentType}</span>
                </div>
                <div className="hidden sm:flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>Apply by: {format(job.deadline, "dd-mm-yyyy")}</span>
                </div>
                <div className="hidden sm:flex flex-wrap gap-2 mt-2">
                  {job.skills.split(",").map((a, i) => (
                    <Badge key={i}>{a.trim()}</Badge>
                  ))}
                </div>
                <div className="flex sm:hidden flex-wrap gap-2 mt-2">
                  <Badge>{job.employmentType}</Badge>
                </div>
              </div>
            </CardContent>
            {/* <CardFooter className="flex justify-between">
          <Button variant="outline" className="w-[48%]">
            <BookmarkIcon className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button className="w-[48%]">Apply Now</Button>
        </CardFooter> */}
          </Card>
        );
      })}
    </div>
  );
};
