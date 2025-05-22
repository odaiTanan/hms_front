import { useQuery } from "@tanstack/react-query";
import { Axios } from "../../api/Axios";
type Props = {
  api: string;
  queryKey: string;
};
const useGetQuery = (props: Props) => {
  const getAppointments = async () => {
    try {
      const res = await Axios.get(props.api);
      return res;
    } catch (err: any) {
      throw err?.response?.data;
    }
  };

  return useQuery({
    queryKey: [`${props.queryKey}`],
    queryFn: getAppointments,
  });
};

export default useGetQuery;
