// export const BASE_URL = "http://localhost:3000/api";
// export const SOCKET_URL = "http://localhost:3000";
export const BASE_URL = "http://192.168.0.103:3000/api";
export const SOCKET_URL = "http://192.168.0.103:3000";
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
