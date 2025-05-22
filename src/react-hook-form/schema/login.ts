import { z } from "zod";
export const LoginSchema = z.object({
  email: z.string().min(1, "email is required").email("email not valid"),
  password: z.string().min(1, "password is required"),
});
