import { addAppointmentSchema } from "../../react-hook-form/schema/addAppointment";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../react-hook-form/Input";
import Button from "../../components/Button";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import usePost from "../../queries/public/usePost";
import { ADD_APPOINTMENT } from "../../api/api";

type Props = {
  date: string;
  doctorName: string;
  department: string;
};

const Appointment = (props: Props) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const nav = useNavigate();
  const [disable, setDisable] = useState(false);
  //form handling
  type appointment = z.infer<typeof addAppointmentSchema>;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<appointment>({
    resolver: zodResolver(addAppointmentSchema),
    defaultValues: {
      appointment_date: props.date,
      department: props.department,
      doctor_name: props.doctorName,
      hasVisited: false,
    },
  });
  //add appointmnet mutation
  const {
    mutation,
    loading: l_addAppointment,
    error: muError,
    isSuccess: isSuccessBook,
  } = usePost({
    api: ADD_APPOINTMENT,
    queryKey: "appointments",
    schema: addAppointmentSchema,
    doctor: props.doctorName,
    date: props.date,
  });
  useEffect(() => {
    isSuccessBook && nav("/myappointments");
  }, [isSuccessBook]);
  //error notify
  const errNotify = (err: Error | string) =>
    toast.error(`${err}`, {
      toastId: "validation-error",
      className: "text-primary dark:bg-gray-800",
    });
  const onSubmit: SubmitHandler<appointment> = (data: appointment) => {
    mutation.mutate(data);
  };
  useEffect(() => {
    if (muError) {
      muError.message == "User is not authenticated!"
        ? nav("/login")
        : errNotify(`${muError.message}`);
      muError?.message;
    }
  }, [muError]);
  return (
    <div>
      <form
        ref={formRef}
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
          <div className="center flex-col gap-3 ">
            <div className="center gap-2">
              {" "}
              <input
                defaultChecked={false}
                id="hasVisited"
                type="checkbox"
                {...register("hasVisited")}
              />{" "}
              <label htmlFor="hasVisited" className="dark:text-gray-100">
                have you visited Dr {props.doctorName} before
              </label>
            </div>

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
        <Button
          title="make appointment"
          type="submit"
          loading={l_addAppointment}
        />
      </form>
    </div>
  );
};

export default Appointment;
