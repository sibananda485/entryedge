import { Link, Navigate, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectIsLoggedIn, setAuth } from "@/features/auth/authSlice";
import { BASE_URL } from "@/lib/constants";
import Banner from "@/assets/logo3.png";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
interface LoginRes {
  token: string;
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
    hashedPassword: string;
    role: string;
  };
}
interface LoginError {
  message: string;
}

export default function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data } = await axios.post<LoginRes>(
        BASE_URL + "/auth/login",
        values
      );
      localStorage.setItem("token", data.token);
      dispatch(setAuth(data.user));
      navigate("/");
      toast({
        title: "Login Success",
        duration: 1000,
      });
    } catch (error) {
      if (axios.isAxiosError<LoginError>(error)) {
        toast({
          variant: "destructive",
          title: error.response?.data.message,
          description: "Please recheck username and password",
          duration: 1000,
          action: <ToastAction altText="Try again">Ok</ToastAction>,
        });
      }
    }
  }
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="mt-10">
      <div className="flex items-center w-fit mx-auto gap-3">
        <img src={Banner} alt="" className="w-20 dark:invert " />
        <div>
          <p className="text-4xl mb-1 font-sans font-bold tracking-wider">
            EntryEdge
          </p>
          <p className="text-xs text-muted-foreground">
            Open the door to your career.
          </p>
        </div>
      </div>
      <Card className="mx-auto max-w-sm border-none  shadow- mt-5 ">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      <Link to="#" className="text-sm underline">
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isSubmitting} type="submit" className="w-full">
                {isSubmitting ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
          {/* <div className="mt-4">
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div> */}
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
