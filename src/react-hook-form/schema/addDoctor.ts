import { z, any } from "zod";
export const AddDoctorSchema = z.object({
  name: z.string().min(3, { message: "name must be more than 2 letters" }),
  email: z.string().min(1, { message: "email is required" }).email(),
  phone: z.string().length(10, { message: "phone number must be 10 numbers" }),
  password: z
    .string()
    .min(8, { message: "password must be more than seven characters" })
    .regex(/.[@.#$!%^&*.?]/, {
      message: "password must have at least one spiceal character",
    }),
  doctorDepartment: z
    .string()
    .min(1, { message: "doctor department field is required" }),
});
