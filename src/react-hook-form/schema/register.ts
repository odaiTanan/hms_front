import { z } from "zod";
export const RegisterSchema = z
  .object({
    name: z.string().min(3, { message: "name must be more than 2 letters" }),
    email: z.string().min(1, { message: "email is required" }).email(),
    password: z
      .string()
      .min(8, { message: "password must be more than seven characters" })
      .regex(/.[@.#$!%^&*.?]/, {
        message: "password must have at least one spiceal character",
      }),
    repassword: z.string().min(1, "confirm password is required"),
  })
  .refine((i) => i.password == i.repassword, {
    message: "password doesnt match",
    path: ["repassword"],
  });
