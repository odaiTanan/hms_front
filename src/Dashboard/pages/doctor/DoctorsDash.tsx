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
        <Loading clasN="left-[calc(50%_+_28px)] md:left-[calc(50%_+_48px)]" />
      ) : (
        <div className="container  py-8 grid gap-[30px] justify-center justify-items-center grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
          {show}
        </div>
      )}
    </div>
  );
};

export default DoctorsDash;
