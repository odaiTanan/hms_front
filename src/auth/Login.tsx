import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../react-hook-form/Input";
import { z } from "zod";
import { LoginSchema } from "../react-hook-form/schema/login";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import BigLogo from "../assets/BigLogo";
import { toast } from "react-toastify";
import useAuthQuery from "../queries/auth/useAuthQuery";
const Login = () => {
  //react toastify notifies
  const InvalidNotify = () =>
    toast.error("invalid email or password", {
      className: "text-primary dark:bg-gray-800",
    });
  //hook form
  type inputs = z.infer<typeof LoginSchema>;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<inputs>({ resolver: zodResolver(LoginSchema) });

  //submit handler
  const { mutation, loading } = useAuthQuery();
  const onSubmit: SubmitHandler<inputs> = async (inputs: inputs) => {
    try {
      await mutation.mutateAsync({ inputs });
    } catch (e: any) {
      e?.status == 400 && InvalidNotify();
    }
  };

  return (
    <div className="form-container">
      <form className="form " onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs-container py-11">
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
          <span className="formspan flex text-tcolor md:text-gray-500 py-4 mb-2">
            you dont have an account:{" "}
            <Link className="ml-2 text-blue-400" to="/register">
              {" "}
              sign up
            </Link>
          </span>

          <Button
            type="submit"
            title="Login"
            loading={loading}
            disabled={loading}
          />
        </div>{" "}
        <div className="order-1 min-w-[300px] md:order-2 center ">
          <BigLogo className="mx-auto w-full mt-5 h-[230px] bg-[#eeeeee] dark:bg-background dark:md:bg-[#eeeeee]  " />
        </div>
      </form>{" "}
      <div style={{ position: "relative" }}> </div>
    </div>
  );
};

export default Login;
