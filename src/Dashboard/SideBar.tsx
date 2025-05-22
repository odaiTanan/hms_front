import {
  faHouse,
  faMessage,
  faRightFromBracket,
  faUserDoctor,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
import useLogout from "../queries/auth/useLogout";
import { useEffect } from "react";

const SideBar = () => {
  const { mutation, isSuccess } = useLogout();
  const nav = useNavigate();
  useEffect(() => {
    isSuccess && nav("/adminlogin");
  }, [isSuccess]);
  return (
    <div className="flex   [&>*]:cursor-pointer  bg-primary text-white sidebar text-[20px] md:text-[28px] flex-col h-screen justify-center items-center  gap-[40px]">
      <NavLink to="/dashboard/home">
        {" "}
        <FontAwesomeIcon icon={faHouse} />
      </NavLink>
      <NavLink to="/dashboard/doctors">
        {" "}
        <FontAwesomeIcon icon={faUserDoctor} />
      </NavLink>
      <NavLink to="/dashboard/adddoctor">
        {" "}
        <FontAwesomeIcon icon={faUserPlus} />
      </NavLink>
      <NavLink to="/dashboard/messages">
        <FontAwesomeIcon icon={faMessage} />
      </NavLink>
      <div onClick={() => mutation.mutate()}>
        {" "}
        <FontAwesomeIcon icon={faRightFromBracket} />
      </div>
    </div>
  );
};

export default SideBar;
