import { z, string } from "zod";
export const LoginSchema = z.object({
  email: string().min(1, "email is required").email("email not valid"),
  password: string().min(1, "password is required"),
});
