import * as z from "zod";
export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
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
    confirmPassword: z.string(),
    skinType: z.enum(["Dry", "Oily", "Sensitive", "Acne", "Combination"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type loginFormValues = z.infer<typeof loginSchema>;
export type registerFormValues = z.infer<typeof registerSchema>;
