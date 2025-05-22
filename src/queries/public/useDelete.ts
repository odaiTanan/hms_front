import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "../../api/Axios";
type Props = {
  api: string;
  queryKey: string;
};
const useDelete = (props: Props) => {
  const queryClient = useQueryClient();
  const deleteFunc = async (id: string) => {
    try {
      const res = await Axios.delete(props.api + id);
      return res;
    } catch (err: any) {
      throw err?.response?.data;
    }
  };
  const mutation = useMutation({
    mutationFn: deleteFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${props.queryKey}`] });
    },
  });

  return {
    mutation: mutation,
    loading: mutation.isPending,
    error: mutation.error,
    isDeleteSuccess: mutation.isSuccess,
  };
};

export default useDelete;
