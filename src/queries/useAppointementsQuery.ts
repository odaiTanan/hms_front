import { GET_ALL_APPOINTEMENTS } from "./../api/api";
import { useQuery } from "@tanstack/react-query";
import { Axios } from "../api/Axios";

const useAppointmentsQuery = () => {
  const getAppointments = async () => {
    try {
      const res = await Axios.get(GET_ALL_APPOINTEMENTS);
      return res;
    } catch (err) {
      throw err;
    }
  };

  return useQuery({ queryKey: ["appointments"], queryFn: getAppointments });
};

export default useAppointmentsQuery;
