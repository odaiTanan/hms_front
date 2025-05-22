import { useQuery } from "@tanstack/react-query";
import { GET_DOCTOR_BYID } from "../../api/api";
import { Axios } from "../../api/Axios";

type Props = { id?: string };

const useGetDocById = (props: Props) => {
  const getDoctor = async () => {
    try {
      const res = await Axios.get(GET_DOCTOR_BYID + `${props.id}`);
      return res;
    } catch (err) {
      throw err;
    }
  };

  return useQuery({ queryKey: [`doctor${props.id}`], queryFn: getDoctor });
};

export default useGetDocById;
