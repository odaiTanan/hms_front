import { Link } from "react-router-dom";
import Button from "./Button";
import useDelete from "../queries/public/useDelete";
import { DELETE_DOCTOR } from "../api/api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { demo } from "../DemoErr";

type Props = {
  name: string;
  department: string;
  email: string;
  phone: string;
  avatar: string;
  id: number;
  type: string;
};

const DoctorCard = (props: Props) => {
  //handle delete in dashboard card
  const { mutation, isDeleteSuccess, loading } = useDelete({
    api: DELETE_DOCTOR,
    queryKey: "doctors",
  });
  const successDelete = () => toast.success("doctor deleted successfully");
  useEffect(() => {
    isDeleteSuccess && successDelete();
  }, [isDeleteSuccess]);
  return (
    <div className="  h-[260px]  transition duration-[.2s] hover:scale-[1.03]  w-full flex items-end">
      <div className="flex shadow-md dark:bg-gray-800  hover:shadow-lg bg-white w-full  flex-col relative gap-2 items-start  p-3 rounded-lg h-[210px]  ">
        <div
          className={`absolute top-[-50px] right-0 rounded-[50%] border border-g dark:border-background border-[9px] h-[100px] w-[100px] overflow-hidden`}
        >
          <img
            className="w-full h-full object-cover"
            src={props.avatar}
            alt={props.name}
          />
        </div>
        {/* <img
            className="w-full h-full rounded-[50%]"
            src={props.avatar}
            alt=""
  />*/}
        <h1 className="font-bold text-lg text-primary">{props.name} </h1>
        <span className="text-skin dark:text-gray-500">
          {props.department}{" "}
        </span>
        <div className="flex gap-2">
          <span className="font-bold">email:</span>
          <span>{props.email}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold">phone:</span>
          <span>{props.phone}</span>
        </div>
        {props.type == "user" ? (
          <Link to={`/doctor/${props.id}`}>
            <Button classN="mt-2" title="make appointment" />
          </Link>
        ) : (
          <Button
            classN="mt-2 bg-primary  dark:bg-red-500"
            title="delete"
            handleClick={() => demo() /* mutation.mutate(`${props.id}`)*/}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default DoctorCard;
