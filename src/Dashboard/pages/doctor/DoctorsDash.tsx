import DoctorCard from "../../../components/DoctorCard";
import useGetDoctorsQuery from "../../../queries/useGetDoctorsQuery";
import { doctor } from "../../../types/doctor";

const DoctorsDash = () => {
  //get doctors
  const { data, isError, isLoading } = useGetDoctorsQuery();
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
      />
    );
  });
  return (
    <div className="container  py-8 grid gap-[30px] justify-items-center grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
      {show}
    </div>
  );
};

export default DoctorsDash;
