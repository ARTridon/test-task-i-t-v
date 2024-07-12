import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'

import { z } from 'zod'

import { createAndUpdateUserSchema, deleteUserScheme, userSchema } from '@/schemas/user-schema'

import { db } from '@/lib/database/db'

export const userRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    const users = await db.selectFrom('user').selectAll().execute()
    return users
  }),
  create: publicProcedure
    .input(createAndUpdateUserSchema.omit({ id: true }))
    .mutation(async ({ input }) => {
      try {
        await db.insertInto('user').values(input).executeTakeFirstOrThrow()
        return { message: 'User created successfully' }
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (error.sqlState === '23000') {
          return { message: 'User already exists' }
        }
        return { message: 'User creation failed' }
      }
    }),

  update: publicProcedure.input(createAndUpdateUserSchema).mutation(async ({ input }) => {
    const { id, ...body } = input
    try {
      await db.updateTable('user').set(body).where('id', '=', id!).executeTakeFirstOrThrow()
      return { message: 'User updated successfully' }
    } catch (error) {
      return { message: 'User update failed' }
    }
  }),

  uploadXLSX: publicProcedure
    .input(z.array(userSchema.omit({ id: true })))
    .mutation(async ({ input }) => {
      const users = await db.selectFrom('user').selectAll().execute()

      const existingUsers = input
        .filter((user) => {
          return !users.some((u) => u.email === user.email && u.name === user.name)
        })
        .map((user) => ({
          name: user.name,
          email: user.email,
          created_at: user.created_at.toString(),
        }))

      try {
        await db.insertInto('user').values(existingUsers).executeTakeFirstOrThrow()
        return { message: 'Users uploaded successfully' }
      } catch (error) {
        console.log(error)

        return { message: 'Users upload failed' }
      } finally {
      }
    }),

  delete: publicProcedure.input(deleteUserScheme).mutation(async ({ input }) => {
    try {
      await db.deleteFrom('user').where('id', '=', input.id!).executeTakeFirst()

      await db.selectFrom('user').selectAll().execute()

      return { message: 'User deleted successfully' }
    } catch (error) {
      return { message: 'User deletion failed' }
    }
  }),

  deleteAll: publicProcedure.mutation(async () => {
    try {
      await db.deleteFrom('user').execute()
      return { message: 'All users deleted successfully' }
    } catch (error) {
      return { message: 'All users deletion failed' }
    }
  }),
})
