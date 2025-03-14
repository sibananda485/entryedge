import { useEffect, useState } from "react";
import { Building, UserRound } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "@/lib/constants";
import { Company } from "../company/companySlice";
import { Link, Outlet, useParams } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { selectRole, selectUser } from "../auth/authSlice";
import { Personal } from "../personal/personalSlice";
import NoMessage from "@/assets/noMessage.svg";
import { Messages } from "./Room";

interface CandidateStack extends Personal {
  lastMessage: Messages;
}

interface CompanyStack extends Company {
  lastMessage: Messages;
}

export default function Chat() {
  const role = useAppSelector(selectRole);
  const userId = useAppSelector(selectUser)?.id;

  const { id } = useParams();
  const [companyList, setCompanyList] = useState<CompanyStack[]>([]);
  const [candidateList, setCandidateList] = useState<CandidateStack[]>([]);

  const getCompanyList = async () => {
    const { data } = await axios.get(BASE_URL + "/company/all");
    setCompanyList(data);
  };

  const getCandidateList = async () => {
    const { data } = await axios.get(BASE_URL + "/candidate");
    setCandidateList(data);
  };

  useEffect(() => {
    role == "USER" ? getCompanyList() : getCandidateList();
  }, []);

  return (
    <div
      className={`h-full py-2 grow max-w-6xl w-full mx-auto sm:grid grid-cols-12 gap-5`}
    >
      <div
        className={`${
          id ? "hidden sm:block" : ""
        } col-span-4 border rounded-lg p-2`}
      >
        <div>
          <p className="font-bold text-xl">Messages</p>
        </div>
        <div className="my-4 divide-y-">
          {role == "USER"
            ? companyList.map((company, i) => (
                <Link
                  to={"/chat/" + company.userId}
                  key={i}
                  className={`flex items-start gap-2 py-4 border-s-4 ps-2 pe-1 ${
                    company.userId == id
                      ? "border-foreground bg-muted"
                      : "border-transparent"
                  } `}
                >
                  <Building className="mt-2" />
                  <div className="w-full">
                    <div className="flex justify-between items-center">
                      <p className="truncate">{company.name}</p>{" "}
                      <p className="text-muted-foreground text-xs">
                        {company.lastMessage &&
                          new Date(
                            company.lastMessage?.createdAt
                          ).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true, // Enables AM/PM format
                          })}
                      </p>
                    </div>
                    <p className="text-muted-foreground">
                      {company.lastMessage ? (
                        company.lastMessage.senderId == userId ? (
                          <span className="italic">
                            You : {company.lastMessage.message}
                          </span>
                        ) : (
                          <span className="italic truncate w-10">
                            {company.name} : {company.lastMessage.message}
                          </span>
                        )
                      ) : (
                        "Send a message"
                      )}
                    </p>
                  </div>
                </Link>
              ))
            : candidateList.map((candidate, i) => (
                <Link
                  to={"/chat/" + candidate.userId}
                  key={i}
                  className={`flex items-start gap-2 py-4 border-s-4 ps-2 pe-1 ${
                    candidate.userId == id
                      ? "border-foreground bg-muted"
                      : "border-transparent"
                  } `}
                >
                  <UserRound className="mt-2" />
                  <div className="w-full">
                    <div className="flex justify-between items-center">
                      <p className="truncate">
                        {candidate.firstName} {candidate.middleName}{" "}
                        {candidate.lastName}
                      </p>{" "}
                      <p className="text-muted-foreground text-xs">
                        {candidate.lastMessage &&
                          new Date(
                            candidate.lastMessage.createdAt
                          ).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true, // Enables AM/PM format
                          })}
                      </p>
                    </div>
                    <p className="text-muted-foreground">
                      {candidate.lastMessage ? (
                        candidate.lastMessage?.senderId == userId ? (
                          <span className="italic">
                            You : {candidate.lastMessage.message}
                          </span>
                        ) : (
                          <span className="italic">
                            {candidate.firstName} :{" "}
                            {candidate.lastMessage.message}
                          </span>
                        )
                      ) : (
                        "Send a message"
                      )}
                    </p>
                  </div>
                </Link>
              ))}
        </div>
      </div>
      {!id && (
        <div className="hidden h-full border col-span-8 rounded-lg sm:flex flex-col items-center justify-center p-2">
          <img src={NoMessage} className="w-72" alt="" />
          <p className="text-2xl font-bold">No Message</p>
        </div>
      )}

      <Outlet />
    </div>
  );
}
