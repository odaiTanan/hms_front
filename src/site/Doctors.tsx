import DoctorCard from "../components/DoctorCard";
import Title from "../components/Title";
import useGetDoctorsQuery from "../queries/useGetDoctorsQuery";
import { doctor } from "../types/doctor";

type Props = {};

const Doctors = (props: Props) => {
  const { data: doctors, isLoading } = useGetDoctorsQuery();
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
      />
    );
  });
  return (
    <div className="w-full  center ">
      {" "}
      <div className="container  py-8 grid gap-[30px] justify-items-center grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {show}
      </div>
    </div>
  );
};

export default Doctors;
