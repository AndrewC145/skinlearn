import * as z from "zod";

export const loginSchema: z.ZodType = z.object({
  username: z.string(),
  password: z.string().min(8, { message: "Password is too short" }),
});
