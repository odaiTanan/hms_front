import { Outlet } from "react-router-dom";
import Mode from "../Mode";
import SideBar from "./SideBar";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className="min-h-screen bg-primary grid grid-cols-[50px_auto]  md:grid-cols-[70px_auto]">
      <SideBar />
      <div className="bg-background rounded-l-[30px] flex flex-col justify-start ">
        <div className="flex justify-end items-center h-[60px] w-full px-7">
          <Mode />
        </div>{" "}
        <div className="px-3 md:px-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
