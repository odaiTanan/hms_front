import { useQuery } from "@tanstack/react-query";
import { Axios } from "../api/Axios";
import { GET_ALL_DOCTORS } from "../api/api";

const useGetDoctorsQuery = () => {
  const getDoctors = async () => {
    try {
      const res = await Axios.get(GET_ALL_DOCTORS);
      return res;
    } catch (err) {
      throw err;
    }
  };

  return useQuery({ queryKey: ["doctors"], queryFn: getDoctors });
};

export default useGetDoctorsQuery;
