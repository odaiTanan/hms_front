import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useDelete from "../queries/public/useDelete";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { DELETE_MESSAGE } from "../api/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { demo } from "../DemoErr";

type Props = {
  id: string;
  name: string;
  phone: string;
  message: string;
};

const Message = (props: Props) => {
  //select loading item
  const [loadingDeleteId, setLaodingDeleteId] = useState<string>("");
  //delete message mutation
  const {
    mutation: deleteMessage,
    isDeleteSuccess,
    loading: loadingDelete,
  } = useDelete({ api: DELETE_MESSAGE, queryKey: "messages" });
  //success notify
  const success = () =>
    toast.success("message deleted successfuly", {
      toastId: "validation-error",
      className: "text-primary dark:bg-gray-800",
    });
  useEffect(() => {
    isDeleteSuccess && success();
  }, [isDeleteSuccess]);
  return (
    <div
      className="flex flex-col p-3  items-start h-[250px]  justify-between dark:bg-gray-800
    bg-white
    shadow-[rgba(0,0,0,0.16)_0px_1px_4px] dark:shadow-[rgb(96,165,250)_0px_0px_8px] rounded-lg"
    >
      <div className="w-[200px]  overflow-y-srcoll  gap-2 rounded-lg  flex flex-col justify-start items-start ">
        <h1 className="font-bold text-primary">{props.name}</h1>
        <h3 className="dark:text-gray-200 text-gray-800">{props.phone}</h3>
        <p className="text-gray-500 dark:text-gray-400 scroll-container p-1 h-[140px] overflow-auto  max-w-full ">
          {" "}
          {props.message}
        </p>{" "}
      </div>{" "}
      {loadingDelete && loadingDeleteId == props.id ? (
        <Spinner />
      ) : (
        <FontAwesomeIcon
          icon={faTrash}
          className="text-red-500 cursor-pointer transition hover:text-red-600"
          onClick={() => {
            demo();
            /*
            setLaodingDeleteId(`${props.id}`);
            deleteMessage.mutate(props.id);*/
          }}
        />
      )}
    </div>
  );
};

export default Message;
