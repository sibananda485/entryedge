import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MapPinIcon,
  BriefcaseIcon,
  CalendarIcon,
  CurrencyIcon as CurrencyDollarIcon,
} from "lucide-react";

export const JobCardsSkeleton = () => {
  return (
    <>
      <div className="space-y-3">
        {[1, 2, 3].map((index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center space-x-2">
                  <CurrencyDollarIcon className="h-4 w-4 text-muted-foreground" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center space-x-2">
                  <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <Skeleton className="h-4 w-36" />
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[1, 2, 3, 4].map((skillIndex) => (
                    <Skeleton key={skillIndex} className="h-6 w-16" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};
