import DepartmentCard from "../components/DepartmentCard";
import Title from "../components/Title";

type Props = {};

const Departments = (props: Props) => {
  return (
    <div className="   py-8  flex flex-col justify-center items-center ">
      <Title title="Departments" />
      <div className="container grid justify-items-center grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-7 p-5">
        <DepartmentCard />
        <DepartmentCard />
        <DepartmentCard />
        <DepartmentCard />
      </div>
    </div>
  );
};

export default Departments;
