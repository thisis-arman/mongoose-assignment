import { z } from "zod";

const UserValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string().max(20),
  fullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
});

export const userZodValidation = {
  UserValidationSchema,
};
