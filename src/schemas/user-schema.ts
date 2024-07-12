import { z } from "zod";

export const userSchema = z.object({
  id: z.number().nullable().optional(),
  name: z.string().min(2, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  created_at: z.custom<Date>(),
});

export type UserSchemaType = z.infer<typeof userSchema>;

export const createAndUpdateUserSchema = userSchema.omit({ created_at: true });

export type CreateAndUpdateUserSchemaType = z.infer<
  typeof createAndUpdateUserSchema
>;

export const deleteUserScheme = userSchema.pick({ id: true });

export type DeleteUserSchemaType = z.infer<typeof deleteUserScheme>;
