import { Row } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, ScanSearch, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { statuses } from "./chips";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { BASE_URL } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  selectJobLoadingById,
  fetchJobData,
  fetchJobDataById,
  selectJobDataById,
  Job,
  selectJobErrorById,
} from "@/features/jobs/jobSlice";
import { AppliedJob } from "@/features/candidate/appliedJobs/appliedJobSlice";
import { fetchApplicant } from "./applicantSlice";
import { Link, useParams } from "react-router-dom";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

const formSchema = z.object({
  remarks: z.string().min(2, {
    message: "Remarks must be at least 2 characters.",
  }),
});

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const singleJobApplication = row.original as AppliedJob;
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      remarks: singleJobApplication.remarks,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.patch(
        BASE_URL + "/jobapplication/" + singleJobApplication.id,
        values
      );
      if (res.status === 200) {
        form.reset();
        dispatch(fetchApplicant(id || ""));
        toast({
          title: "JobApplication updated successfully",
        });
        setOpen(false);
      } else {
        toast({
          variant: "destructive",
          title: "Failed to update job",
          description: "Please try again",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to update job",
        description: "Please try again",
      });
    }
  }

  async function handleChangeStatus(status: string) {
    try {
      const res = await axios.patch(
        BASE_URL + "/jobapplication/" + singleJobApplication.id,
        {
          status,
        }
      );
      if (res.status === 200) {
        form.reset();
        dispatch(fetchApplicant(id || ""));
        toast({
          title: "Status Changed",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to update status",
          description: "Please try again",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to update status",
        description: "Please try again",
      });
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DropdownMenu
          modal={false}
          open={openDropdown}
          onOpenChange={setOpenDropdown}
        >
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <MoreHorizontal />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DialogTrigger asChild>
              <DropdownMenuItem className="flex justify-between items-center">
                Edit Remark
                <Pencil />
              </DropdownMenuItem>
            </DialogTrigger>

            {/* <DropdownMenuSeparator /> */}
            <Link to={`/profile/${singleJobApplication.personalData.User.id}`}>
              <DropdownMenuItem className="flex justify-between items-center">
                View Profile
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  onValueChange={(value) => {
                    handleChangeStatus(value);
                  }}
                  value={singleJobApplication.status}
                >
                  {statuses.map((status) => (
                    <DropdownMenuRadioItem
                      key={status.label}
                      value={status.value}
                    >
                      {status.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent className="w-full max-w-xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Remark</DialogTitle>
            <DialogDescription>
              This is remarks will be visible to candidate. Click save when
              you're done.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Remarks</FormLabel> */}
                    <FormControl>
                      <Textarea
                        placeholder="Enter your remark"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-4">
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
