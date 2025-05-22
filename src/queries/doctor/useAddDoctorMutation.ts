import { ADD_DOCTOR } from "../../api/api";
import { useMutation } from "@tanstack/react-query";
import { Axios } from "../../api/Axios";
import { useNavigate } from "react-router-dom";
type Props = {
  formData: FormData;
};
const useAddDoctorMutation = () => {
  const addDoctor = async ({ formData }: Props) => {
    try {
      const res = await Axios.post(ADD_DOCTOR, formData);
      return res;
    } catch (err) {
      throw err;
    }
  };
  const nav = useNavigate();
  const mutation = useMutation({
    mutationFn: addDoctor,
    onSuccess() {
      nav("/dashboard/doctors");
    },
  });

  return {
    mutation: mutation,
    loading: mutation.isPending,
    error: mutation.error,
  };
};

export default useAddDoctorMutation;
