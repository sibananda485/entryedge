import {
  ChevronRight,
  Ellipsis,
  FileTextIcon,
  Loader,
  MapPin,
  Phone,
  Replace,
  Trash2,
  Upload,
} from "lucide-react";
import Resume from "@/assets/resume.svg";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import ApiError from "@/components/custom/ApiError";
import {
  selectPersonalLoading,
  selectPersonalData,
  selectPersonalError,
  fetchPersonalData,
} from "../personal/personalSlice";
import { selectUser } from "../auth/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { BASE_URL, S3_BUCKET_URL } from "@/lib/constants";
import { toast } from "@/hooks/use-toast";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
// const MAX_FILE_SIZE = 10; // 5MB

// 📜 Zod Schema
const uploadSchema = z.object({
  pdfFile: z
    .custom<File>((file) => file instanceof File, {
      message: "File is required",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDF files are allowed",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size must be less than 5MB",
    }),
});

// 📜 TypeScript type
type UploadFormType = z.infer<typeof uploadSchema>;

export default function Profile() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectPersonalLoading);
  const user = useAppSelector(selectUser);
  const personalData = useAppSelector(selectPersonalData);
  const error = useAppSelector(selectPersonalError);
  useEffect(() => {
    !personalData && dispatch(fetchPersonalData());
  }, [personalData]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<UploadFormType>({
    resolver: zodResolver(uploadSchema),
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = async (data: UploadFormType) => {
    try {
      // Getting presigned URL from the server
      const res = await axios.post(
        BASE_URL + `/resume?name=${data.pdfFile.name}`
      );
      const response = await fetch(res.data, {
        method: "PUT",
        headers: {
          "Content-Type": "application/pdf",
        },
        body: data.pdfFile,
      });
      if (response.ok) {
        dispatch(fetchPersonalData());
        toast({
          title: "Success",
          description: "File uploaded successfully",
          variant: "default",
        });
        fileInputRef.current!.value = ""; // Clear the file input value
        // setValue("pdfFile", null); // Clear the file value in the form
        reset(); // Reset the form
      } else {
        toast({
          title: "Error",
          description: "Error uploading the file",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error uploading the file",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setValue("pdfFile", e.target.files[0], { shouldValidate: true });
    }
  };

  const selectedFile = watch("pdfFile");

  if (loading) {
    return <Loader className="animate-spin mx-auto mt-20" />;
  }
  if (error) {
    return (
      <ApiError
        message="Error whlile getting the profile data"
        title="ERROR PROFILE DATA !"
        onRetry={() => dispatch(fetchPersonalData())}
      />
    );
  }
  return (
    <>
      <div className="max-w-3xl container mx-auto divide-y-2">
        <div className="space-y-8 py-5">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold tracking-wider">
              {personalData?.firstName} {personalData?.lastName}
            </h1>
            <div className="bg-foreground text-background text-4xl font-bold flex justify-center items-center rounded-full p-5">
              {personalData?.firstName[0]}
              {personalData?.lastName[0]}
            </div>
          </div>
          <Link to="/personal" className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Mail className="text-muted-foreground w-6 h-6" />
                <p className="font-semibold">{user?.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-muted-foreground w-6 h-6" />
                <p className="font-semibold">
                  {personalData && personalData.phone
                    ? personalData.phone
                    : "N/A"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-muted-foreground w-6 h-6" />
                {personalData && personalData.country ? (
                  <p className="font-semibold">{`${personalData?.city}, ${personalData?.state}, ${personalData?.country}`}</p>
                ) : (
                  <p>N/A</p>
                )}
              </div>
            </div>
            <div>
              <ChevronRight />
            </div>
          </Link>
        </div>
        <div className="py-5">
          <>
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold mb-2">Resume</p>

              {personalData?.resume && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} size={"icon"}>
                      <Ellipsis />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {/* <DropdownMenuItem>
                      <Replace className="text-green-500" />
                      <span className="text-green-500 font-semibold">
                        Replace
                      </span>
                    </DropdownMenuItem> */}
                    <DropdownMenuItem
                      onClick={async () => {
                        try {
                          await axios.delete(BASE_URL + `/resume`);
                          reset();
                          dispatch(fetchPersonalData());
                          toast({
                            title: "Success",
                            description: "Resume deleted successfully",
                            variant: "default",
                          });
                          fileInputRef.current!.value = ""; // Clear the file input value
                        } catch (error) {
                          toast({
                            title: "Error",
                            description: "Error deleting the resume",
                            variant: "destructive",
                          });
                        }
                      }}
                    >
                      <Trash2 className="text-destructive" />
                      <span className="text-destructive font-semibold">
                        Delete
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="file"
                accept="application/pdf"
                {...register("pdfFile")}
                ref={(e) => {
                  register("pdfFile").ref(e);
                  fileInputRef.current = e;
                }}
                onChange={handleFileChange}
                className="hidden"
              />
              {personalData?.resume ? (
                <div className="flex justify-between items-center ">
                  <div className="flex items-center gap-2">
                    <img src={Resume} alt="resume" className="w-14" />
                    <div>
                      <a
                        target="_blank"
                        className="text-blue-500"
                        href={`${S3_BUCKET_URL}${personalData.resume}`}
                        download
                      >
                        {personalData.resumeFileName}
                      </a>
                      <p className="text-muted-foreground">
                        updated at{" "}
                        {new Date(
                          personalData.resumeUpdatedAt as string
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button
                      type="button"
                      size={"sm"}
                      onClick={() => fileInputRef.current?.click()}
                      variant={"secondary"}
                    >
                      <Replace />
                      {selectedFile?.name ? `${selectedFile.name}` : "Replace"}
                    </Button>
                    {selectedFile?.size && (
                      <Button size={"sm"}>
                        <Upload />
                      </Button>
                    )}
                    {errors.pdfFile && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.pdfFile.message}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-10 border border-dashed rounded-md flex justify-center">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      variant={"secondary"}
                    >
                      <FileTextIcon />
                      {selectedFile?.name
                        ? `${selectedFile.name}`
                        : "Upload Resume"}
                    </Button>
                    <Button>
                      <Upload />
                    </Button>
                  </div>

                  {errors.pdfFile && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.pdfFile.message}
                    </p>
                  )}
                </div>
              )}
            </form>
          </>
        </div>

        <Link
          to="/education"
          className="flex justify-between items-center py-5"
        >
          <div>
            <p className="text-lg font-semibold">Educational Qualifications</p>
            <p className="text-muted-foreground">
              Highlight your skills and experinece
            </p>
          </div>
          <div>
            <ChevronRight />
          </div>
        </Link>
        <Link
          to="/experience"
          className="flex justify-between items-center py-5"
        >
          <div>
            <p className="text-lg font-semibold">Professional Experience</p>
            <p className="text-muted-foreground">
              Your past experinece proves your skills and knowledge
            </p>
          </div>
          <div>
            <ChevronRight />
          </div>
        </Link>
      </div>
    </>
  );
}
