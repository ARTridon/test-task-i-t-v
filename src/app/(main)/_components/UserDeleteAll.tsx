import { useRouter } from 'next/navigation'

import { toast } from 'sonner'

import { api } from '@/trpc/react'

import { Button } from '@/components/ui/button'

export const UserDeleteAll = () => {
  const router = useRouter()
  const { mutate } = api.user.deleteAll.useMutation({
    onSuccess: ({ message }) => {
      if (message === 'All users deleted successfully') {
        toast.success(message)
        router.refresh()
      }
    },
  })
  return (
    <Button variant="default" onClick={() => mutate()}>
      Delete All User
    </Button>
  )
}
