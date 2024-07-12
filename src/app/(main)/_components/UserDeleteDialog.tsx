'use client'

import { type ReactNode, useState } from 'react'

import { useDeleteUserAction } from '@/hooks/useUserAction'

import { DialogWrapper } from '@/components/DialogWrapper'
import { Button } from '@/components/ui/button'

type UserDeleteDialogDialogPropsType = {
  children: ReactNode
  name: string
  id: number
}

export const UserDeleteDialog = ({ children, name, id }: UserDeleteDialogDialogPropsType) => {
  const [open, setOpen] = useState(false)

  const { mutate: deleteUser } = useDeleteUserAction()

  const handleDelete = async () => deleteUser({ id })

  return (
    <DialogWrapper
      open={open}
      setOpen={setOpen}
      title={'Delete'}
      description={`Delete user ${name}`}
      btnSubmit={<Button onClick={handleDelete}>Delete</Button>}
      btnTrigger={children}
    />
  )
}
