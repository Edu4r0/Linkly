import { useState } from "react";
import Delete from "./icons/Delete";
import Pencil from "./icons/Pencil";
import moment from "moment";
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

function Action({ item, data, setData }) {
  const [value, setValue] = useState(item.originalLink);
  const { toast } = useToast();
  function removeItem(item) {
    const newData = data.filter((data) => data != item);
    setData(newData);
    toast({
      title: `Delete: ${item.short_url}`,
      description: moment().format("dddd, MMMM D, YYYY LT"),
      action: <ToastAction>Undo</ToastAction>,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.newurl.value);
  }
  return (
    <section className="flex gap-[10px]">
      <Dialog>
        <DialogTrigger className="h-[42px] w-[42px] flex justify-center items-center rounded-full border hover:bg-[#353C4A] border-[#353C4A] shadow-md">
          <Pencil />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{`Edit: /${item.short_url}`}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-pretty">
            Make changes to the url here. Click save when you're done.
          </DialogDescription>
          <form
            id="edit_url"
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <Label htmlFor="newurl">Enter the new URL:</Label>
            <Input
              name="newurl"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Label htmlFor="newstatus">Select the new Status</Label>

            <Select name="newstatus">
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder={item.status ? "Active" : "Inactive"}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Alert
              variant="default"
              className="bg-rose-500/10 border-rose-300/10"
            >
              <AlertDescription className="flex items-center text-rose-300 gap-2">
                <ExclamationTriangleIcon />
                This action is irreversible.
              </AlertDescription>
            </Alert>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog>
        <AlertDialogTrigger className="h-[42px] w-[42px] flex justify-center items-center rounded-full border hover:bg-[#353C4A] border-[#353C4A] shadow-md">
          <Delete />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action can not be undone. This will permanently remove your
              shortened URL from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => removeItem(item)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster />
    </section>
  );
}

export default Action;
