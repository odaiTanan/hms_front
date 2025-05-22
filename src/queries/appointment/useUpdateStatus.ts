import { Axios } from "../../api/Axios";
import { UPDATE_APPOINTMENT } from "../../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateStatus = () => {
  const queryClient = useQueryClient();
  const up = async (A: { id: string; status: string }) => {
    try {
      const res = await Axios.put(UPDATE_APPOINTMENT + A.id, {
        status: A.status,
      });
      return res;
    } catch (err) {
      throw err;
    }
  };
  const mutation = useMutation({
    mutationFn: up,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });

  return {
    mutation: mutation,
    loading: mutation.isPending,
    error: mutation.error,
  };
};

export default useUpdateStatus;
