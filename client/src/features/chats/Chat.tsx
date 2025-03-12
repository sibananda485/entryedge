import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { Building, SendHorizontal } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  bio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
});

// const messages = [
//   {
//     text: "Hello",
//     mine: true,
//     time: "08:17 PM",
//   },
//   {
//     text: "How are you ?",
//     mine: false,
//     time: "08:26 PM",
//   },
// ];

export default function Chat() {
  const [socket, setSocket] = useState();
  const [messages, setMessages] = useState([
    {
      text: "Hello",
      mine: true,
      time: "08:17 PM",
    },
    {
      text: "How are you ?",
      mine: false,
      time: "08:26 PM",
    },
  ]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }
  useEffect(() => {
    const s = io("http://localhost:3000");
    setSocket(s);
    s.emit("connection", () => {
      console.log("CONNECTED");
    });
    s.on("send", (res) => {
      setMessages((prev) => [
        ...prev,
        {
          mine: false,
          text: res,
          time: new Date().toLocaleTimeString(),
        },
      ]);
    });
  }, []);
  return (
    <div className="h-full py-2 grow max-w-6xl w-full mx-auto grid grid-cols-12 gap-5">
      <div className="col-span-4 border rounded-lg p-2">
        <div>
          <p className="font-bold text-xl">Messages</p>
        </div>
        <div className="my-4 divide-y-2">
          <div className="flex items-start gap-2 py-4 border-s-4 border-foreground ps-2">
            <Building className="mt-2" />
            <div className="w-full">
              <div className="flex justify-between items-center">
                <p className="truncate">Mind Space Technology</p>{" "}
                <p className="text-muted-foreground text-xs">22 Dec 2024</p>
              </div>
              <p className="text-muted-foreground">Hii,Any updates ?</p>
            </div>
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-start gap-2 py-4 border-s-4 border-transparent ps-2"
            >
              <Building className="mt-2" />
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <p className="truncate">Mind Space Technology</p>{" "}
                  <p className="text-muted-foreground text-xs">22 Dec 2024</p>
                </div>
                <p className="text-muted-foreground">Hii,Any updates ?</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-full border col-span-8 rounded-lg flex flex-col p-2">
        <div>Mind Space Technology</div>
        <div className="grow my-2 space-y-2">
          <div className="max-h-full overflow-y-auto flex flex-col justify-end ">
            {messages.map((a, i) => (
              <div key={i} className={`w-fit ${a.mine && "ms-auto"}`}>
                <p
                  className={`relative bg-foreground text-background w-fit py-1 px-5  ${
                    a.mine ? "rounded-s-md" : "rounded-e-md"
                  }`}
                >
                  {a.text}
                </p>
                <p
                  className={`text-xs text-muted-foreground ${
                    a.mine && "text-end"
                  }`}
                >
                  {a.time}
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
                name="bio"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea
                        placeholder="Write your message..."
                        className="resize-none"
                        {...field}
                        rows={2}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="min-h-full h-20 w-20">
                <SendHorizontal size={128} />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
