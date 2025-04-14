import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { BASE_URL } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { fetchJobData } from "../../jobs/jobSlice";
import { useAppDispatch } from "@/app/hooks";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Job title must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  salaryMin: z.string().min(0, {
    message: "Salary must be a positive number.",
  }),
  salaryMax: z.string().min(0, {
    message: "Salary must be a positive number.",
  }),
  employmentType: z.enum(["Full-time", "Part-time", "Contract", "Temporary"]),
  workHour: z.string().min(1).max(168),

  education: z.string().min(2, {
    message: "Education must be at least 2 characters.",
  }),
  deadline: z.date(),
  skills: z.string().min(2, {
    message: "Skills must be at least 2 characters.",
  }),
  jd: z.string().min(10, {
    message: "Job description must be at least 10 characters.",
  }),
  responsibilities: z.string().min(10, {
    message: "Responsibilities must be at least 10 characters.",
  }),
  qualification: z.string().min(10, {
    message: "Qualifications must be at least 10 characters.",
  }),
});

export default function Job() {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      salaryMin: "",
      salaryMax: "",
      employmentType: "Full-time",
      workHour: "",
      education: "",
      deadline: new Date(),
      skills: "",
      jd: "",
      responsibilities: "",
      qualification: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post(BASE_URL + "/job", values);
      if (res.status === 201) {
        await dispatch(fetchJobData()).unwrap();
        form.reset();
        toast({
          title: "Job Posted successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to post job",
          description: "Please try again",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to post job",
        description: "Please try again",
      });
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Create Job Listing</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Senior Frontend Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="San Francisco, CA (Remote)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select employment type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Temporary">Temporary</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="salaryMin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Salary</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="120000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salaryMax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Salary</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="160000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="workHour"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hours per Week</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="40" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Required Education</FormLabel>
                    <FormControl>
                      <Input placeholder="Bachelor's degree" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apply By</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={
                          field.value ? format(field.value, "yyyy-MM-dd") : ""
                        }
                        onChange={(e) => field.onChange(e.target.valueAsDate)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Required Skills</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="React, TypeScript, Next.js, Tailwind CSS, GraphQL, Jest"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Separate skills with commas</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="We are seeking a talented and experienced Senior Frontend Developer..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="responsibilities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Responsibilities</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="- Develop and maintain complex frontend applications using React and TypeScript
- Collaborate with UX designers to implement responsive and accessible user interfaces
- Write clean, efficient, and reusable code
- Participate in code reviews and mentor junior developers
- Optimize application performance and improve user experience"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter each responsibility on a new line, starting with a
                    dash (-)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="qualification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Required Qualifications</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="- 5+ years of experience in frontend development
- Strong proficiency in React, TypeScript, and modern JavaScript
- Experience with Next.js and server-side rendering
- Familiarity with GraphQL and RESTful APIs
- Knowledge of frontend testing frameworks (e.g., Jest, React Testing Library)
- Bachelor's degree in Computer Science or related field"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter each qualification on a new line, starting with a dash
                    (-)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create Job Listing</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
