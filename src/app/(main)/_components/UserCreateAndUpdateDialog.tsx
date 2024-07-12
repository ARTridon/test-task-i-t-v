'use client'

import { useEffect, useId, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Pencil } from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'

import { useCreateUserAction, useUpdateUserAction } from '@/hooks/useUserAction'

import {
  type CreateAndUpdateUserSchemaType,
  type UserSchemaType,
  createAndUpdateUserSchema,
} from '@/schemas/user-schema'

import { DialogWrapper } from '@/components/DialogWrapper'
import { FormWrapper } from '@/components/FormWrapper'
import { InputWrapper } from '@/components/InputWrapper'
import { Button } from '@/components/ui/button'

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
      <FormWrapper<CreateAndUpdateUserSchemaType>
        handleSubmit={async (values) => {
          if (!!defaultValues) {
            updateUserAction(values)
          } else {
            createUserAction(values)
          }
        }}
        formID={formID}
        schema={createAndUpdateUserSchema}
        defaultValues={defaultValues}
      >
        <InputWrapper name="name" label="Name" placeholder="Enter your name" />
        <InputWrapper name="email" label="Email" placeholder="Enter your email" />
      </FormWrapper>
    </DialogWrapper>
  )
}
