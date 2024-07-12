import { UserTable } from '@/app/(main)/_components/UserTable'
import { HydrateClient, api } from '@/trpc/server'

const Home = async () => {
  const users = await api.user.get()

  return (
    <HydrateClient>
      <UserTable users={users} />
    </HydrateClient>
  )
}

export default Home
