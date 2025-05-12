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
  docAvatar: z
    .instanceof(FileList)
    .refine((files) => files?.length > 0, "avatar is required")
    .refine(
      (files) => files[0]?.size < 5 * 1024 * 1024,
      "avatar size must be less than 5mb"
    )
    .refine(
      (files) =>
        ["image/jpeg", "image/png", "image/webp"].includes(files[0]?.type),
      "accebted images are .png,.jpeg,.webp "
    ),
});
