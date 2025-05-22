import { Link } from "react-router-dom";
import Button from "./Button";
import Mode from "../Mode";
import Logo from "../assets/Logo";
import User from "./User";
import useUserQuery from "../queries/user/useUserQuey";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";

const Nav = () => {
  //get current user
  const { data: user } = useUserQuery();
  //handle menu show
  const [visible, setVisible] = useState(false);
  console.log(user);
  const cookie = new Cookies();
  const [In, setIn] = useState(false);
  useEffect(() => {
    setIn(user?.data.user && cookie.get("role") == "p");
  }, [user]);
  const navRef = useRef<HTMLDivElement | null>(null);
  function clickOut(e: MouseEvent) {
    if (window.innerWidth <= 768) {
      !navRef.current?.parentElement?.contains(e.target as Node) &&
        setVisible(false);
    }
  }
  useEffect(() => {
    document.body.addEventListener("click", clickOut);
    return () => {
      document.body.removeEventListener("click", clickOut);
    };
  }, []);
  console.log(visible);

  return (
    <div className="w-full    bg-[linear-gradient(92deg,rgba(255,210,189,1)0%,rgba(238,238,238,1)40%,rgba(238,238,238,1)60%,rgba(255,210,189,1)100%)] dark:bg-none dark:!bg-background  sticky top-0 z-[1000] shadow-md  dark:shadow-gray-600 dark:shadow-sm ">
      <nav className=" container  top-0 max-w-full h-[75px] flex justify-between items-center">
        <Link className="text-primary" to="/">
          <Logo />
        </Link>
        <div className="md:hidden"></div>
        <div className="relative ml-[50px]">
          <FontAwesomeIcon
            icon={faBars}
            className="block z-[2000] dark:text-gray-200 md:hidden text-[20px]"
            onClick={() => {
              setVisible((prev) => !prev);
            }}
          />
          {(visible || window.innerWidth > 768) && (
            <div
              ref={navRef}
              className="absolute md:flex  md:relative md:bottom-0 md:right-0  bottom-[-18px] right-[-10px] transform md:translate-y-0 translate-y-full bg-primary md:bg-transparent md:flex-row flex-col md:center right-0   flex text-tcolor rounded-lg rounded-tr-none md:gap-9 "
            >
              <div
                onClick={() => {
                  setVisible((prev) => !prev);
                }}
                className="absolute block md:hidden  top-0 transform translate-y-[-100%] right-0 bg-transparent border-[15px] border-t-transparent border-r-transparent border-b-primary border-l-transparent "
              ></div>

              <Link
                to="/"
                className="relative dark:text-gray-200 center p-[20px] md:p-0 md:text-gray-900 md:border-0 border-b-2 text-gray-100 group"
              >
                Home
                <span
                  className="
        h-[1.5px] w-0 
        md:group-hover:w-full 
        transition-all duration-300 ease-in-out 
        absolute bottom-[-5px] left-0 
        bg-primary origin-center
    "
                ></span>{" "}
              </Link>
              <Link
                to="/myappointments"
                className="relative text-center dark:text-gray-200 center p-[20px] md:p-0 md:text-gray-900 md:border-0 border-b-2 text-gray-100 group"
              >
                My appointments
                <span
                  className="
        h-[1.5px] w-0 
        md:group-hover:w-full 
        transition-all duration-300 ease-in-out 
        absolute bottom-[-5px] left-0 
        bg-primary origin-center
    "
                ></span>{" "}
              </Link>
              <Link
                to="/alldoctors/all"
                className="relative dark:text-gray-200 text-gray-100 p-[20px] md:p-0 center md:text-gray-900 group"
              >
                Doctors{" "}
                <span
                  className="
        h-[1.5px] w-0 
        md:group-hover:w-full 
        transition-all duration-300 ease-in-out 
        absolute bottom-[-5px] left-0 
        bg-primary origin-center
    "
                ></span>
              </Link>
            </div>
          )}
        </div>
        <div className="center gap-[20px] md:gap-[40px]">
          {In ? (
            <User
              name={user?.data.user.name}
              email={user?.data.user.email}
              role={user?.data.user.role}
              setIn={setIn}
            />
          ) : (
            <Link to="/login">
              <Button title={"login"} />
            </Link>
          )}

          <Mode />
        </div>
      </nav>
    </div>
  );
};

export default Nav;
