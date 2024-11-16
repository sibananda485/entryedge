import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfilePreview from "./ProfilePreview";
import Profile from "./Profile";

export function ProfileTab() {
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
