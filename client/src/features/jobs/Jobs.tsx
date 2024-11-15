import {
  CalendarIcon,
  MapPinIcon,
  BriefcaseIcon,
  CurrencyIcon as CurrencyDollarIcon,
  BookmarkIcon,
  CurrencyIcon,
  ClockIcon,
  BuildingIcon,
  GraduationCapIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function Jobs() {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-3 gap-5">
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => {
          return <JobCard key={i} />;
        })}
      </div>
      <Card className="sticky top-14 h-remaining-height col-span-2 overflow-auto">
        <ScrollArea className="h-full">
          <CardHeader className="sticky top-0 bg-background">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold">
                  Senior Frontend Developer
                </CardTitle>
                <CardDescription className="text-lg">
                  TechCorp Solutions
                </CardDescription>
              </div>
              <Button variant="outline" size="icon">
                <BookmarkIcon className="h-4 w-4" />
                <span className="sr-only">Save job</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                  <span>San Francisco, CA (Remote)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CurrencyIcon className="h-4 w-4 text-muted-foreground" />
                  <span>$120,000 - $160,000 / year</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
                  <span>Full-time</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ClockIcon className="h-4 w-4 text-muted-foreground" />
                  <span>40 hours / week</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BuildingIcon className="h-4 w-4 text-muted-foreground" />
                  <span>Tech Industry</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GraduationCapIcon className="h-4 w-4 text-muted-foreground" />
                  <span>Bachelor's degree</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span>Apply by: July 15, 2023</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge>React</Badge>
                <Badge>TypeScript</Badge>
                <Badge>Next.js</Badge>
                <Badge>Tailwind CSS</Badge>
                <Badge>GraphQL</Badge>
                <Badge>Jest</Badge>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">About TechCorp Solutions</h3>
                <p className="text-sm text-muted-foreground">
                  TechCorp Solutions is a leading innovator in cloud-based
                  software solutions. We're dedicated to creating cutting-edge
                  technologies that help businesses streamline their operations
                  and boost productivity.
                </p>
              </div>
              <Separator />
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Job Description</h3>
                  <p className="text-sm text-muted-foreground">
                    We are seeking a talented and experienced Senior Frontend
                    Developer to join our dynamic team. In this role, you will
                    be responsible for developing and maintaining high-quality,
                    scalable web applications using modern frontend
                    technologies.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Key Responsibilities</h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>
                      Develop and maintain complex frontend applications using
                      React and TypeScript
                    </li>
                    <li>
                      Collaborate with UX designers to implement responsive and
                      accessible user interfaces
                    </li>
                    <li>Write clean, efficient, and reusable code</li>
                    <li>
                      Participate in code reviews and mentor junior developers
                    </li>
                    <li>
                      Optimize application performance and improve user
                      experience
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    Required Qualifications
                  </h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>5+ years of experience in frontend development</li>
                    <li>
                      Strong proficiency in React, TypeScript, and modern
                      JavaScript
                    </li>
                    <li>Experience with Next.js and server-side rendering</li>
                    <li>Familiarity with GraphQL and RESTful APIs</li>
                    <li>
                      Knowledge of frontend testing frameworks (e.g., Jest,
                      React Testing Library)
                    </li>
                    <li>
                      Bachelor's degree in Computer Science or related field
                    </li>
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
      {/* </div> */}
    </div>
  );
}

function JobCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Senior Frontend Developer</CardTitle>
        <CardDescription>TechCorp Solutions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex items-center space-x-2">
            <MapPinIcon className="h-4 w-4 text-muted-foreground" />
            <span>San Francisco, CA (Remote)</span>
          </div>
          <div className="flex items-center space-x-2">
            <CurrencyDollarIcon className="h-4 w-4 text-muted-foreground" />
            <span>$120,000 - $160,000 / year</span>
          </div>
          <div className="flex items-center space-x-2">
            <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
            <span>Full-time</span>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span>Apply by: July 15, 2023</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge>React</Badge>
            <Badge>TypeScript</Badge>
            <Badge>Next.js</Badge>
            <Badge>Tailwind CSS</Badge>
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
}
