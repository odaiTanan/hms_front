import Cookies from "universal-cookie";
import { LOGIN, REGISTER } from "../../api/api";
import { useMutation } from "@tanstack/react-query";
import { Axios } from "../../api/Axios";
import { useNavigate } from "react-router-dom";
type Props = {
  inputs: { name?: string; email: string; password: string };
};
const useAuthQuery = () => {
  const handleAuth = async ({ inputs }: Props) => {
    try {
      //if name input exist that mean it is register form else login
      const res = await Axios.post(inputs.name ? REGISTER : LOGIN, {
        ...inputs,
        role:
          inputs.email == "admin@gmail.com" && !inputs.name
            ? "Admin"
            : "Patient",
      });
      return res;
    } catch (err) {
      throw err;
    }
  };
  const nav = useNavigate();
  const mutation = useMutation({
    mutationFn: handleAuth,
    onSuccess(data) {
      //universal cookie usage
      const cookies = new Cookies();

      if (data?.data?.user.role == "Admin") {
        cookies.set("role", "a", { path: "/" });
        nav("/dashboard/home");
      } else {
        cookies.set("role", "p", { path: "/" });
        window.location.pathname = "/";
      }
    },
  });

  return {
    mutation: mutation,
    loading: mutation.isPending,
    error: mutation.error,
  };
};

export default useAuthQuery;
