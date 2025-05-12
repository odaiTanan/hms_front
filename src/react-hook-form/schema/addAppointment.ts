import { z } from "zod";

export const addAppointmentSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
  email: z
    .string()
    .email({ message: "email is invalid" })
    .min(1, { message: "email is required" }),
  phone: z.string().length(10, { message: "phone must be 10 numbers" }),
  dob: z.string().min(1, { message: "date of barthe is required" }),
  gender: z.string().min(1, { message: "gender of barthe is required" }),
  appointment_date: z.string(),
  department: z.string().min(1, { message: "department field is required" }),
  doctor_name: z.string().min(1, { message: "doctor name is required" }),
  hasVisited: z.string(),
});
