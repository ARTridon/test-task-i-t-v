import { useRouter } from 'next/navigation'

import { toast } from 'sonner'

import { api } from '@/trpc/react'

export const useCreateUserAction = ({ successfullyCallback }: ParamsType) => {
  const router = useRouter()
  return api.user.create.useMutation({
    onSuccess: ({ message }) => {
      if (message === 'User created successfully') {
        toast.success(message)
        router.refresh()
        successfullyCallback && successfullyCallback()
      }
      if (message === 'User already exists') {
        toast.info(message)
      }
      if (message === 'User creation failed') {
        toast.error(message)
      }
    },
    onError: ({ message }) => {
      toast.error(message)
    },
  })
}

export const useUpdateUserAction = ({ successfullyCallback }: ParamsType) => {
  const router = useRouter()
  return api.user.update.useMutation({
    onSuccess: ({ message }) => {
      if (message === 'User updated successfully') {
        toast.success(message)
        router.refresh()
        successfullyCallback && successfullyCallback()
      }
      if (message === 'User already exists') {
        toast.info(message)
      }
      if (message === 'User update failed') {
        toast.error(message)
      }
    },
    onError: ({ message }) => {
      toast.error(message)
    },
  })
}

export const useDeleteUserAction = () => {
  const router = useRouter()
  return api.user.delete.useMutation({
    onSuccess: ({ message }) => {
      if (message === 'User deleted successfully') {
        toast.success(message)
        router.refresh()
      }
    },
  })
}

export const useDeleteAllUserAction = () => {
  const router = useRouter()
  return api.user.deleteAll.useMutation({
    onSuccess: ({ message }) => {
      if (message === 'All users deleted successfully') {
        toast.success(message)
        router.refresh()
      }
    },
  })
}
