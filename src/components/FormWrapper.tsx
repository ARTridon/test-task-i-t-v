'use client'

import { type ClassValue } from 'clsx'

import { type ReactNode, useEffect } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'

import { type ZodType } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '@/components/ui/form'

import { cn } from '@/lib/utils'

type FormWrapperPropsType<TForm> = {
  schema: ZodType
  formID: string
  className?: ClassValue
  handleSubmit: (values: TForm) => void
  children: ReactNode
  defaultValues?: TForm
}

export const FormWrapper = <TForm extends FieldValues>({
  schema,
  formID,
  className,
  handleSubmit,
  children,
  defaultValues,
}: FormWrapperPropsType<TForm>) => {
  const form = useForm<TForm>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (!!defaultValues) form.reset(defaultValues)
  }, [defaultValues, form])
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn('space-y-8', !!className && className)}
        id={formID}
      >
        {children}
      </form>
    </Form>
  )
}
