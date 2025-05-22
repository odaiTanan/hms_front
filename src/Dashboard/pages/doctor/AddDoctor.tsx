import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { AddDoctorSchema } from "../../../react-hook-form/schema/addDoctor";
import useAddDoctorMutation from "../../../queries/doctor/useAddDoctorMutation";
import Input from "../../../react-hook-form/Input";
import Button from "../../../components/Button";
import { CustomCloseButton } from "../../../toastify/CustomCloseButton";
import avatar from "../../../assets/image.jpg";
import { useEffect, useRef, useState } from "react";
import { demo } from "../../../DemoErr";

type Props = {};

const AddDoctor = (props: Props) => {
  // Handle view selected avatar (URL for displaying image)
  const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>();
  // Store file (File object to upload)
  const [selecteAvatar, setSelecteAvatar] = useState<File | undefined>();

  // Default avatar display if not selected
  const displayedAvatar = selectedAvatar ? selectedAvatar : avatar;

  const inputRef = useRef<HTMLInputElement | null>(null);

  // react-hook-form handling
  type inputs = z.infer<typeof AddDoctorSchema>;
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
  } = useForm<inputs>({
    resolver: zodResolver(AddDoctorSchema),
  });

  // Display error from validation
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
        errNotify();
      }
    }
  }, [errors, isValid, isSubmitting]);
  console.log(errors);

  // Submit handler
  const { mutation, loading } = useAddDoctorMutation();
  const onSubmit: SubmitHandler<inputs> = async (inputs: inputs) => {
    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("email", inputs.email);
    formData.append("phone", inputs.phone);
    formData.append("password", inputs.password);
    formData.append("doctorDepartment", inputs.doctorDepartment);

    // Attach the file for avatar
    if (selecteAvatar) {
      formData.append("docAvatar", selecteAvatar);
    }
    /*
    try {
      await mutation.mutateAsync({ formData });
    } catch (e: any) {
      console.log(e);
    }*/
    demo();
  };

  return (
    <div className="flex py-6 flex-col md:flex-row justify-center items-center md:items-start gap-8">
      <div
        className="avatar w-[200px] h-[200px]"
        onClick={() => inputRef.current?.click()}
      >
        <img
          className="rounded-md w-full h-full bg-primary center cursor-pointer"
          src={displayedAvatar}
          alt="Avatar Preview"
        />
      </div>

      <form className="bg-transparent" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-[200px] md:w-[400px] sm:w-[300px]">
          <Input
            type="name"
            name="name"
            id="name"
            register={register}
            label="Name"
          />
          <Input
            type="email"
            name="email"
            id="email"
            register={register}
            label="Email"
          />
          <Input
            type="password"
            name="password"
            id="password"
            register={register}
            label="Password"
          />
          <Input
            type="phone"
            name="phone"
            id="phone"
            register={register}
            label="Phone"
          />

          <select
            {...register("doctorDepartment")}
            className="w-fit mb-[30px] h-[35px] text-primary dark:bg-gray-600 bg-gray-400 rounded-md"
            id="doctorDepartment"
          >
            <option value="">Select Department</option>
            <option value="cardiology">Cardiology</option>
            <option value="orthopedics">Orthopedics</option>
            <option value="pediatrics">Pediatrics</option>
          </select>

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setSelectedAvatar(URL.createObjectURL(file)); // For display
                setSelecteAvatar(file); // For upload
              }
            }}
            hidden
          />

          <Button
            type="submit"
            title="Add Doctor"
            loading={loading}
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
