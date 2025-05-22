import { useState } from "react";
import Title from "../../components/Title";
import "../../css/site/single.css";
import useGetDocById from "../../queries/doctor/useGetDocById";
import { useParams } from "react-router-dom";
import useGetAvailableHours from "../../queries/appointment/useGetAvailableHours";
import Appointment from "../sections/Appointment";

type times = {
  day: string;
  dayNum: number;
  month: number;
  year: number;
  formated: string;
};

const SingleDoctor = () => {
  //doctor id
  const id = useParams()?.id;
  //get doctor selected
  const { data: doctor, isLoading: l_docotr } = useGetDocById({ id });
  //full work hours
  const hour: number[] = [2, 3, 4, 5, 6, 7, 8];
  const dates: times[] = [];
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHours, setSelectedHours] = useState("");
  const { data: availableHours, isLoading: l_available } = useGetAvailableHours(
    {
      date: selectedDate,
      doctorId: id,
    }
  );

  console.log(availableHours);

  //get next coming 7 days to choose time on on of them
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    dates.push({
      day: date.toLocaleDateString("en-US", { weekday: "long" }).slice(0, 3),
      dayNum: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      formated: `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`,
    });
  }

  const showDays = dates.map((day) => {
    return (
      <div
        onClick={() => setSelectedDate(day.formated)}
        className={` flex justify-center items-center w-[90px] h-[90px] transition duration-[.2s] hover:bg-primary cursor-pointer flex-col justify-center items-center gap-4 rounded-[50%] ${
          day.formated == selectedDate
            ? "bg-primary text-white"
            : " bg-gray-400 dark:bg-gray-800 dark:hover:bg-primary text-gray-100"
        } `}
      >
        <div className="center font-bold">{day.day}</div>
        <div>{day.dayNum + "-" + day.month}</div>
      </div>
    );
  });
  //show available hours
  const showHours = availableHours?.data["availableSlots"].map(
    (h: string, index: number) => {
      return (
        <div
          onClick={() => setSelectedHours(h)}
          className={`hours ${
            h == selectedHours
              ? "bg-primary text-white"
              : " bg-gray-400 dark:bg-gray-800 dark:hover:bg-primary text-gray-100"
          }`}
          key={index}
        >
          {h + "PM"}
        </div>
      );
    }
  );
  //available hours for doctor
  const [avilable, setAvailable] = useState([]);
  return (
    <div className=" bg-g dark:bg-background w-full center">
      <div className="min-h-[calc(100vh_-_130px)] container ">
        <div className="grid py-9 mt-[40px] gap-3  justify-items-center grid-cols-1 md:grid-cols-2">
          <div className="w-[300px] rounded-xl bg-skin border border-2 border-yellow-800 dark:border-gray-400 dark:bg-primary h-[300px] ">
            <img
              src={doctor?.data.doctor.docAvatar.url}
              alt="docImg"
              className="object-cover rounded-xl h-full w-full"
            />
          </div>
          <div className="flex min-w-[300px] flex-col rounded-xl border border-2 dark:border-gray-400 p-4 border-black justify-evenly items-start w-[300px] md:w-auto h-auto md:h-[300px]">
            {" "}
            <h1 className="font-bold text-lg text-primary">
              Dr. {doctor?.data.doctor.name}
            </h1>
            <span className="text-gray-600 dark:text-gray-400">
              {doctor?.data.doctor.doctorDepartment}{" "}
            </span>
            <div className="flex gap-2">
              <div className="font-bold text-gray-900 dark:text-tcolor">
                email:
              </div>
              <div className=" text-gray-800 dark:text-tcolor">
                {doctor?.data.doctor.email}
              </div>
            </div>
            <div className="flex gap-2 text-gray-800 dark:text-tcolor">
              <div className="font-bold text-gray-800 dark:text-tcolor">
                phone:
              </div>
              <div className=" text-gray-800 dark:text-tcolor">
                {doctor?.data.doctor.phone}
              </div>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              doctor {doctor?.data.doctor.name} is a specialist in{" "}
              {doctor?.data.doctor.doctorDepartment} deases , you can choose a
              day bellow to get available hours in the day
            </p>
            <div className="flex gap-2">
              <div className="font-bold text-primary">fees:</div>
              <span>20$</span>
            </div>
          </div>
        </div>
        <Title title="choose a day" />
        <div className="  mt-5 center flex-wrap gap-[30px]  pb-[60px]">
          {showDays}
        </div>
        {availableHours?.data.availableSlots && (
          <h1 className=" flex font-bold text-primary text-[20px]">
            available hours:{" "}
            <div className="text-gray-500 dark:text-tcolor font-normal ml-2">
              {" (choose one)"}
            </div>
          </h1>
        )}
        <div className="  mt-5 center flex-wrap gap-[30px]  pb-[60px]">
          {availableHours?.data.availableSlots.length == 0
            ? "No available time in this day"
            : showHours}
        </div>
        {selectedDate && selectedHours && (
          <Appointment
            date={selectedDate + "-" + selectedHours}
            department={doctor?.data.doctor.doctorDepartment}
            doctorName={doctor?.data.doctor.name}
          />
        )}
      </div>
    </div>
  );
};

export default SingleDoctor;
