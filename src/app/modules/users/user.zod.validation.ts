import { z } from "zod";

const UserValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
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
  isDeleted: z.boolean(),
  orders: z
    .array(
      z.object({
        productName: z.string(),
        price: z.number(),
        quantity: z.number(),
      })
    )
    .optional(),
});

const orderSchema = z.object({
  productName: z.string().min(1, { message: "Product Name is required" }),
  price: z.number().positive({ message: "Price is required" }),
  quantity: z.number().positive({ message: "Quantity is required" }),
});

const ordersSchema = z.array(orderSchema);

export const userZodValidation = {
  UserValidationSchema,
  ordersSchema,
};
