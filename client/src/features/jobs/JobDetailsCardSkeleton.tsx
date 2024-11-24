import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  BookmarkIcon,
  MapPinIcon,
  CurrencyIcon,
  BriefcaseIcon,
  ClockIcon,
  BuildingIcon,
  GraduationCapIcon,
  CalendarIcon,
} from "lucide-react";

export const JobDetailsCardSkeleton = () => {
  return (
    <>
      <Card className="sticky top-14 h-[calc(100vh-3.5rem)] col-span-2 overflow-auto">
        <ScrollArea className="h-full">
          <CardHeader className="sticky top-0 bg-background">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-6 w-48" />
              </div>
              <Button variant="outline" size="icon" disabled>
                <BookmarkIcon className="h-4 w-4" />
                <span className="sr-only">Save job</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  MapPinIcon,
                  CurrencyIcon,
                  BriefcaseIcon,
                  ClockIcon,
                  BuildingIcon,
                  GraduationCapIcon,
                ].map((Icon, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <Skeleton key={index} className="h-6 w-16" />
                ))}
              </div>
              <Separator />
              <div>
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full mt-2" />
              </div>
              <Separator />
              <div className="space-y-4">
                {[
                  "Job Description",
                  "Key Responsibilities",
                  "Required Qualifications",
                ].map((_, index) => (
                  <div key={index}>
                    <Skeleton className="h-6 w-40 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-4 w-3/4 mt-2" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="w-[48%]" disabled>
              <BookmarkIcon className="mr-2 h-4 w-4" />
              Save for Later
            </Button>
            <Button className="w-[48%]" disabled>
              Apply Now
            </Button>
          </CardFooter>
        </ScrollArea>
      </Card>
    </>
  );
};
