import { toast } from "react-toastify";
import { CANCEL_APPOINTMENT, GET_MY_APPOINTEMENTS } from "../../api/api";
import Button from "../../components/Button";
import Title from "../../components/Title";
import useDelete from "../../queries/public/useDelete";
import useGetQuery from "../../queries/public/useGetQuery";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
type appointment = {
  appointment_date: string;
  department: string;
  dob: string;
  doctor: { name: string };
  doctorId: string;
  email: string;
  gender: string;
  hasVisited: true;
  name: string;
  patientId: string;
  phone: string;
  status: string;
  __v: number;
  _id: string;
};
const MyAppointments = () => {
  const [loadingBtn, setLoadingBtn] = useState<string>("");
  const successNotify = () =>
    toast.success("appointment canceled successfuly", {
      toastId: "validation-error",
      className: "text-primary fixed top-[75px]  dark:bg-gray-800",
    });
  const errorNotify = (message: string) =>
    toast.error(`${message}`, {
      toastId: "validation-error",
      className: "text-primary fixed top-[75px]  dark:bg-gray-800",
    });
  //get patient appointments
  const {
    data: myappointments,
    error: getError,
    isLoading: getLoading,
  } = useGetQuery({
    api: GET_MY_APPOINTEMENTS,
    queryKey: "myapointments",
  });
  //handle delete
  const {
    mutation: cancle,
    loading: deleteLoading,
    isDeleteSuccess,
    error: deleteError,
  } = useDelete({ api: CANCEL_APPOINTMENT, queryKey: "myapointments" });
  useEffect(() => {
    isDeleteSuccess && successNotify();
    setLoadingBtn("");
  }, [isDeleteSuccess]);
  useEffect(() => {
    if (getError?.message == "User is not authenticated!") {
      errorNotify(`please login to see your appointments`);
    } else {
      getError && errorNotify(`${getError?.message}`);
    }
    getError && errorNotify(`${deleteError?.message}`);
  }, [getError, deleteError]);
  const show = myappointments?.data.appointments.map(
    (app: appointment, index: number) => {
      return (
        <div
          key={index}
          className="relative overflow-hidden dark:bg-gray-800  bg-white center h-[210px] w-[210px] shadow-[0_3px_10px_rgb(0,0,0,0.2)]  rounded-lg"
        >
          <div className="h-[200px] w-[200px] z-[10]  bg-white  rounded-lg">
            {" "}
            <div className="z-[100] bg-white dark:bg-gray-800 w-full h-full p-2 flex flex-col justify-around">
              {" "}
              <h1 className="flex text-ellipse gap-2 text-gray-900 dark:text-gray-200">
                <p className="text-primary text-md">Doctor</p> {app.doctor.name}{" "}
              </h1>
              <h2 className="flex gap-2 text-gray-900 dark:text-gray-200">
                <p className="text-primary text-md">Department</p>{" "}
                {app.department}{" "}
              </h2>
              <h2 className="flex gap-2 text-gray-900 dark:text-gray-200">
                <p className="text-primary text-md">Date</p>{" "}
                {app.appointment_date.slice(0, 9)}{" "}
              </h2>
              <h2 className="flex gap-2 text-gray-900 dark:text-gray-200">
                <p className="text-primary text-md">Hour</p>{" "}
                {app.appointment_date.slice(-5)}PM{" "}
              </h2>
              <div className="flex justify-between">
                {" "}
                <Button
                  handleClick={() => {
                    setLoadingBtn(app._id);
                    cancle.mutate(app._id);
                  }}
                  title="cancel"
                  classN="bg-primary transition duration-[.2s] dark:hover:opacity-[0.8] dark:bg-[#e91e63] "
                  loading={deleteLoading && app._id == loadingBtn}
                />
                <p
                  className={`${
                    app.status == "Pending"
                      ? "text-yellow-500"
                      : app.status == "Accepted"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {app.status}
                </p>
              </div>
            </div>
          </div>

          <span className="h-[200px]  w-[200px] bg-primary absolute  transform -translate-y-[50%]  -translate-x-[50%]">
            {" "}
          </span>
          <span className="h-[200px]  w-[200px] bg-[#ff5722] dark:bg-[#009688] absolute bottom-0 right-0 transform translate-y-[50%]  translate-x-[50%]">
            {" "}
          </span>
        </div>
      );
    }
  );
  return (
    <div className="  min-h-[calc(100vh_-_75px)]  py-[50px]  gap-[30px] bg-background w-full flex-col  center ">
      <Title title="my appointments" />
      {myappointments?.data.length == 0 ? (
        <p className="text-md text-primary">you dont have appointments yet </p>
      ) : (
        <div className="container  min-h-[calc(100vh_-_75px)]  grid gap-[30px] justify-center justify-items-center grid-cols-[repeat(auto-fill,minmax(300px,1fr))] ">
          {getLoading
            ? [1, 2, 3].map(() => {
                return (
                  <div className="relative  overflow-hidden bg-gray-200 dark:bg-gray-800 center h-[210px] w-[210px] shadow-[0_3px_10px_rgb(0,0,0,0.2)]  rounded-lg">
                    <div className="h-[200px]  w-[200px] z-[10]    rounded-lg">
                      <div className="z-[100] relative bg-gray-200 dark:bg-gray-800 w-full h-full p-2 flex flex-col justify-around">
                        <Skeleton
                          width={160}
                          height={20}
                          baseColor="#bababa"
                          className="z-[110]  rounded-lg "
                        />
                        <Skeleton
                          width={160}
                          height={20}
                          baseColor="#bababa"
                          className="z-[110]  rounded-lg"
                        />
                        <Skeleton
                          width={160}
                          height={20}
                          baseColor="#bababa"
                          className="z-[110]  rounded-lg "
                        />
                        <Skeleton
                          width={100}
                          height={50}
                          baseColor="#bababa"
                          className="z-[110]  rounded-lg "
                        />
                      </div>
                      <span className="h-[200px] w-[200px] bg-primary absolute  transform -translate-y-[50%] top-0 left-0  -translate-x-[50%]">
                        {" "}
                      </span>
                      <span className="h-[200px] w-[200px] bg-[#ff5722] dark:bg-[#009688] absolute bottom-0 right-0 transform translate-y-[50%]  translate-x-[50%]">
                        {" "}
                      </span>
                    </div>
                  </div>
                );
              })
            : show}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
