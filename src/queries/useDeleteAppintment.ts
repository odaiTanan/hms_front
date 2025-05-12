import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DELETE_APPOINTMENT } from "./../api/api";
import { Axios } from "./../api/Axios";

const useDeleteAppintment = () => {
  const queryClient = useQueryClient();
  const addAppointment = async (id: string) => {
    try {
      const res = await Axios.delete(DELETE_APPOINTMENT + id);
      return res;
    } catch (err) {
      throw err;
    }
  };
  const mutation = useMutation({
    mutationFn: addAppointment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });

  return {
    mutation: mutation,
    loading: mutation.isPending,
    error: mutation.error,
    isDeleteSuccess: mutation.isSuccess,
  };
};

export default useDeleteAppintment;
