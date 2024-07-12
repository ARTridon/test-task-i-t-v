import React from 'react'
import { useFormContext } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

type InputWrapperProps = {
  name: string
  label?: string
  placeholder?: string
}

export const InputWrapper = ({ name, label, placeholder }: InputWrapperProps) => {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {!!label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input placeholder={placeholder ?? ''} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
