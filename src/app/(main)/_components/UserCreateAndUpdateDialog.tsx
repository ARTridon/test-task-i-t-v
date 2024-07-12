"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { api } from "@/trpc/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import {
  type ReactNode,
  useEffect,
  useId,
  useState,
} from "react";
import {
  createAndUpdateUserSchema,
  type CreateAndUpdateUserSchemaType,
  type UserSchemaType,
} from "@/schemas/user-schema";
import { useRouter } from "next/navigation";

type UserCreateAndUpdateDialogPropsType = {
  children: ReactNode;
  title: string;
  defaultValues?: UserSchemaType;
};

export const UserCreateAndUpdateDialog = ({
  children,
  title,
  defaultValues,
}: UserCreateAndUpdateDialogPropsType) => {
  const router = useRouter();
  const formID = useId();
  const [open, setOpen] = useState(false);
  const { mutate: createUserAction } = api.user.create.useMutation({
    onSuccess: ({ message }) => {
      if (message === "User created successfully") {
        form.reset();
        setOpen(false);
        toast.success(message);
        router.refresh();
      }
      if (message === "User already exists") {
        toast.info(message);
      }
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const { mutate: updateUserAction } = api.user.update.useMutation({
    onSuccess: ({ message }) => {
      if (message === "User updated successfully") {
        form.reset();
        setOpen(false);
        toast.success(message);
        router.refresh();

      }
      if (message === "User update failed") {
        toast.error(message);
      }
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const form = useForm<CreateAndUpdateUserSchemaType>({
    resolver: zodResolver(createAndUpdateUserSchema),
  });

  useEffect(() => {
    if (!!defaultValues) form.reset(defaultValues);
  }, [defaultValues, form]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (values) => {
              if (!!defaultValues) {
                updateUserAction(values);
              } else {
                createUserAction(values);
              }
            })}
            className="space-y-8"
            id={formID}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button form={formID} type="submit">
            Save
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
