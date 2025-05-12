import { ADMIN } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import { Axios } from "../api/Axios";

type Props = {
  inputs: { role?: string };
};
const useUserQuery = () => {
  const getUser = async () => {
    try {
      const res = await Axios.get(ADMIN);
      return res;
    } catch (err) {
      throw err;
    }
  };

  return useQuery({ queryKey: ["admin"], queryFn: getUser });
};

export default useUserQuery;
