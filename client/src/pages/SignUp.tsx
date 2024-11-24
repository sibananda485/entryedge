import { Link, Navigate, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { ToastAction } from "@/components/ui/toast";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAppSelector } from "@/app/hooks";
import { selectIsLoggedIn } from "@/features/auth/authSlice";
import { BASE_URL } from "@/lib/constants";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import loginBanner from "@/assets/banner3.png";

interface SignUpError {
  message: string;
}

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  firstName: string;
  middleName: string;
  lastName: string;
  name: string;
};

export default function SignUp() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const form = useForm<Inputs>({
    resolver: async (values, context, options) => {
      const Schema = z
        .object({
          email: z.string().email({ message: "Invalid email address" }),
          password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" }),
          confirmPassword: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" }),
          role: z.string().min(1, "Select a option"),
          firstName:
            values.role == "ADMIN"
              ? z.string()
              : z.string().min(1, "First name is required"),
          middleName: z.string(),
          lastName:
            values.role == "ADMIN"
              ? z.string()
              : z.string().min(1, "Last name is required"),
          name:
            values.role == "USER"
              ? z.string()
              : z.string().min(1, "Company name is required"),
        })
        .refine((data) => data.password === data.confirmPassword, {
          path: ["confirmPassword"],
          message: "Passwords must match",
        });
      return zodResolver(Schema)(values, context, options);
    },
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      middleName: "",
      lastName: "",
      name: "",
      role: "",
      confirmPassword: "",
    },
  });

  const {
    formState: { isSubmitting },
    watch,
  } = form;

  async function onSubmit(values: Inputs) {
    // console.log(values);
    // return;
    try {
      const { status } = await axios.post(BASE_URL + "/auth/signup", values);
      if (status == 201) {
        toast({
          title: "Sign Up success",
          description: "Now Login to continue",
          duration: 1000,
        });
        navigate("/login");
      } else {
        toast({
          variant: "destructive",
          title: "ERROR ON SIGNUP",
          description: "Opps !!, Something went wrong 😢",
          duration: 1000,
          action: <ToastAction altText="Try again">Ok</ToastAction>,
        });
      }
    } catch (error) {
      if (axios.isAxiosError<SignUpError>(error)) {
        if (error.response?.data.message == "User Already exists") {
          form.setError("email", {
            message: "User Exists",
            type: "validate",
          });
          form.setFocus("email");
        } else {
          toast({
            variant: "destructive",
            title: error.response?.data.message,
            description: "Opps !!, Something went wrong 😢",
            duration: 1000,
            action: <ToastAction altText="Try again">Ok</ToastAction>,
          });
        }
      }
    }
  }
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="w-full lg:grid lg:grid-cols-2">
        <div className="hidden h-screen lg:flex justify-center items-center">
          <img src={loginBanner} alt="Image" className="dark:invert" />
        </div>
        <div className="h-screen flex justify-center items-center overflow-auto">
          <div className="max-w-xl w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4"
              >
                <CardTitle className="text-2xl">Sign Up</CardTitle>
                <CardDescription>Enter your credentials</CardDescription>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                      </div>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Confirm Password</FormLabel>
                      </div>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="flex items-end gap-4">
                      <FormLabel>I am a </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="USER" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Candidate
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="ADMIN" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Recruiter
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {watch("role") == "ADMIN" && (
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {watch("role") == "USER" && (
                  <div className="grid grid-cols-3 gap-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="middleName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Middle Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                <Button disabled={isSubmitting} className="mt-5" type="submit">
                  {isSubmitting && <Loader className="animate-spin w-4 mr-1" />}
                  SignUp
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              Already have an account?
              <Link to="/login" className="underline">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
