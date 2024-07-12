import { useRouter } from 'next/navigation'

import { toast } from 'sonner'

import { api } from '@/trpc/react'

export const useUploadXLSXAction = ({ successfullyCallback }: ParamsType) => {
  const router = useRouter()
  return api.user.uploadXLSX.useMutation({
    onSuccess: ({ message }) => {
      if (message === 'Users uploaded successfully') {
        toast.success(message)
        router.refresh()
        successfullyCallback && successfullyCallback()
      }
    },
  })
}
