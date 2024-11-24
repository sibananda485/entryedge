import {
  ChevronRight,
  Download,
  Ellipsis,
  Loader,
  MapPin,
  Phone,
  Replace,
  Trash2,
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
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import ApiError from "@/components/custom/ApiError";
import {
  selectPersonalLoading,
  selectPersonalData,
  selectPersonalError,
  fetchPersonalData,
} from "../personal/personalSlice";
import { selectUser } from "../auth/authSlice";
export default function Profile() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectPersonalLoading);
  const user = useAppSelector(selectUser);
  const personalData = useAppSelector(selectPersonalData);
  const error = useAppSelector(selectPersonalError);
  useEffect(() => {
    !personalData && dispatch(fetchPersonalData());
  }, [personalData]);

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
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold mb-2">Resume</p>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} size={"icon"}>
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>
                  <Replace className="text-green-500" />
                  <span className="text-green-500 font-semibold">Replace</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash2 className="text-destructive" />
                  <span className="text-destructive font-semibold">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex justify-between items-center ">
            <div className="flex items-center gap-2">
              <img src={Resume} alt="resume" className="w-14" />
              <div>
                <p>myresume.pdf</p>
                <p className="text-muted-foreground">updated at 8 nov, 2024</p>
              </div>
            </div>
            <Button variant={"secondary"}>
              <Download />
              Download
            </Button>
          </div>
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
