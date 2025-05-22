import DoctorCard from "../../components/DoctorCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { doctor } from "../../types/doctor";
import useGetQuery from "../../queries/public/useGetQuery";
import { GET_ALL_DOCTORS } from "../../api/api";

const Doctors = () => {
  const { data: doctors, isLoading } = useGetQuery({
    api: GET_ALL_DOCTORS,
    queryKey: "doctors",
  });
  const show = doctors?.data["doctors"].map((doctor: doctor, index: number) => {
    return (
      <DoctorCard
        key={index}
        name={doctor.name}
        email={doctor.email}
        phone={doctor.phone}
        department={doctor.doctorDepartment}
        avatar={doctor.docAvatar.url}
        id={doctor._id}
        home={true}
        type="user"
      />
    );
  });
  return (
    <div className="container  center min-h-[50vh]">
      {" "}
      <div
        className={`container  grid gap-[30px] justify-center justify-items-center ${
          isLoading
            ? "grid-cols-1 h-[260px] overflow-hidden md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"
        }`}
      >
        {isLoading
          ? [1, 2, 3].map(() => {
              return (
                <div className="relative mt-[50px] overflow-visible ">
                  {" "}
                  <div className="absolute z-[10] bg-[#bababa] top-[-50px] right-0 rounded-[50%] border border-g dark:border-background border-[9px] h-[100px] w-[100px] overflow-hidden"></div>
                  <Skeleton
                    style={{ borderRadius: "8px" }}
                    width={300}
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
  );
};

export default Doctors;
