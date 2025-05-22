import { useNavigate } from "react-router-dom";
import { ADMIN, USER, USER_LOGOUT } from "../../api/api";
import Cookies from "universal-cookie";
import { Axios } from "../../api/Axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ADMIN_LOOGOUT } from "../../api/api";

const useLogout = () => {
  const queryClient = useQueryClient();
  const cookie = new Cookies();
  const nav = useNavigate();
  const logOut = async () => {
    const role = cookie.get("role") == "a" ? ADMIN_LOOGOUT : USER_LOGOUT;
    try {
      const res = await Axios.get(role);
      return res;
    } catch (err) {
      throw err;
    }
  };
  const mutation = useMutation({
    mutationFn: logOut,
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [`${cookie.get("role") == "a" ? ADMIN : USER}`],
      });
      await cookie.remove("role");
      cookie.get("role") == "p" && nav("/login");
    },
  });

  return {
    mutation: mutation,
    loading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export default useLogout;
