import { JobDetailsCard } from "./JobDetailsCard";
import { JobCards } from "./JobCards";
import { useAppSelector } from "@/app/hooks";
import { selectJobData } from "./jobSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FilePlus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Jobs() {
  const jobs = useAppSelector(selectJobData);
  if (jobs && jobs.length == 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              No Jobs Posted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              You haven't posted any jobs yet. Start attracting top talent by
              creating your first job posting!
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/post">
              <Button>
                <FilePlus className="mr-2 h-4 w-4" />
                Create Job Post
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }
  return (
    <div>
      <p className="sm:hidden">Jobs for you</p>
      <div className="px-2 max-w-6xl mx-auto sm:grid grid-cols-3 gap-5">
        <JobCards />
        <JobDetailsCard />
      </div>
    </div>
  );
}
