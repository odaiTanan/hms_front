import { z } from "zod";
import { Axios } from "../../api/Axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
type Props = {
  schema: any;
  api: string;
  queryKey: string;
  date?: string;
  doctor?: string;
};
const usePost = ({ schema, api, queryKey, date, doctor }: Props) => {
  const queryClient = useQueryClient();
  const POST = async (inputs: z.infer<typeof schema>) => {
    try {
      const res = await Axios.post(api, inputs);
      return res;
    } catch (err: any) {
      throw err?.response?.data;
    }
  };
  const mutation = useMutation({
    mutationFn: POST,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          `${queryKey}`,
          `${queryKey == "appointments" && "getHours" + date + "" + doctor}`,
        ],
      });
    },
  });

  return {
    mutation: mutation,
    loading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export default usePost;
