import {
  CalendarIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedinIcon,
  MapPinIcon,
  UsersIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/app/hooks";
import { selectCompanyData } from "./companySlice";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";

export default function CompanyPreview() {
  const companyData = useAppSelector(selectCompanyData);
  const [show, setShow] = useState(!companyData);
  return (
    <>
      <div className="max-w-6xl mt-10 container mx-auto p-6 space-y-10">
        {!companyData && show && (
          <Alert className="mx-auto flex justify-between items-end">
            <div>
              <div className="flex items-center gap-1">
                {/* <Terminal className="h-4 w-4" /> */}
                <AlertTitle className="text-destructive">
                  Your Company Details are incomplete
                </AlertTitle>
              </div>
              <AlertDescription>
                Please complete your company details by filiing the form
              </AlertDescription>
            </div>
            <div>
              <Button onClick={() => setShow(false)} className="mt-3">
                OK
              </Button>
            </div>
          </Alert>
        )}
        <header className="relative flex gap-8">
          {companyData && (
            <div className="bg-foreground text-background w-16 h-16 flex items-center justify-center text-4xl font-bold rounded-lg">
              {companyData.name[0]}
            </div>
          )}

          <div>
            <h1 className="text-3xl font-bold">
              {companyData ? companyData.name : "N/A"}
            </h1>
            <p className="text-muted-foreground">
              {companyData ? companyData.industry : "N/A"}
            </p>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>About Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{companyData ? companyData.bio : "N/A"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Company Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <UsersIcon className="text-muted-foreground" />
                <span>
                  Size: {companyData ? companyData.size.toLowerCase() : "N/A"}{" "}
                  {companyData && "company"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="text-muted-foreground" />
                <span>
                  Founded:{" "}
                  {companyData
                    ? new Date(companyData.startDate).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPinIcon className="text-muted-foreground" />
                {companyData ? (
                  <span>{`${companyData.city}, ${companyData.state} ${companyData.zip}, ${companyData.country}`}</span>
                ) : (
                  "N/A"
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Connect With Us</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              disabled={!companyData}
              onClick={() =>
                companyData && window.open(companyData.website, "_blank")
              }
            >
              <GlobeIcon className="h-4 w-4" />
              <span>Website</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              disabled={!companyData}
              onClick={() =>
                companyData && window.open(companyData.linkedIn, "_blank")
              }
            >
              <LinkedinIcon className="h-4 w-4" />
              <span>LinkedIn</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              disabled={!companyData}
              onClick={() =>
                companyData && window.open(companyData.instagram, "_blank")
              }
            >
              <InstagramIcon className="h-4 w-4" />
              <span>Instagram</span>
            </Button>
          </CardContent>
        </Card>

        <Separator />

        <footer className="text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            {companyData ? companyData.name : "N/A"}. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
