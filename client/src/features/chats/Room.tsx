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
import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { io } from "socket.io-client";
import { Link, useParams } from "react-router-dom";
import { selectRole, selectUser } from "../auth/authSlice";
import { useAppSelector } from "@/app/hooks";
import axios from "axios";
import { BASE_URL, SOCKET_URL } from "@/lib/constants";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const userId = useAppSelector(selectUser)?.id;
  const role = useAppSelector(selectRole);
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
  function onSubmit(data: z.infer<typeof FormSchema>) {
    socket.emit("sendMessage", {
      roomId,
      message: data.message,
      senderId: userId,
      receiverId: id,
    });
    setMessages((prev) => [
      ...prev,
      {
        receiverId: id || "",
        senderId: userId || "",
        message: data.message,
        createdAt: new Date().toString(),
      },
    ]);

    form.reset();
  }

  const fetchMessageAndConnectSocket = async () => {
    const messages = await axios.get(BASE_URL + "/messages/" + id);
    console.log(socket.id);
    socket.emit("connection");
    socket.emit("joinRoom", roomId);
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [
        ...prev,
        {
          receiverId: userId || "",
          senderId: id || "",
          message: message,
          createdAt: new Date().toString(),
        },
      ]);
    });
    setMessages(messages.data);
  };

  useEffect(() => {
    fetchMessageAndConnectSocket();
    return () => {
      socket.disconnect();
    };
  }, [id]);

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
        <p className="font-semibold "> Mind Space Technology</p>
      </div>
      <ScrollArea className="grow my-2 space-y-2">
        <div className="flex flex-col justify-end ">
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
      </ScrollArea>
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
