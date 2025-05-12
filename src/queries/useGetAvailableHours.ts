import { GET_AVAILABLE_TIME } from "./../api/api";
import { Axios } from "./../api/Axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type Props = {
  date: string;
  doctorId?: string;
};

const useGetAvailableHours = (props: Props) => {
  const getHours = async () => {
    try {
      const res = await Axios.get(
        GET_AVAILABLE_TIME + `?date=${props.date}&doctorId=${props.doctorId}`
      );
      return res;
    } catch (err) {
      throw err;
    }
  };

  return useQuery({
    queryKey: ["getHours" + props.date + "" + props.doctorId],
    queryFn: getHours,
    enabled: Boolean(props.date),
  });
};

export default useGetAvailableHours;
