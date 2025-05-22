import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
type Props = {
  role: "a" | "p";
};
// a component to prevent user is authanticated to get login or register page
const PreventAuthanticatedBack = ({ role }: Props) => {
  const cookie = new Cookies();
  const nav = useNavigate();
  useEffect(() => {
    cookie.get("role") == role && nav(-1);
  }, []);

  return <Outlet />;
};

export default PreventAuthanticatedBack;
