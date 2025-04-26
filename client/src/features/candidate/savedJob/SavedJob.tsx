import { useAppDispatch, useAppSelector } from "@/app/hooks";
import ApiError from "@/components/custom/ApiError";
import { ArrowLeft, BookmarkIcon, Check, Loader } from "lucide-react";
import { useEffect } from "react";
import {
  selectSavedJobData,
  selectSavedJobLoading,
  selectSavedJobError,
  fetchSavedJob,
  deleteSavedJob,
} from "./savedJobSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bookmark, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  createAppliedJob,
  selectAppliedJobData,
} from "../appliedJobs/appliedJobSlice";

export default function SavedJob() {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const savedJobData = useAppSelector(selectSavedJobData);
  const loading = useAppSelector(selectSavedJobLoading);
  const error = useAppSelector(selectSavedJobError);
  const appliedJobs = useAppSelector(selectAppliedJobData);
  // const data = useAppSelector(selectJobDataById);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteSavedJob(id)).unwrap();
      toast({
        title: "Saved item removed",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to remove item",
        description: "Please try again",
      });
    }
  };
  const handleApply = async (id: string) => {
    // setIsAppling(true);
    try {
      await dispatch(createAppliedJob(id)).unwrap();
      toast({
        title: "Job applied successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to appliy job",
        description: "Please try again",
      });
    } finally {
      // setIsAppling(false);
    }
  };

  useEffect(() => {
    !savedJobData && dispatch(fetchSavedJob());
  }, [savedJobData]);

  if (loading) {
    return <Loader className="animate-spin mx-auto mt-20" />;
  }

  if (error) {
    return (
      <ApiError
        message="Error whlile getting the profile data"
        title="ERROR PROFILE DATA !"
        onRetry={() => dispatch(fetchSavedJob())}
      />
    );
  }
  if (savedJobData)
    return (
      <div className="max-w-3xl mx-auto">
        <Link to="/profile">
          <Button variant="ghost" size="icon" className="-ml-3">
            <ArrowLeft />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold mb-6">Saved Jobs</h1>
        {savedJobData.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                You haven't saved any jobs yet.
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
          <div className="space-y-4">
            {savedJobData.map((job) => {
              const isJobApplied = appliedJobs?.some(
                (a) => a.jobId === job?.id
              );

              return (
                <Card key={job.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="bg-secondary-foreground text-background flex items-center justify-center h-10 w-10 rounded-lg">
                          {job.Company.name[0]}
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold">{job.title}</h2>
                          <p className="text-sm text-muted-foreground">
                            {job.Company.name}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleDelete(job.id)}
                      >
                        <BookmarkIcon className="h-4 w-4 fill-current" />
                        <span className="sr-only">Remove job</span>
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{job.location}</p>
                  </CardContent>
                  <CardFooter className="space-x-2">
                    <Link to={`/job/${job.id}`}>
                      <Button variant="outline">
                        <ExternalLink className="h-4 w-4" />
                        View Job
                      </Button>
                    </Link>
                    <Button
                      disabled={isJobApplied}
                      onClick={() => handleApply(job.id)}
                    >
                      <Check className="h-4 w-4" />
                      {isJobApplied ? "Applied" : "Apply now"}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    );
}
