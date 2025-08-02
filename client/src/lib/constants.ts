export const BASE_URL =
  "https://entryedge-i4vo12m41-sibananda-sahus-projects.vercel.app/api";
export const SOCKET_URL =
  "https://entryedge-i4vo12m41-sibananda-sahus-projects.vercel.app";
// export const BASE_URL = "http://localhost:3000/api";
// export const SOCKET_URL = "http://localhost:3000";
export const S3_BUCKET_URL = "https://entryedge.s3.ap-south-1.amazonaws.com";

// export const BASE_URL = "http://192.168.0.103:3000/api";
// export const SOCKET_URL = "http://192.168.0.103:3000";
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
    label: "My jobs",
    path: "/my-jobs",
    access: ["ADMIN"],
  },
];
