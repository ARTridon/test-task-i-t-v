"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

import { type ReactNode, useState } from "react";

import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";

type UserDeleteDialogDialogPropsType = {
  children: ReactNode;
  name: string;
  id: number;
};

export const UserDeleteDialog = ({
  children,
  name,
  id,
}: UserDeleteDialogDialogPropsType) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { mutate: deleteUser } = api.user.delete.useMutation({
    onSuccess: ({ message }) => {
      if (message === "User deleted successfully") {
        toast.success(message);
        router.refresh();
      }
    },
  });

  const handleDelete = async () => {
    deleteUser({ id });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
          <DialogDescription>Delete user {name}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleDelete}>Delete</Button>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
