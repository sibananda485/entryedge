export const BASE_URL = "http://localhost:3000/api";
interface Nav {
  label: string;
  path: string;
  access: ("USER" | "ADMIN")[];
}
export const navData: Nav[] = [
  {
    label: "Home",
    path: "/",
    access: ["USER", "ADMIN"],
  },
  {
    label: "My Application",
    path: "/my-application",
    access: ["USER"],
  },
  {
    label: "Saved",
    path: "/saved",
    access: ["USER"],
  },
  {
    label: "Post a Job",
    path: "/post",
    access: ["ADMIN"],
  },
  {
    label: "Applicant",
    path: "/applicant",
    access: ["ADMIN"],
  },
];
