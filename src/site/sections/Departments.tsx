import { Link } from "react-router-dom";
import pediatricsImage from "../../assets/s1.jpg";
import orthopedicsImage from "../../assets/s2.jpg";
import cardiologyImage from "../../assets/s4.jpg";
import DepartmentCard from "../../components/DepartmentCard";

const Departments = () => {
  return (
    <div className="   flex flex-col justify-center items-center ">
      <div className="container grid justify-center justify-items-center grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-7 p-5">
        <Link to="alldoctors/pediatrics">
          <DepartmentCard title="pediatrics" image={pediatricsImage} />
        </Link>
        <Link to="alldoctors/orthopedics">
          {" "}
          <DepartmentCard title="orthopedics" image={orthopedicsImage} />
        </Link>
        <Link to="alldoctors/cardiology">
          <DepartmentCard title="cardiology" image={cardiologyImage} />
        </Link>
      </div>
    </div>
  );
};

export default Departments;
