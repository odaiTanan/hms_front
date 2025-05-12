import { Link } from "react-router-dom";

import Button from "./Button";
import Mode from "../Mode";
import Logo from "../assets/Logo";

const Nav = () => {
  return (
    <div className="w-full sticky top-0 z-[1000] shadow-md  bg-background dark:shadow-gray-600 dark:shadow-sm ">
      <nav className=" container  top-0 max-w-full h-[75px] flex justify-between items-center">
        <Link className="text-primary" to="/">
          <Logo />
        </Link>
        <div className="flex text-tcolor gap-4 md:gap-9">
          <Link to="/" className="relative group">
            Home
            <span
              className="
        h-[1.5px] w-0 
        group-hover:w-full 
        transition-all duration-300 ease-in-out 
        absolute bottom-[-5px] left-0 
        bg-primary origin-center
    "
            ></span>{" "}
          </Link>
          <Link to="/appointment" className="relative group">
            Appointment{" "}
            <span
              className="
        h-[1.5px] w-0 
        group-hover:w-full 
        transition-all duration-300 ease-in-out 
        absolute bottom-[-5px] left-0 
        bg-primary origin-center
    "
            ></span>
          </Link>
        </div>
        <div className="center gap-[20px] md:gap-[40px]">
          {" "}
          <Link to="/login">
            {" "}
            <Button title={"login"} />
          </Link>
          <Mode />
        </div>
      </nav>
    </div>
  );
};

export default Nav;
