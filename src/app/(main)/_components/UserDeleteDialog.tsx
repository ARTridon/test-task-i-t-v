'use client'

import { useRouter } from 'next/navigation'

import { type ReactNode, useState } from 'react'

import { toast } from 'sonner'

import { api } from '@/trpc/react'

import { DialogWrapper } from '@/components/DialogWrapper'
import { Button } from '@/components/ui/button'

type UserDeleteDialogDialogPropsType = {
  children: ReactNode
  name: string
  id: number
}

export const UserDeleteDialog = ({ children, name, id }: UserDeleteDialogDialogPropsType) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const { mutate: deleteUser } = api.user.delete.useMutation({
    onSuccess: ({ message }) => {
      if (message === 'User deleted successfully') {
        toast.success(message)
        router.refresh()
      }
    },
  })

  const handleDelete = async () => {
    deleteUser({ id })
  }

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
