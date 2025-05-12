import { SubmitHandler, useForm } from "react-hook-form";
import { object, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AddDoctorSchema } from "../../../react-hook-form/schema/addDoctor";
import useAddDoctorMutation from "../../../queries/useAddDoctorMutation";
import Input from "../../../react-hook-form/Input";
import Button from "../../../components/Button";
import { CustomCloseButton } from "../../../toastify/CustomCloseButton";
import avatar from "../../../assets/image.jpg";
import { useEffect, useRef, useState } from "react";
type Props = {};

const AddDoctor = (props: Props) => {
  //handle view selected avatar
  const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>();
  const displayedAvatar = selectedAvatar ? selectedAvatar : avatar;
  const avatarInput = useRef<HTMLInputElement | null>(null);
  //react-hook-form handling
  type inputs = z.infer<typeof AddDoctorSchema>;
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
  } = useForm<inputs>({
    resolver: zodResolver(AddDoctorSchema),
  });
  const { ref: refi, ...rest } = register("docAvatar");
  console.log(errors);

  //toastify notifies
  const error = Object.values(errors)[0]?.message;
  const errNotify = () =>
    toast.error(`${error}`, {
      toastId: "validation-error",
      className: "text-primary dark:bg-gray-800",
    });
  useEffect(() => {
    if (!isValid && isSubmitting) {
      const firstError = Object.values(errors)[0]?.message;
      if (firstError) {
        !isValid && isSubmitting && errNotify();
      }
    }
  }, [errors, isValid, isSubmitting]);

  //submit handler
  const { mutation, loading } = useAddDoctorMutation();
  const onSubmit: SubmitHandler<inputs> = async (inputs: inputs) => {
    const formData = new FormData();

    formData.append("name", inputs.name);
    formData.append("email", inputs.email);
    formData.append("phone", inputs.phone);
    formData.append("password", inputs.password);
    formData.append("doctorDepartment", inputs.doctorDepartment);
    formData.append("docAvatar", inputs.docAvatar[0]);
    console.log(inputs);

    try {
      await mutation.mutateAsync({ formData });
    } catch (e: any) {
      console.log(e);
    }
  };
  return (
    <div className="flex py-6 flex-col md:flex-row justify-center items-center md:items-start  gap-8  ">
      <div
        className="avatar w-[200px] h-[200px]"
        onClick={() => avatarInput["current"]?.click()}
      >
        <img
          className="rounded-md w-full h-full bg-primary center cursor-pointer"
          src={displayedAvatar}
          alt=""
        />
      </div>
      <form className=" bg-transparent " onSubmit={handleSubmit(onSubmit)}>
        <div className="w-[200px] md:w-[400px]  sm:w-[300px]">
          <Input
            type="name"
            name="name"
            id="name"
            register={register}
            label="name"
          ></Input>
          <Input
            type="email"
            name="email"
            id="email"
            register={register}
            label="email"
          ></Input>
          <Input
            type="password"
            name="password"
            id="password"
            register={register}
            label="password"
          ></Input>
          <Input
            type="phone"
            name="phone"
            id="phone"
            register={register}
            label="phone"
          ></Input>
          <select
            {...register("doctorDepartment")}
            className="w-fit mb-[30px] h-[35px] text-primary dark:bg-gray-600 bg-gray-400 rounded-md"
            id="doctor department"
          >
            <option value="">select department</option>
            <option value="cardiology">cardiology</option>
          </select>
          <input
            type="file"
            {...register("docAvatar")}
            ref={avatarInput}
            onChange={(e) => {
              const file = e.target.files?.[0];

              setSelectedAvatar(file ? URL.createObjectURL(file) : undefined);
            }}
            hidden
            accept="image/*"
          />{" "}
          <Button
            type="submit"
            title="add doctor"
            loading={loading}
            disabled={loading}
          />{" "}
        </div>{" "}
        <ToastContainer closeButton={CustomCloseButton} />
      </form>
    </div>
  );
};

export default AddDoctor;
