import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfilePreview from "./CompanyPreview";
import Profile from "./CompanyForm";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchCompanyData,
  selectCompanyData,
  selectCompanyError,
  selectCompanyLoading,
} from "./companySlice";
import { Loader } from "lucide-react";
import ApiError from "@/components/custom/ApiError";

export function CompanyTab() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCompanyLoading);
  const data = useAppSelector(selectCompanyData);
  const error = useAppSelector(selectCompanyError);
  useEffect(() => {
    !data && dispatch(fetchCompanyData());
  }, [data]);

  if (loading) {
    return <Loader className="animate-spin mx-auto mt-20" />;
  }
  if (error) {
    return (
      <ApiError
        message="Error whlile getting the profile data"
        title="ERROR PROFILE DATA !"
        onRetry={() => dispatch(fetchCompanyData())}
      />
    );
  }

  return (
    <Tabs defaultValue="account">
      <TabsList className="max-w-4xl mx-auto mt-3 grid w-full grid-cols-2 bg-transparent">
        <TabsTrigger
          value="account"
          className="bg-transparent text-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:font-bold data-[state=active]:shadow-none text-base py-3 rounded-none"
        >
          Preview
        </TabsTrigger>
        <TabsTrigger
          value="password"
          className="bg-transparent text-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:font-bold data-[state=active]:shadow-none text-base py-3 rounded-none"
        >
          Edit
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <ProfilePreview />
      </TabsContent>
      <TabsContent value="password">
        <Profile />
      </TabsContent>
    </Tabs>
  );
}
