import { useAppDispatch, useAppSelector } from "@/app/hooks";
import ApiError from "@/components/custom/ApiError";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  BookmarkIcon,
  MapPinIcon,
  CurrencyIcon,
  BriefcaseIcon,
  ClockIcon,
  BuildingIcon,
  GraduationCapIcon,
  CalendarIcon,
  Loader,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobDetailsCardSkeleton } from "./JobDetailsCardSkeleton";
import {
  selectJobLoadingById,
  selectJobDataById,
  selectJobErrorById,
  fetchJobData,
} from "./jobSlice";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  createSavedJob,
  deleteSavedJob,
  selectSavedJobData,
} from "../savedJob/savedJobSlice";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const JobDetailsCard = () => {
  const { toast } = useToast();
  const [onGoing, setOnGoing] = useState(false);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectJobLoadingById);
  const error = useAppSelector(selectJobErrorById);
  const data = useAppSelector(selectJobDataById);
  const savedJobs = useAppSelector(selectSavedJobData);
  const isJobSaved = savedJobs?.some((job) => job.id === data?.id);

  const handleAdd = async () => {
    if (data) {
      try {
        setOnGoing(true);
        await dispatch(createSavedJob(data?.id)).unwrap();
        toast({
          title: "Job saved successfully",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to save job",
          description: "Please try again",
        });
      } finally {
        setOnGoing(false);
      }
    }
  };

  const handleDelete = async () => {
    if (data) {
      try {
        setOnGoing(true);
        await dispatch(deleteSavedJob(data?.id)).unwrap();
        toast({
          title: "Saved job removed successfully",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to removed saved job",
          description: "Please try again",
        });
      } finally {
        setOnGoing(false);
      }
    }
  };

  if (loading) {
    return <JobDetailsCardSkeleton />;
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
    <Card className="sticky top-14 h-remaining-height col-span-2 overflow-auto">
      <ScrollArea className="h-full">
        <CardHeader className="sticky top-0 bg-background">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">
                {data?.title}
              </CardTitle>
              <CardDescription className="text-lg">
                {data?.Company.name}
              </CardDescription>
            </div>
            {onGoing ? (
              <Button variant="outline" size="icon">
                <Loader className="h-4 w-4 animate-spin" />
                <span className="sr-only">Save job</span>
              </Button>
            ) : isJobSaved ? (
              <Button
                onClick={() => handleDelete()}
                variant="outline"
                size="icon"
              >
                <BookmarkIcon className="h-4 w-4 fill-current" />
                <span className="sr-only">Save job</span>
              </Button>
            ) : (
              <Button onClick={() => handleAdd()} variant="outline" size="icon">
                <BookmarkIcon className="h-4 w-4" />
                <span className="sr-only">Save job</span>
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                <span>{data?.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CurrencyIcon className="h-4 w-4 text-muted-foreground" />
                <span>
                  {" "}
                  ${data?.salaryMin} - {data?.salaryMax} / year
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
                <span>{data?.employmentType}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ClockIcon className="h-4 w-4 text-muted-foreground" />
                <span>{data?.workHour} hours / week</span>
              </div>
              <div className="flex items-center space-x-2">
                <BuildingIcon className="h-4 w-4 text-muted-foreground" />
                <span>{data?.Company.industry}</span>
              </div>
              <div className="flex items-center space-x-2">
                <GraduationCapIcon className="h-4 w-4 text-muted-foreground" />
                <span>{data?.education}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span>
                Apply by: {format(data?.deadline || "", "dd-mm-yyyy")}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {data?.skills.split(",").map((a, i) => (
                <Badge key={i}>{a.trim()}</Badge>
              ))}
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">About TechCorp Solutions</h3>
              <p className="text-sm text-muted-foreground">
                {data?.Company.bio}
              </p>
            </div>
            <Separator />
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Job Description</h3>
                <p className="text-sm text-muted-foreground">{data?.jd}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Key Responsibilities</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {data?.responsibilities.split("-").map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Required Qualifications</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {data?.qualification.split("-").map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="w-[48%]">
            <BookmarkIcon className="mr-2 h-4 w-4" />
            Save for Later
          </Button>
          <Button className="w-[48%]">Apply Now</Button>
        </CardFooter>
      </ScrollArea>
    </Card>
  );
};
