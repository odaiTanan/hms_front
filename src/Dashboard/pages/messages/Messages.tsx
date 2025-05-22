import Message from "../../../components/Message";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useGetQuery from "../../../queries/public/useGetQuery";
import { GET_MESSAGES } from "../../../api/api";
import Loading from "../../../components/Loading";

const Messages = () => {
  const {
    data: messages,
    error,
    isLoading,
  } = useGetQuery({ api: GET_MESSAGES, queryKey: "messages" });

  if (error) return "some thing went wrong";
  const show = messages?.data.messages.map(
    (message: {
      name: string;
      phone: string;
      message: string;
      _id: string;
    }) => {
      return (
        <Message
          id={message._id}
          name={message.name}
          phone={message.phone}
          message={message.message}
        />
      );
    }
  );
  return (
    <div className="center  w-full flex-col  gap-7 ">
      <div className="center gap-2">
        <FontAwesomeIcon className="text-primary text-xl" icon={faEnvelope} />
        <h1 className="text-primary text-xl font-bold">Messages</h1>
        <FontAwesomeIcon className="text-primary text-xl" icon={faEnvelope} />
      </div>
      <div className="w-full p-4 relative center flex-wrap gap-[45px]">
        {isLoading ? <Loading /> : show}
      </div>
    </div>
  );
};

export default Messages;
