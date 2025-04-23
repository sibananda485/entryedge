import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowLeft, SendHorizontal } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { io } from "socket.io-client";
import { Link, useParams } from "react-router-dom";
import { selectRole, selectUser } from "../auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import axios from "axios";
import { BASE_URL, SOCKET_URL } from "@/lib/constants";
import {
  fetchCandidateStack,
  fetchCompanyStack,
  selectChatsData,
  updateLastMessage,
} from "./chatSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Video, MoreVertical } from "lucide-react";

const FormSchema = z.object({
  message: z.string(),
});

export interface Messages {
  message: string;
  createdAt: string; // ISO date string
  senderId: string;
  receiverId: string;
}

export default function Room() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUser)?.id;
  const role = useAppSelector(selectRole);
  const stack = useAppSelector(selectChatsData);
  let roomId: string;
  if (role == "USER" && id) {
    roomId = userId + id;
  } else if (id) {
    roomId = id + userId;
  }
  const socket = useMemo(() => io(SOCKET_URL), [id]);
  const [messages, setMessages] = useState<Messages[]>([]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await axios.post(BASE_URL + "/messages", {
      receiverId: id ? +id : "",
      senderId: userId ? +userId : "",
      message: data.message,
    });
    if (res.status == 201) {
      socket.emit("sendMessage", {
        ...res.data,
        roomId,
        message: data.message,
        senderId: userId,
        receiverId: id,
      });
      dispatch(updateLastMessage({ userId: id, lastMessage: res.data }));
      setMessages((prev) => [...prev, res.data]);
      if (messages.length == 0) {
        role == "USER"
          ? dispatch(fetchCompanyStack())
          : dispatch(fetchCandidateStack());
      }
    }
    form.reset();
  }

  const fetchMessageAndConnectSocket = async () => {
    const messages = await axios.get(BASE_URL + "/messages/" + id);
    console.log(socket.id);
    socket.emit("connection");
    socket.emit("joinRoom", roomId);
    socket.on("receiveMessage", (data) => {
      console.log("Received message:", data);
      dispatch(updateLastMessage({ userId: id, lastMessage: data }));
      setMessages((prev) => [...prev, data]);
    });

    setMessages(messages.data);
  };

  useEffect(() => {
    fetchMessageAndConnectSocket();

    return () => {
      socket.disconnect();
    };
  }, [id]);

  const bottomDivRef = useRef<HTMLDivElement | null>(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    if (bottomDivRef.current) {
      bottomDivRef.current.scrollTop = bottomDivRef.current.scrollHeight;
    }
  };

  // Scroll to bottom after the component mounts or updates
  useEffect(() => {
    scrollToBottom();
  }, [id, messages]);

  // useEffect(() => {
  //   if (messages.length == 0 && id) {
  //     role == "USER"
  //       ? dispatch(fetchCompanyStack())
  //       : dispatch(fetchCandidateStack());
  //   }
  // }, [messages, id]);
  const selectedStack = stack?.find((a) => a.userId == id);

  return (
    <div
      className={`h-remaining-height border col-span-8 rounded-lg flex flex-col p-2 ${
        id ? "block" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <Link to={"/chat"}>
          <Button variant="ghost" size="icon" className="sm:hidden">
            <ArrowLeft />
          </Button>
        </Link>
        {/* <p className="font-semibold ">
          {" "}
          {selectedStack?.firstName} {selectedStack?.lastName}
        </p> */}
        {/* <div className="border rounded-lg shadow-sm mt-10"> */}
        <ChatHeader
          name={`${selectedStack?.firstName || ""} ${
            selectedStack?.lastName || ""
          } ${selectedStack?.name || ""}`}
          status="online"
          avatarSrc="/placeholder.svg?height=40&width=40"
          onCallClick={() => alert("Voice call")}
          onVideoClick={() => alert("Video call")}
          onMoreClick={() => alert("More options")}
        />
        {/* <div className="p-4">
            <p className="text-center text-muted-foreground">
              Chat messages would appear here
            </p>
          </div>
        </div> */}
      </div>
      <div
        ref={bottomDivRef}
        className="h-full overflow-auto grow my-2 space-y-2"
      >
        <div className="flex min-h-full flex-col justify-end">
          {messages.map((a, i) => (
            <div
              key={i}
              className={`w-fit ${a.senderId == userId && "ms-auto"}`}
            >
              <p
                className={`relative bg-foreground text-background w-fit py-1 px-5  ${
                  a.senderId == userId ? "rounded-s-md" : "rounded-e-md"
                }`}
              >
                {a.message}
              </p>
              <p
                className={`text-xs text-muted-foreground ${
                  a.senderId == userId && "text-end"
                }`}
              >
                {new Date(a.createdAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true, // Enables AM/PM format
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Write your message..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              <SendHorizontal size={128} />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

interface ChatHeaderProps {
  name: string;
  status?: "online" | "offline" | "away" | "busy";
  avatarSrc?: string;
  lastSeen?: string;
  onCallClick?: () => void;
  onVideoClick?: () => void;
  onMoreClick?: () => void;
}

export function ChatHeader({
  name,

  avatarSrc,

  onMoreClick,
}: ChatHeaderProps) {
  return (
    <div className="w-full flex items-center  justify-between pb-2 border-b">
      <div className="flex items-center space-x-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatarSrc || "/placeholder.svg"} alt={name} />
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          {/* <div className="flex items-center text-sm text-muted-foreground">
            {status === "online" && (
              <span className="flex items-center">
                <span className="mr-1.5 h-2 w-2 rounded-full bg-green-500"></span>
                Online
              </span>
            )}
            {status === "away" && (
              <span className="flex items-center">
                <span className="mr-1.5 h-2 w-2 rounded-full bg-yellow-500"></span>
                Away
              </span>
            )}
            {status === "busy" && (
              <span className="flex items-center">
                <span className="mr-1.5 h-2 w-2 rounded-full bg-red-500"></span>
                Do not disturb
              </span>
            )}
            {status === "offline" && lastSeen && (
              <span>Last seen {lastSeen}</span>
            )}
            {status === "offline" && !lastSeen && <span>Offline</span>}
          </div> */}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {/* <Button
          variant="ghost"
          size="icon"
          onClick={onCallClick}
          aria-label="Voice call"
        >
          <Phone className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onVideoClick}
          aria-label="Video call"
        >
          <Video className="h-5 w-5" />
        </Button> */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMoreClick}
          aria-label="More options"
        >
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
