import { Link } from "react-router-dom";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BigLogo from "../assets/BigLogo";
const Footer = () => {
  return (
    <div className="grid dark:bg-none dark:!bg-background   border-t-2  border-primary  gap-3 justify-items-center p-4  footer grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div className="h-[200px] w-[200px]">
        <BigLogo />
      </div>
      <div className="">
        <h2 className="text-primary">Quick Links</h2>
        <div className=" dark:text-tcolor">
          <Link to="/" className="mb-1">
            Home
          </Link>
          <Link to="/appointment">Appointment</Link>
        </div>
      </div>
      <div>
        <h2 className="text-primary">Hours</h2>
        <div className="">
          <span className="mb-1 ">
            Monday <span>2:00 PM - 8:00 PM</span>
          </span>
          <span>
            Thursday <span>2:00 PM - 8:00 PM</span>
          </span>
        </div>
      </div>
      <div>
        <h2 className="text-primary">Contact Us</h2>
        <span className="mb-1">
          <FontAwesomeIcon className="mr-2 text-green-500" icon={faPhone} />
          <span>+999-999-999</span>
        </span>
        <span className="text-gray-500">
          <FontAwesomeIcon className="mr-2 text-blue-500" icon={faEnvelope} />
          <span>email@gmail.com</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;
