import { useAppSelector } from "@/app/hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { selectRole } from "@/features/auth/authSlice";
import AppliedJob from "@/features/candidate/appliedJobs/AppliedJob";
import SavedJob from "@/features/candidate/savedJob/SavedJob";
import Tasks from "@/features/myJobsTable/MyJobsTable";

export function MyJobs() {
  const role = useAppSelector(selectRole);

  if (role == "USER") {
    return (
      <div className="mx-2">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Applied</TabsTrigger>
            <TabsTrigger value="password">Saved</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <AppliedJob />
          </TabsContent>
          <TabsContent value="password">
            <SavedJob />
          </TabsContent>
        </Tabs>
      </div>
    );
  } else {
    return <Tasks />;
  }
}
