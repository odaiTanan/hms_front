import { GET_ALL_DOCTORS } from "../../../api/api";
import DoctorCard from "../../../components/DoctorCard";
import Loading from "../../../components/Loading";
import useGetQuery from "../../../queries/public/useGetQuery";
import { doctor } from "../../../types/doctor";

const DoctorsDash = () => {
  //get doctors
  const { data, isError, isLoading } = useGetQuery({
    api: GET_ALL_DOCTORS,
    queryKey: "doctors",
  });
  if (isError) return "Some thing went wrong";
  const doctors = data?.data.doctors;
  const show = doctors?.map((doctor: doctor) => {
    return (
      <DoctorCard
        name={doctor.name}
        email={doctor.email}
        phone={doctor.phone}
        department={doctor.doctorDepartment}
        avatar={doctor.docAvatar.url}
        id={doctor._id}
        type="dash"
      />
    );
  });
  return (
    <div className="relativd">
      {isLoading ? (
        //pl for sidebar
        <div className="center h-[calc(100vh_-_60px)] pl-[50px] md:pl-[70px]">
          <Loading />
        </div>
      ) : (
        <div className="container  py-8 grid gap-[30px] justify-center justify-items-center grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
          {show}
        </div>
      )}
    </div>
  );
};

export default DoctorsDash;
