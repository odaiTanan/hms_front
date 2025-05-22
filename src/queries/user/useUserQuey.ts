import Cookies from "universal-cookie";
import { USER } from "../../api/api";
import { ADMIN } from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { Axios } from "../../api/Axios";

const useUserQuery = () => {
  const cookie = new Cookies();

  const getUser = async () => {
    try {
      const role = (await cookie.get("role")) == "a" ? ADMIN : USER;
      const res = await Axios.get(role);
      return res;
    } catch (err) {
      throw err;
    }
  };

  return useQuery({
    queryKey: [`${cookie.get("role") == "a" ? ADMIN : USER}`],
    queryFn: getUser,
  });
};

export default useUserQuery;
