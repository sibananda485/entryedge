import { useAppDispatch, useAppSelector } from "@/app/hooks";
import ApiError from "@/components/custom/ApiError";
import {
  ArrowLeft,
  BuildingIcon,
  CalendarIcon,
  Loader,
  MapPinIcon,
} from "lucide-react";
import { useEffect } from "react";
import {
  selectAppliedJobData,
  selectAppliedJobLoading,
  selectAppliedJobError,
  fetchAppliedJob,
} from "./appliedJobSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function AppliedJob() {
  const dispatch = useAppDispatch();
  const appliedJobData = useAppSelector(selectAppliedJobData);
  const loading = useAppSelector(selectAppliedJobLoading);
  const error = useAppSelector(selectAppliedJobError);

  useEffect(() => {
    !appliedJobData && dispatch(fetchAppliedJob());
  }, [appliedJobData]);

  if (loading) {
    return <Loader className="animate-spin mx-auto mt-20" />;
  }

  if (error) {
    return (
      <ApiError
        message="Error whlile getting the applied job"
        title="ERROR APPLIED JOB !"
        onRetry={() => dispatch(fetchAppliedJob())}
      />
    );
  }
  if (appliedJobData)
    return (
      <div className="max-w-3xl mx-auto">
        <Link to="/profile">
          <Button variant="ghost" size="icon" className="-ml-3">
            <ArrowLeft />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold mb-6">Applied Jobs</h1>
        <div className="space-y-2">
          {appliedJobData.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  You haven't applied any jobs yet.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center pb-6">
                <Link to="/">
                  <Button>
                    <Bookmark className="mr-2 h-4 w-4" />
                    Browse Jobs
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ) : (
            <>
              {appliedJobData.map((application) => (
                <Card key={application.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <Link to={"/job/" + application.jobId}>
                        {application.job.title}
                      </Link>
                      <Badge
                        variant={
                          application.status === "pending"
                            ? "secondary"
                            : "default"
                        }
                        className={`${
                          application.status == "shortlisted" && "bg-green-500"
                        } ${application.status == "rejected" && "bg-red-500"}`}
                      >
                        {application.status.charAt(0).toUpperCase() +
                          application.status.slice(1)}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {application.job.Company.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-1">
                      <MapPinIcon className="w-4 h-4 mr-2" />
                      <span>{application.job.location}</span>
                    </div>
                    <div className="flex items-center mb-1">
                      <BuildingIcon className="w-4 h-4 mr-2" />
                      <span>{application.job.employmentType}</span>
                    </div>
                    <div className="flex items-center mb-1">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      <span>
                        Applied on{" "}
                        {format(
                          application.createdAt,
                          "dd-MM-yyyy, hh:mm:ss a"
                        )}
                      </span>
                    </div>
                    {application.remarks && (
                      <div className="ring ring-muted-foreground rounded-xs p-2 mt-4  bg-secondary">
                        <p className="font-bold text-sm tracking-wider text-muted-foreground">
                          REMARKS:
                        </p>
                        <p className="font-semibold text-sm">
                          {application.remarks}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </div>
      </div>
    );
}
