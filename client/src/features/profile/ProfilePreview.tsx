import {
  CalendarIcon,
  EditIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedinIcon,
  MapPinIcon,
  UsersIcon,
  Loader,
} from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/lib/constants";

// Form schema
const formSchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  industry: z.string().min(2, "Industry must be at least 2 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  website: z.string().url("Please enter a valid URL"),
  linkedIn: z.string().url("Please enter a valid LinkedIn URL"),
  instagram: z.string().url("Please enter a valid Instagram URL"),
  zip: z.string().min(5, "ZIP code must be at least 5 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  size: z.enum(["SMALL", "MEDIUM", "LARGE"]),
  startDate: z.date(),
});

// Dummy data
// const companyData = formSchema.parse({
//   name: "Acme Inc.",
//   industry: "Technology",
//   bio: "Acme Inc. is a leading technology company specializing in innovative solutions for businesses worldwide. With a focus on artificial intelligence and machine learning, we're shaping the future of enterprise software.",
//   website: "https://acme.com",
//   linkedIn: "https://linkedin.com/company/acme",
//   instagram: "https://instagram.com/acmeinc",
//   zip: "94105",
//   country: "United States",
//   city: "San Francisco",
//   state: "CA",
//   size: "LARGE",
//   startDate: new Date("2010-01-15"),
// });

export default function ProfilePreview() {
  const [companyData, setCompanyData] = useState<z.infer<
    typeof formSchema
  > | null>(null);
  const getCompany = async () => {
    const response = await axios.get(BASE_URL + "/company");
    setCompanyData(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getCompany();
  }, []);
  const handleEdit = (section: string) => {
    console.log(`Editing ${section}`);
  };
  if (!companyData) {
    return <Loader className="animate-spin" />;
  }
  return (
    <div className="max-w-6xl container mx-auto p-6 space-y-8">
      <header className="text-center relative">
        <h1 className="text-3xl font-bold">{companyData.name}</h1>
        <p className="text-muted-foreground">{companyData.industry}</p>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-0 right-0"
          onClick={() => handleEdit("header")}
          aria-label="Edit company name and industry"
        >
          <EditIcon className="h-4 w-4" />
        </Button>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>About Us</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleEdit("about")}
              aria-label="Edit about section"
            >
              <EditIcon className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <p>{companyData.bio}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Company Details</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleEdit("details")}
              aria-label="Edit company details"
            >
              <EditIcon className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <UsersIcon className="text-muted-foreground" />
              <span>Size: {companyData.size.toLowerCase()} company</span>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="text-muted-foreground" />
              <span>
                Founded: {new Date(companyData.startDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPinIcon className="text-muted-foreground" />
              <span>{`${companyData.city}, ${companyData.state} ${companyData.zip}, ${companyData.country}`}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Connect With Us</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleEdit("connect")}
            aria-label="Edit connection links"
          >
            <EditIcon className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button
            variant="outline"
            className="flex items-center space-x-2"
            onClick={() => window.open(companyData.website, "_blank")}
          >
            <GlobeIcon className="h-4 w-4" />
            <span>Website</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center space-x-2"
            onClick={() => window.open(companyData.linkedIn, "_blank")}
          >
            <LinkedinIcon className="h-4 w-4" />
            <span>LinkedIn</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center space-x-2"
            onClick={() => window.open(companyData.instagram, "_blank")}
          >
            <InstagramIcon className="h-4 w-4" />
            <span>Instagram</span>
          </Button>
        </CardContent>
      </Card>

      <Separator />

      <footer className="text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} {companyData.name}. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
