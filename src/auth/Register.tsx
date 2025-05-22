import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../react-hook-form/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { RegisterSchema } from "../react-hook-form/schema/register";
import BigLogo from "../assets/BigLogo";
import { toast } from "react-toastify";
import useAuthQuery from "../queries/auth/useAuthQuery";
import { CustomCloseButton } from "../toastify/CustomCloseButton";

const Register = () => {
  //toastify notifies
  const errNotify = () =>
    toast.error("this email has already been taken", {
      className: "text-primary dark:bg-gray-800",
    });
  //react-hook-form handling
  type inputs = z.infer<typeof RegisterSchema>;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<inputs>({ resolver: zodResolver(RegisterSchema) });

  //submit handler
  const { mutation, loading } = useAuthQuery();
  const onSubmit: SubmitHandler<inputs> = async (inputs: inputs) => {
    try {
      await mutation.mutateAsync({ inputs });
    } catch (e: any) {
      e?.status == 400 && errNotify();
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs-container py-6">
          <Input
            type="name"
            name="name"
            id="name"
            register={register}
            label="name"
            error={errors.name?.message}
          ></Input>
          <Input
            type="email"
            name="email"
            id="email"
            register={register}
            label="email"
            error={errors.email?.message}
          ></Input>
          <Input
            type="password"
            name="password"
            id="password"
            register={register}
            label="password"
            error={errors.password?.message}
          ></Input>
          <Input
            type="repassword"
            name="repassword"
            id="repassword"
            register={register}
            label="repassword"
            error={errors.repassword?.message}
          ></Input>
          <span className="formspan flex  text-tcolor md:text-gray-500 mb-2">
            you dont have an account:{" "}
            <Link className="ml-2 text-blue-400" to="/login">
              {" "}
              sign in
            </Link>
          </span>
          <Button
            type="submit"
            title="Register"
            loading={loading}
            disabled={loading}
          />{" "}
        </div>{" "}
        <div className="order-1 md:order-2 min-w-[300px]  bg-[rgb(23,23,23)]   ">
          <BigLogo className="mx-auto w-full  h-[230px] bg-[#eeeeee] dark:bg-background dark:md:bg-[#eeeeee]  " />
        </div>
      </form>
    </div>
  );
};

export default Register;
