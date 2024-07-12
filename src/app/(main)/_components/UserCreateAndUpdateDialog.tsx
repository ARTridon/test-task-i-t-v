'use client'

import { useCreateUserAction, useUpdateUserAction } from '@/hooks/useUserAction'

import { useEffect, useId, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Pencil } from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'

import {
  type CreateAndUpdateUserSchemaType,
  type UserSchemaType,
  createAndUpdateUserSchema,
} from '@/schemas/user-schema'

import { DialogWrapper } from '@/components/DialogWrapper'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

type UserCreateAndUpdateDialogPropsType = {
  title: string
  defaultValues?: UserSchemaType
}

export const UserCreateAndUpdateDialog = ({
  title,
  defaultValues,
}: UserCreateAndUpdateDialogPropsType) => {
  const formID = useId()
  const [open, setOpen] = useState(false)

  const form = useForm<CreateAndUpdateUserSchemaType>({
    resolver: zodResolver(createAndUpdateUserSchema),
  })

  const { mutate: createUserAction } = useCreateUserAction({
    successfullyCallback: () => {
      form.reset()
      setOpen(false)
    },
  })

  const { mutate: updateUserAction } = useUpdateUserAction({
    successfullyCallback: () => {
      form.reset()
      setOpen(false)
    },
  })

  useEffect(() => {
    if (!!defaultValues) form.reset(defaultValues)
  }, [defaultValues, form])
  return (
    <DialogWrapper
      open={open}
      setOpen={setOpen}
      title={title}
      btnTrigger={
        !!defaultValues ? (
          <Button className="cursor-pointer" variant="ghost" size={'icon'} asChild>
            <Pencil />
          </Button>
        ) : (
          <Button variant="default">Create New</Button>
        )
      }
      btnSubmit={
        <Button form={formID} type="submit">
          Save
        </Button>
      }
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (values) => {
            if (!!defaultValues) {
              updateUserAction(values)
            } else {
              createUserAction(values)
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
    </DialogWrapper>
  )
}
