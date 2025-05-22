import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../react-hook-form/Input";
import { z } from "zod";
import { LoginSchema } from "../react-hook-form/schema/login";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/Button";
import BigLogo from "../assets/BigLogo";
import { toast } from "react-toastify";
import { CustomCloseButton } from "../toastify/CustomCloseButton";
import useAuthQuery from "../queries/auth/useAuthQuery";

const AdminLogin = () => {
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
    reset,
  } = useForm<inputs>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "admin@gmail.com",
      password: "Odaitanan@11",
    },
  });

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
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs-container py-11">
          <h1 className="text-primary text-center mb-3 text-lg font-bold">
            Admin Login
          </h1>
          <Input
            type="email"
            name="email"
            id="email"
            register={register}
            label="email"
            error={errors.email?.message}
          />
          <Input
            type="password"
            name="password"
            id="password"
            register={register}
            label="password"
            error={errors.password?.message}
          />

          <Button
            type="submit"
            title="Login"
            loading={loading}
            disabled={loading}
          />
        </div>
        <div className="order-1 min-w-[300px] md:order-2 center">
          <BigLogo className="mx-auto w-full mt-5 h-[230px] bg-[#eeeeee] dark:bg-background dark:md:bg-[#eeeeee]" />
        </div>
      </form>
      <div style={{ position: "relative" }}></div>
    </div>
  );
};

export default AdminLogin;
