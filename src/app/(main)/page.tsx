import { HydrateClient, api } from '@/trpc/server'

import { UserTable } from '@/app/(main)/_components/UserTable'

const Home = async () => {
  const users = await api.user.get()

  return (
    <HydrateClient>
      <UserTable users={users} />
    </HydrateClient>
  )
}

export default Home
