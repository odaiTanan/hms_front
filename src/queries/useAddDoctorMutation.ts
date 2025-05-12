import { useMutation } from "@tanstack/react-query";
import { Axios } from "../api/Axios";
import { useNavigate } from "react-router-dom";
type Props = {
  formData: FormData;
};
const useAddDoctorMutation = () => {
  const addDoctor = async ({ formData }: Props) => {
    try {
      //if name input exist that mean it is register form else login
      const res = await Axios.post("user/doctor/addnew", formData);
      return res;
    } catch (err) {
      throw err;
    }
  };
  const nav = useNavigate();
  const mutation = useMutation({
    mutationFn: addDoctor,
    onSuccess(data) {
      //data?.data?.user.role == "Admin" ? nav("/dashboard") : nav("/");
    },
  });

  return {
    mutation: mutation,
    loading: mutation.isPending,
    error: mutation.error,
  };
};

export default useAddDoctorMutation;
