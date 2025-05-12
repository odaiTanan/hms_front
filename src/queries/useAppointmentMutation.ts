import { ADD_APPOINTMENT } from "./../api/api";
import { useMutation } from "@tanstack/react-query";
import { addAppointmentSchema } from "./../react-hook-form/schema/addAppointment";
import { Axios } from "./../api/Axios";
import { z } from "zod";

const useAppointmentMutation = () => {
  const addAppointment = async (data: z.infer<typeof addAppointmentSchema>) => {
    try {
      const res = await Axios.post(ADD_APPOINTMENT, data);
      return res;
    } catch (err) {
      throw err;
    }
  };
  const mutation = useMutation({
    mutationFn: addAppointment,
  });

  return {
    mutation: mutation,
    loading: mutation.isPending,
    error: mutation.error,
  };
};

export default useAppointmentMutation;
