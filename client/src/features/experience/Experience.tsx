import {
  ChevronRight,
  Download,
  Ellipsis,
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
export default function Experience() {
  return (
    <>
      <div className="max-w-3xl container mx-auto divide-y-2">
        <div className="space-y-8 py-5">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold tracking-wider">
              Sibananda Sahu
            </h1>
            <div className="bg-foreground text-background text-4xl font-bold flex justify-center items-center rounded-full p-5">
              SS
            </div>
          </div>
          <Link to="/personal" className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Mail className="text-muted-foreground w-6 h-6" />
                <p className="font-semibold">sahusiba485@gmail.com</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-muted-foreground w-6 h-6" />
                <p className="font-semibold">8433980976</p>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-muted-foreground w-6 h-6" />
                <p className="font-semibold">Mumbai, Maharastra, In</p>
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
