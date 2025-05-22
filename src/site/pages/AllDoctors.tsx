import Skeleton from "react-loading-skeleton";
import DoctorCard from "../../components/DoctorCard";
import { doctor } from "../../types/doctor";
import Title from "../../components/Title";
import { useNavigate, useParams } from "react-router-dom";
import useGetQuery from "../../queries/public/useGetQuery";
import { GET_ALL_DOCTORS } from "../../api/api";

const AllDoctors = () => {
  //geting section from param
  const param = useParams();
  const nav = useNavigate();
  //get doctors
  const { data: doctors, isLoading } = useGetQuery({
    api: GET_ALL_DOCTORS,
    queryKey: "doctors",
  });
  const show = doctors?.data["doctors"].map((doctor: doctor, index: number) => {
    return param?.department !== "all" ? (
      doctor.doctorDepartment == param.department ? (
        <DoctorCard
          key={index}
          name={doctor.name}
          email={doctor.email}
          phone={doctor.phone}
          department={doctor.doctorDepartment}
          avatar={doctor.docAvatar.url}
          id={doctor._id}
          type="user"
        />
      ) : (
        ""
      )
    ) : (
      <DoctorCard
        key={index}
        name={doctor.name}
        email={doctor.email}
        phone={doctor.phone}
        department={doctor.doctorDepartment}
        avatar={doctor.docAvatar.url}
        id={doctor._id}
        type="user"
      />
    );
  });

  return (
    <div className=" bg-background w-full center">
      <div className="container mb-9  flex justify-start flex-col items-center  min-h-[calc(100vh_-_75px)]">
        <div className="flex-col pt-2  center w-full">
          <Title
            title={`${
              param?.department !== "all" ? param.department : "all"
            } doctors`}
          />{" "}
          <div className="w-full flex justify-end  ">
            <select
              onChange={(e) => nav(`/alldoctors/${e.target.value}`)}
              className="w-[160px]  mb-5 dark:border-gray-200 dark:bg-primary dark:text-gray-100  hover:shadow-[0_0_2px_0] shadow-blue-300 h-[40px] p-2 rounded-lg bg-white text-primary outline-none border-2 border-primary "
              name=""
              id=""
              defaultValue={`${param?.department ? param.department : ""}`}
            >
              <option className="text-gray-600 dark:bg-white" value="all">
                All departments
              </option>
              <option
                className="text-gray-600 dark:bg-white"
                value="pediatrics"
              >
                pediatrics
              </option>
              <option
                className="text-gray-600 dark:bg-white"
                value="orthopedics"
              >
                orthopedics
              </option>
              <option
                className="text-gray-600 dark:bg-white"
                value="cardiology"
              >
                cardiology
              </option>
            </select>
          </div>
        </div>

        <div
          className={`container mb-8 mt-[30px]   grid gap-[30px] justify-center justify-items-center ${
            isLoading
              ? "grid-cols-1 h-[260px] overflow-hidden md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"
          }`}
        >
          {isLoading
            ? [1, 2, 3].map(() => {
                return (
                  <div className="relative mt-[50px]">
                    {" "}
                    <div className="absolute z-[10]  bg-[#bababa] top-[-50px] right-0 rounded-[50%] border border-g dark:border-background border-[9px] h-[100px] w-[100px] overflow-hidden"></div>
                    <Skeleton
                      style={{ borderRadius: "8px" }}
                      width={305}
                      height={210}
                      baseColor="#bababa"
                    />
                    ;{" "}
                  </div>
                );
              })
            : show}
        </div>
      </div>
    </div>
  );
};

export default AllDoctors;
