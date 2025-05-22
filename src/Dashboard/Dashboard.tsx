import { Outlet, useNavigate } from "react-router-dom";
import Mode from "../Mode";
import SideBar from "./SideBar";
import Loading from "../components/Loading";
import useGetQuery from "../queries/public/useGetQuery";
import { GET_ALL_APPOINTEMENTS } from "../api/api";

type Props = {};

const Dashboard = (props: Props) => {
  //to check authantication
  const { error: e1, isLoading: l1 } = useGetQuery({
    api: GET_ALL_APPOINTEMENTS,
    queryKey: "appointments",
  });
  const nav = useNavigate();
  if (e1 && e1.message == "Dashboard User is not authenticated!") {
    nav("/adminlogin");
  }

  return (
    <div className="min-h-screen relative bg-primary grid grid-cols-[50px_auto]  md:grid-cols-[70px_auto]">
      <div className="relative">
        <div className="fixed top-[50%] translate-x-[50%]  -translate-y-[50%] left-0">
          {" "}
          <SideBar />
        </div>
      </div>

      <div className="bg-background rounded-l-[30px] flex flex-col justify-start ">
        <div className="flex justify-end items-center h-[60px] w-full px-7">
          <Mode />
        </div>{" "}
        <div className="px-1  h-[calc[100vh_-_60px]] center md:px-5">
          {l1 ? (
            <Loading />
          ) : (
            <div className="w-[calc(100%_-_70px)]  min-h-[calc(100vh_-_60px)]">
              {" "}
              <Outlet />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
