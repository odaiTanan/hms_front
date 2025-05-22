import { useEffect, useRef } from "react";
import Input from "../../react-hook-form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { MessageSchema } from "../../react-hook-form/schema/message";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import usePost from "../../queries/public/usePost";
import { SEND_MESSAGE } from "../../api/api";
import Spinner from "../../components/Spinner";

const SendMessage = () => {
  const submitBtn = useRef<HTMLButtonElement | null>(null);
  //ref to form to reset
  const formRef = useRef<HTMLFormElement>(null);
  type inputs = z.infer<typeof MessageSchema>;
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    reset,
    handleSubmit,
  } = useForm<inputs>({ resolver: zodResolver(MessageSchema) });

  const { mutation, loading, error, isSuccess } = usePost({
    api: SEND_MESSAGE,
    queryKey: "messages",
    schema: MessageSchema,
  });
  //toastify notifies
  const notifyError = Object.values(errors)[0]?.message;
  const errNotify = () =>
    toast.error(`${notifyError}`, {
      toastId: "validation-error",
      className: "text-primary fixed top-[75px]  dark:bg-gray-800",
    });
  useEffect(() => {
    error
      ? toast.error(`${error?.message}`, {
          toastId: "validation-error",
          className: "text-primary fixed top-[75px]  dark:bg-gray-800",
        })
      : isSuccess
      ? toast.success("message sent successfuly", {
          toastId: "validation-success",
          className: "text-primary fixed top-[75px]  dark:bg-gray-800",
        })
      : "";
    if (!error && isSuccess) {
      formRef.current?.reset();
      reset();
    }
  }, [error, isSuccess]);
  useEffect(() => {
    if (!isValid && isSubmitting) {
      const firstError = Object.values(errors)[0]?.message;
      if (firstError) {
        !isValid && isSubmitting && errNotify();
      }
    }
  }, [errors, isValid, isSubmitting]);
  //sumit function
  const onSubmit: SubmitHandler<inputs> = async (inputs: inputs) => {
    mutation.mutate(inputs);
  };
  return (
    <div className="container py-8 mb-[100px]  ">
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="center flex-col"
      >
        <div className="w-full gap-[30px] flex flex-col md:flex-row justify-center items-center">
          {" "}
          <Input
            name="name"
            id="name"
            register={register}
            label="name"
            className="w-[300px]"
          ></Input>
          <Input
            name="phone"
            id="phone"
            register={register}
            label="phone"
            className="w-[300px]"
          ></Input>
        </div>
        <div className="flex center  w-[300px] md:w-[500px] gap-4">
          <div className="my-7 relative bg-primary center gap-3 rounded-full w-[250px] md:w-[450px] p-2">
            {" "}
            <textarea
              placeholder=" "
              style={{ height: "60px" }}
              className="text-area outline-none w-full relative resize-none rounded-full px-7 py-2  overflow-hidden"
              {...register("message")}
              id="message"
            ></textarea>{" "}
            <label
              htmlFor="message"
              className="absolute w-max  top-1/2 left-1/2  -translate-y-1/2 -translate-x-1/2 text-gray-400 "
            >
              write your message
            </label>
          </div>{" "}
          <div
            onClick={() => submitBtn.current?.click()}
            className="p-3 w-[40px] h-[40px] cursor-pointer hover:rotate-45 transition  bg-primary text-white center rounded-[50%]"
          >
            {!loading ? <FontAwesomeIcon icon={faPaperPlane} /> : <Spinner />}
          </div>
        </div>
        <button ref={submitBtn} type="submit" hidden></button>
      </form>{" "}
    </div>
  );
};

export default SendMessage;
