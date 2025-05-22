import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import useLogout from "../queries/auth/useLogout";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

type Props = {
  name: string;
  email: string;
  role: string;
  setIn: (i: boolean) => void;
};

const User = ({ name, email, role, setIn }: Props) => {
  const [visible, setVisible] = useState(false);
  const cookie = new Cookies();
  const ulRef = useRef<HTMLDivElement | null>(null);
  const { mutation, loading, isSuccess } = useLogout();
  useEffect(() => {
    isSuccess && setIn(false);
  }, [isSuccess]);
  function clickOut(e: MouseEvent) {
    !ulRef.current?.previousElementSibling?.contains(e.target as Node) &&
      setVisible(false);
  }
  useEffect(() => {
    document.body.addEventListener("click", clickOut);
    return () => {
      document.body.removeEventListener("click", clickOut);
    };
  }, []);
  return (
    <div className=" bg-transparent relative">
      <div
        onClick={() => setVisible((prev) => !prev)}
        className="h-[37px] w-[37px] cursor-pointer center rounded-[50%] bg-primary text-gray-100 text-xl"
      >
        <FontAwesomeIcon icon={faUser} />
      </div>
      {visible && (
        <div
          ref={ulRef}
          className="bg-white shadow-lg rounded-lg rounded-tr-none p-2 absolute bottom-[-20px] transform translate-y-[100%]  z-[1000] right-0"
        >
          <div className="absolute top-[0] transform translate-y-[-100%] right-0 bg-transparent border-[15px] border-t-transparent border-r-transparent border-b-white border-l-transparent "></div>
          <h2 className="flex items-center gap-2 text-primary mb-2 [border-bottom:2px_solid_gray]">
            {name}{" "}
            {cookie.get("role") == "a" && (
              <Link to="/dashboard/home">dashboard</Link>
            )}
          </h2>
          <h2 className="center w-fit gap-2 my-2">
            <p className="text-primary text-sm">Role :</p>{" "}
            <p className="text-sm">{role}</p>
          </h2>
          <p className="text-gray-800">{email}</p>
          <div>
            <Button
              handleClick={() => mutation.mutate()}
              title="Log out"
              classN=" w-full mt-3"
              loading={loading}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
