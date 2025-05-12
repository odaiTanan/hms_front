import { date, z } from "zod";
import { addAppointmentSchema } from "../react-hook-form/schema/addAppointment";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../react-hook-form/Input";
import Button from "../components/Button";
import { useEffect } from "react";
import useAppointmentMutation from "../queries/useAppointmentMutation";

type Props = {
  date: string;
  doctorName: string;
  department: string;
};

const Appointment = (props: Props) => {
  type appointment = z.infer<typeof addAppointmentSchema>;
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
  } = useForm<appointment>({
    resolver: zodResolver(addAppointmentSchema),
    defaultValues: {
      appointment_date: props.date,
      department: props.department,
      doctor_name: props.doctorName,
      hasVisited: "false",
    },
  });
  const {
    mutation,
    loading: l_addAppointment,
    error,
  } = useAppointmentMutation();
  const onSubmit: SubmitHandler<appointment> = (data: appointment) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex mb-8 flex-col justify-strat items-center"
      >
        {" "}
        <div className="two-inputs">
          {" "}
          <Input
            type="text"
            name="name"
            id="name"
            register={register}
            label="name"
            error={errors.name?.message}
            className="w-[300px]"
          ></Input>{" "}
          <Input
            type="email"
            name="email"
            id="email"
            register={register}
            label="email"
            error={errors.email?.message}
            className="w-[300px]"
          ></Input>
        </div>
        <div className="two-inputs">
          {" "}
          <Input
            name="phone"
            id="phone"
            register={register}
            label="phone"
            error={errors.phone?.message}
            className="w-[300px]"
          ></Input>
          <Input
            type="date"
            name="dob"
            id="dob"
            register={register}
            label="dob"
            error={errors.dob?.message}
            className="w-[300px]"
          ></Input>
        </div>
        <div className="my-4">
          {" "}
          <div>
            <select
              id="gender"
              className="w-[300px] dark:bg-gray-800 bg-gray-400 h-[32px]  rounded-md border-[2px] text-primary border-primary"
              {...register("gender")}
            >
              <option value="" disabled selected>
                {" "}
                gender
              </option>
              <option value="male">male</option>
              <option value="feMale">feMale</option>
            </select>
            {errors.gender?.message && (
              <p className="mt-1 text-sm text-red-600">
                {errors.gender?.message}
              </p>
            )}
          </div>
        </div>
        <Button title="make appointment" type="submit" />
      </form>
    </div>
  );
};

export default Appointment;
