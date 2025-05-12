import {
  faHouse,
  faMessage,
  faRightFromBracket,
  faUserDoctor,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

type Props = {};

const SideBar = (props: Props) => {
  return (
    <div className="flex [&>*]:cursor-pointer  bg-primary text-white sidebar text-[20px] md:text-[28px] flex-col h-screen justify-center items-center  gap-[40px]">
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
      <NavLink to="/">
        {" "}
        <FontAwesomeIcon icon={faRightFromBracket} />
      </NavLink>
    </div>
  );
};

export default SideBar;
