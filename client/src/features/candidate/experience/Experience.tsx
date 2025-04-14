import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  CalendarIcon,
  Loader,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import ApiError from "@/components/custom/ApiError";
import {
  selectExperienceLoading,
  selectExperienceData,
  selectExperienceError,
  fetchExperience,
} from "./experienceSlice";
import axios from "axios";
import { BASE_URL } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const getSchema = (flag: boolean) => {
  const ExperienceSchema = z.object({
    company: z.string().min(1, { message: "Company is required." }),
    jobTitle: z.string().min(1, { message: "Job title is required." }),
    location: z.string().min(1, { message: "Location is required." }),
    startDate: z.date({ required_error: "Start date is required." }),
    endDate: flag
      ? z.date({ required_error: "End date is required." }).optional()
      : z.date({ required_error: "End date is required." }),
    description: z.string().optional(),
    isCurrent: z.boolean(),
    industry: z.string().optional(),
    employmentType: z.string(),
  });
  return ExperienceSchema;
};

type ExperienceEntry = {
  company: string;
  jobTitle: string;
  location: string;
  startDate: Date;
  isCurrent: boolean;
  employmentType: string;
  endDate?: Date;
  description?: string;
  industry?: string;
};

export default function Experience() {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const experienceData = useAppSelector(selectExperienceData);
  const loading = useAppSelector(selectExperienceLoading);
  const error = useAppSelector(selectExperienceError);

  const form = useForm<ExperienceEntry>({
    resolver: async (values, context, options) => {
      const Schema = getSchema(values.isCurrent);
      return zodResolver(Schema)(values, context, options);
    },
    defaultValues: {
      company: "",
      jobTitle: "",
      isCurrent: false,
      employmentType: "",
      description: "",
      industry: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: ExperienceEntry) => {
    try {
      const res = await axios.post(BASE_URL + "/experience", data);
      if (res.status == 201) {
        await dispatch(fetchExperience()).unwrap();
        form.reset();
        toast({
          title: "Ecucation added successfully",
        });
      } else {
        toast({
          title: "Failed to add experience",
          description: "Please try again",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to add experience",
        description: "Please try again",
      });
    }
  };
  const onEditSubmit = async (data: ExperienceEntry, index: number) => {
    try {
      const res = await axios.patch(BASE_URL + "/experience/" + index, data);
      if (res.status == 201) {
        await dispatch(fetchExperience()).unwrap();
        form.reset();
        toast({
          title: "Ecucation updated successfully",
        });
      } else {
        toast({
          title: "Failed to update experience",
          description: "Please try again",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to update experience",
        description: "Please try again",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(BASE_URL + "/experience" + id);
      if (res.status == 200) {
        await dispatch(fetchExperience()).unwrap();
        form.reset();
        toast({
          title: "Ecucation deleted successfully",
        });
      } else {
        toast({
          title: "Failed to delete experience",
          description: "Please try again",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete experience",
        description: "Please try again",
      });
    }
  };

  useEffect(() => {
    !experienceData && dispatch(fetchExperience());
  }, [experienceData]);

  if (loading) {
    return <Loader className="animate-spin mx-auto mt-20" />;
  }

  if (error) {
    return (
      <ApiError
        message="Error whlile getting the profile data"
        title="ERROR PROFILE DATA !"
        onRetry={() => dispatch(fetchExperience())}
      />
    );
  }

  return (
    <>
      <Card className="max-w-5xl mx-auto border-none shadow-none">
        <Link to="/profile">
          <Button variant="ghost" size="icon" className="ml-3">
            <ArrowLeft />
          </Button>
        </Link>
        <CardHeader className="pt-1">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 text-2xl font-bold">
              {" "}
              {/* <GraduationCap /> */}
              Experience
            </CardTitle>
            <Dialog>
              <DialogTrigger
                onClick={() =>
                  form.reset({
                    company: "",
                    jobTitle: "",
                    location: "",
                    description: "",
                    isCurrent: false,
                    employmentType: "",
                    industry: "",
                  })
                }
                asChild
              >
                <Button variant="secondary">
                  <Plus /> Add
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Add Experience</DialogTitle>
                  <DialogDescription>
                    Add your experience details below.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    {/* Company Field */}
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Google" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-5">
                      {/* Job Title Field */}
                      <FormField
                        control={form.control}
                        name="jobTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Software Engineer"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Industry */}
                      <FormField
                        control={form.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Industry</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Technology, Finance"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      {/* Employment Type */}
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
                                  <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="full-time">
                                  Fulltime
                                </SelectItem>
                                <SelectItem value="part-time">
                                  Parttime
                                </SelectItem>
                                <SelectItem value="internship">
                                  Internship
                                </SelectItem>
                              </SelectContent>
                            </Select>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Location Field */}
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. San Francisco, CA"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      {/* Start Date Field */}
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Start Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={`w-full justify-start text-left font-normal ${
                                      !field.value && "text-muted-foreground"
                                    }`}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? (
                                      format(field.value, "MMMM yyyy")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date > new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* End Date Field */}
                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>End Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={`w-full justify-start text-left font-normal ${
                                      !field.value && "text-muted-foreground"
                                    }`}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? (
                                      format(field.value, "MMMM yyyy")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date > new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Currently Employed Checkbox */}
                    <FormField
                      control={form.control}
                      name="isCurrent"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel
                            style={{ marginTop: 0 }}
                            className="text-accent-foreground font-normal"
                          >
                            Currently Employed
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    {/* Description */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Brief description of your role"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <DialogFooter>
                      <Button disabled={isSubmitting} type="submit">
                        {isSubmitting && <Loader />}
                        Add
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          <CardDescription>Manage your Experience information.</CardDescription>
        </CardHeader>
        <div className="divide-y-2">
          {experienceData && experienceData.length > 0 ? (
            experienceData.map((entry, index) => (
              <div key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      {/* Display Company and Job Title */}
                      <CardTitle className="text-lg font-semibold">
                        {entry.jobTitle} at {entry.company}
                      </CardTitle>
                      {/* Display Location and Employment Type */}
                      <CardDescription className="text-sm">
                        {entry.location} · {entry.employmentType}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      {/* Edit Dialog */}
                      <Dialog>
                        <DialogTrigger
                          onClick={() => {
                            form.reset({
                              ...experienceData[index],
                              startDate: new Date(
                                experienceData[index].startDate
                              ),
                              endDate: experienceData[index].endDate
                                ? new Date(experienceData[index].endDate)
                                : undefined,
                            });
                          }}
                          asChild
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center"
                          >
                            <Pencil className="w-4 h-4" /> Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Edit Experience</DialogTitle>
                            <DialogDescription>
                              Edit your job details below.
                            </DialogDescription>
                          </DialogHeader>
                          <Form {...form}>
                            <form
                              onSubmit={form.handleSubmit((data) =>
                                onEditSubmit(data, +entry.id)
                              )}
                              className="space-y-4"
                            >
                              <FormField
                                control={form.control}
                                name="company"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Company</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Company name"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="jobTitle"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Job Title</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="e.g. Software Engineer"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="e.g. San Francisco, CA"
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
                                    <FormControl>
                                      <Input
                                        placeholder="e.g. Full-time, Part-time, Internship"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div className="grid grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name="startDate"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                      <FormLabel>Start Date</FormLabel>
                                      <Popover>
                                        <PopoverTrigger asChild>
                                          <FormControl>
                                            <Button
                                              variant="outline"
                                              className={`w-full justify-start text-left font-normal ${
                                                !field.value &&
                                                "text-muted-foreground"
                                              }`}
                                            >
                                              <CalendarIcon className="mr-2 h-4 w-4" />
                                              {field.value ? (
                                                format(field.value, "MMMM yyyy")
                                              ) : (
                                                <span>Pick a date</span>
                                              )}
                                            </Button>
                                          </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                          className="w-auto p-0"
                                          align="start"
                                        >
                                          <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                              date > new Date()
                                            }
                                            initialFocus
                                          />
                                        </PopoverContent>
                                      </Popover>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="endDate"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                      <FormLabel>End Date</FormLabel>
                                      <Popover>
                                        <PopoverTrigger asChild>
                                          <FormControl>
                                            <Button
                                              variant="outline"
                                              className={`w-full justify-start text-left font-normal ${
                                                !field.value &&
                                                "text-muted-foreground"
                                              }`}
                                            >
                                              <CalendarIcon className="mr-2 h-4 w-4" />
                                              {field.value ? (
                                                format(field.value, "MMMM yyyy")
                                              ) : (
                                                <span>Pick a date</span>
                                              )}
                                            </Button>
                                          </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                          className="w-auto p-0"
                                          align="start"
                                        >
                                          <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                              date > new Date()
                                            }
                                            initialFocus
                                          />
                                        </PopoverContent>
                                      </Popover>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Brief description of your role"
                                        className="resize-none"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <DialogFooter>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  onClick={() => handleDelete(entry.id)}
                                >
                                  <Trash2 /> Delete
                                </Button>
                                <Button disabled={isSubmitting} type="submit">
                                  {isSubmitting && <Loader />} Update
                                </Button>
                              </DialogFooter>
                            </form>
                          </Form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    {format(entry.startDate, "MMMM yyyy")} -{" "}
                    {entry.isCurrent
                      ? "Present"
                      : format(entry.endDate || new Date(), "MMMM yyyy")}
                  </p>
                  {entry.description && (
                    <p className="mt-2">{entry.description}</p>
                  )}
                </CardContent>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No experience entries yet. Click "Add" to start!
            </p>
          )}
        </div>
      </Card>
    </>
  );
}
