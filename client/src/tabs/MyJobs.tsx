import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppliedJob from "@/features/appliedJobs/AppliedJob";
import SavedJob from "@/features/savedJob/SavedJob";

export function MyJobs() {
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
}
