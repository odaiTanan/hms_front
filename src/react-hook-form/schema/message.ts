import { z } from "zod";
export const MessageSchema = z.object({
  name: z.string().min(3, "name must have at least 3 characters"),
  phone: z
    .string()
    .min(1, { message: "phone is required" })
    .length(10, "phone number must be 10 digits")
    .regex(/^[0-9]+$/, "phone must only has numbers"),
  message: z.string().min(1, "enter message"),
});
