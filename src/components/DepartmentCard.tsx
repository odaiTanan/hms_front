type Props = {
  image: string;
  title: string;
};

const DepartmentCard = (props: Props) => {
  return (
    <div className="center flex-col gap-2">
      <h1 className="text-primary">{props.title}</h1>

      <div className="w-[300px] h-[300px] bg-skin dark:bg-gray-500 center">
        <div className="relative w-[280px] h-[280px] group overflow-hidden">
          {" "}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  w-full h-full group-hover:rotate-[5deg] group-hover:scale-[1.1] transition duration-300">
            <img
              className="w-full h-full object-cover"
              src={props.image}
              alt=""
            />
          </div>
          <div className="absolute z-[10] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  bg-[#ececec44]  group-hover:animate-flash  "></div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
