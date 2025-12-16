import * as z from "zod";
export const loginSchema = z.object({
  username: z.string().nonempty({ error: "Username is required" }),
  password: z.string().nonempty({ error: "Password is required" }),
});

export const registerSchema = z
  .object({
    email: z.email(),
    username: z
      .string()
      .min(5, { error: "Username must be at least 5 characters long" })
      .max(20, { error: "Username must be at most 20 characters long" }),
    password: z
      .string()
      .min(8, { error: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { error: "Password must be at least 8 characters long" }),
    skin_type: z.enum(
      ["Dry", "Normal", "Oily", "Sensitive", "Acne", "Combination"],
      {
        error: "Please select a skin type",
      },
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const ingredientsSchema = z.object({
  ingredients: z.string().nonempty({ error: "Ingredients cannot be empty" }),
});

export const productSchema = z.object({
  name: z.string().nonempty({ error: "Product Name cannot be empty" }),
  brand: z.string().nonempty({ error: "Brand cannot be empty" }),
  ingredients: z.string().nonempty({ error: "Ingredients cannot be empty" }),
});

export type ingredientsValues = z.infer<typeof ingredientsSchema>;
export type loginFormValues = z.infer<typeof loginSchema>;
export type registerFormValues = z.infer<typeof registerSchema>;
export type productFormValues = z.infer<typeof productSchema>;
