type Props = {};

const DepartmentCard = (props: Props) => {
  return (
    <div className="w-[300px] h-[300px] bg-skin dark:bg-gray-500 center">
      <div className="relative w-[280px] h-[280px] group overflow-hidden">
        {" "}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  bg-[url(/src/assets/s1.jpg)] bg-cover w-full h-full group-hover:rotate-[5deg] group-hover:scale-[1.1] transition duration-300"></div>
        <div className="absolute z-[10] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  bg-[#ececec44]  group-hover:animate-flash  "></div>
      </div>
    </div>
  );
};

export default DepartmentCard;
