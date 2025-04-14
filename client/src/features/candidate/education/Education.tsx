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
  selectEducationLoading,
  selectEducationData,
  selectEducationError,
  fetchEducationData,
} from "./educationSlice";
import axios from "axios";
import { BASE_URL } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

const getSchema = (flag: boolean) => {
  const EducationSchema = z.object({
    institution: z.string().min(1, { message: "Institution is required." }),
    degree: z.string().min(1, { message: "Degree is required." }),
    fieldOfStudy: z.string().min(1, { message: "Field of study is required." }),
    startDate: z.date({ required_error: "Start date is required." }),
    endDate: flag
      ? z.date({ required_error: "End date is required." }).optional()
      : z.date({ required_error: "End date is required." }),
    description: z.string().optional(),
    isPursuing: z.boolean(),
  });
  return EducationSchema;
};

type EducationEntry = {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  isPursuing: boolean;
  endDate?: Date;
  description?: string;
};

export default function Education() {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const educationData = useAppSelector(selectEducationData);
  const loading = useAppSelector(selectEducationLoading);
  const error = useAppSelector(selectEducationError);

  const form = useForm<EducationEntry>({
    resolver: async (values, context, options) => {
      const Schema = getSchema(values.isPursuing);
      return zodResolver(Schema)(values, context, options);
    },
    defaultValues: {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      description: "",
      isPursuing: undefined,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: EducationEntry) => {
    try {
      const res = await axios.post(BASE_URL + "/education", data);
      if (res.status == 201) {
        await dispatch(fetchEducationData()).unwrap();
        form.reset();
        toast({
          title: "Ecucation added successfully",
        });
      } else {
        toast({
          title: "Failed to add education",
          description: "Please try again",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to add education",
        description: "Please try again",
      });
    }
  };
  const onEditSubmit = async (data: EducationEntry, index: number) => {
    try {
      const res = await axios.patch(BASE_URL + "/education/" + index, data);
      if (res.status == 201) {
        await dispatch(fetchEducationData()).unwrap();
        form.reset();
        toast({
          title: "Ecucation updated successfully",
        });
      } else {
        toast({
          title: "Failed to update education",
          description: "Please try again",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to update education",
        description: "Please try again",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(BASE_URL + "/education/" + id);
      if (res.status == 200) {
        await dispatch(fetchEducationData()).unwrap();
        form.reset();
        toast({
          title: "Ecucation deleted successfully",
        });
      } else {
        toast({
          title: "Failed to delete education",
          description: "Please try again",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete education",
        description: "Please try again",
      });
    }
  };

  useEffect(() => {
    !educationData && dispatch(fetchEducationData());
  }, [educationData]);

  if (loading) {
    return <Loader className="animate-spin mx-auto mt-20" />;
  }

  if (error) {
    return (
      <ApiError
        message="Error whlile getting the profile data"
        title="ERROR PROFILE DATA !"
        onRetry={() => dispatch(fetchEducationData())}
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
            <CardTitle className="text-2xl font-bold">Education</CardTitle>
            <Dialog>
              <DialogTrigger
                onClick={() =>
                  form.reset({
                    degree: "",
                    description: "",
                    fieldOfStudy: "",
                    endDate: undefined,
                    institution: "",
                    isPursuing: false,
                    startDate: undefined,
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
                  <DialogTitle>Add Education</DialogTitle>
                  <DialogDescription>
                    Add your education details below.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="institution"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution</FormLabel>
                          <FormControl>
                            <Input placeholder="University name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="degree"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Degree</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Bachelor of Science"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="fieldOfStudy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Field of Study</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Computer Science"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
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

                    <FormField
                      control={form.control}
                      name="isPursuing"
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
                            Currently Pursuing
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Brief description of your studies"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
          <CardDescription>
            Manage your Educational information.
          </CardDescription>
        </CardHeader>
        <div className="divide-y-2">
          {educationData && educationData.length > 0 ? (
            educationData.map((entry, index) => (
              <div key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-semibold">
                        {entry.degree} in {entry.fieldOfStudy}
                      </CardTitle>
                      <CardDescription className="text-sm ">
                        {entry.institution}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger
                          onClick={() => {
                            form.reset({
                              ...educationData[index],
                              startDate: new Date(
                                educationData[index].startDate
                              ),
                              endDate: educationData[index].endDate
                                ? new Date(educationData[index].endDate)
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
                            <DialogTitle>Edit Education</DialogTitle>
                            <DialogDescription>
                              Edit your education details below.
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
                                name="institution"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Institution</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="University name"
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
                                  name="degree"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Degree</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="e.g. Bachelor of Science"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="fieldOfStudy"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Field of Study</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="e.g. Computer Science"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
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
                                name="isPursuing"
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
                                      Currently Pursuing
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Brief description of your studies"
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
                    {entry.endDate
                      ? format(entry.endDate, "MMMM yyyy")
                      : "Present"}
                  </p>
                  {entry.description && (
                    <p className="mt-2">{entry.description}</p>
                  )}
                </CardContent>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No education entries yet. Click "Add" to start!
            </p>
          )}
        </div>
      </Card>
    </>
  );
}
