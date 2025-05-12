import { toast, ToastContainer } from "react-toastify";
import Err404 from "../auth/Err404";
import useAppointmentsQuery from "../queries/useAppointementsQuery";
import useDeleteAppintment from "../queries/useDeleteAppintment";
import useGetDoctorsQuery from "../queries/useGetDoctorsQuery";
import useUserQuery from "../queries/useUserQuey";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  elements,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { CustomCloseButton } from "../toastify/CustomCloseButton";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
type appointment = {
  appointment_date: string;
  department: string;
  dob: string;
  doctor: { name: string };
  doctorId: string;
  email: string;
  gender: string;
  hasVisited: boolean;
  name: string;
  patientId: string;
  phone: string;
  status: string;
  __v: number;
  _id: string;
};
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
type Props = {};

const HomeDash = (props: Props) => {
  //get user query
  const { data: user, error: e1, isLoading: l1 } = useUserQuery();
  //get doctors query
  const { data: doctors, error: e2, isLoading: l2 } = useGetDoctorsQuery();
  //get appointments query
  const {
    data: appointments,
    error: e3,
    isLoading: l3,
  } = useAppointmentsQuery();
  //delete appointment mutation
  const {
    mutation: deleteMutation,
    error: e4,
    loading: l4,
    isDeleteSuccess,
  } = useDeleteAppintment();
  // cancle buttons to handle delete and loading
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  //status select bg depending on option
  const selectContainers = useRef<(HTMLDivElement | null)[]>([]);
  //dilited appointment index
  const [deletedIndex, setDeletedIndex] = useState<number>(0);
  //delete cancle button from array and set the new one to display block
  useEffect(() => {
    if (isDeleteSuccess) {
      buttonsRef.current.splice(deletedIndex, 1);
      if (buttonsRef.current[deletedIndex]) {
        buttonsRef.current[deletedIndex].style.display = "block";
      }
    }
  }, [isDeleteSuccess]);
  //show any error accord
  const errNotify = () =>
    toast.error(`${e1?.message || e2?.message || e3?.message || e4?.message}`, {
      toastId: "validation-error",
      className: "text-primary dark:bg-gray-800",
    });
  //display appointments
  const showAppointments = appointments?.data.appointments.map(
    (appointment: appointment, index: number) => {
      return (
        <tr
          className="hover:bg-gray-50 dark:border border-primary transition-colors dark:bg-gray-800 dark:text-gray-100   even:bg-red-100 even:dark:bg-gray-700"
          key={index}
        >
          <td className="p-4"> {appointment.name}</td>
          <td className="p-4">{appointment.appointment_date}</td>
          <td className="p-4">{appointment.doctor.name}</td>
          <td className="p-4">{appointment.department}</td>
          <td className="p-4">
            <div
              ref={(element) => {
                selectContainers.current[index] = element;
              }}
              className="px-2 py-1 w-fit rounded-full bg-yellow-400 text-xs dark:text-white text-white"
            >
              <select
                onChange={(e) => {
                  const val = e.target.value;
                  const item = selectContainers.current[index];
                  item!.style.backgroundColor =
                    val == "Accepted" ? "green" : "red";
                }}
                className="bg-transparent outline-none"
                name="status"
              >
                <option
                  onClick={() =>
                    (selectContainers.current[index]!.style.backgroundColor =
                      "yellow")
                  }
                  value="Pending"
                  className="text-yellow-400"
                  disabled
                  selected
                >
                  Pending
                </option>
                <option
                  onClick={() =>
                    (selectContainers.current[index]!.style.backgroundColor =
                      "green")
                  }
                  value="Accepted"
                  className="text-green-400"
                >
                  Accepted
                </option>
                <option
                  onClick={() =>
                    (selectContainers.current[index]!.style.backgroundColor =
                      "red")
                  }
                  value="Rejected"
                  className="text-red-400"
                >
                  Rejected
                </option>
              </select>
              {/*appointment.status*/}
            </div>
          </td>
          <td className="p-4">
            <div className="px-2 py-1 w-fit rounded-full text-xs dark:text-white bg-green-100 dark:bg-green-400 text-green-800">
              {"" + appointment.hasVisited}
            </div>
          </td>
          <td className="p-4 ">
            <button
              key={index}
              ref={(element) => {
                buttonsRef.current[index] = element;
              }}
              onClick={() => {
                // Hide the clicked button by setting its display to 'none'
                const button = buttonsRef.current[index];
                if (button) {
                  button.style.display = "none";
                  deleteMutation.mutate(appointment._id);
                  setDeletedIndex(index);
                }
              }}
              className="text-[#ff0000]"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <div
              role="status"
              className={`${
                buttonsRef.current[index]?.style.display == "none"
                  ? "block"
                  : "hidden"
              }`}
            >
              <svg
                aria-hidden="true"
                className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          </td>
        </tr>
      );
    }
  );
  return l1 || l2 || l3 ? (
    "loading"
  ) : (
    <div>
      <div className="center my-4">
        <div
          className="flex
justify-center 
md:justify-between
items-center
gap-8
flex-wrap w-[90%]"
        >
          {" "}
          <div
            className="w-[300px]  md:w-[500px] 
h-[240px] 
bg-primary dark:bg-[#183B4E]
rounded-xl 
shadow-lg 
p-4
transition-all 
duration-300
hover:shadow-xl
border 

border-[#022f34]"
          >
            <Bar
              data={{
                labels: ["doctors", "appointements"],
                datasets: [
                  {
                    label: "statistics",
                    data: [doctors?.data?.doctors.length, 59],
                    backgroundColor: ["#DDA853", "#27548A"],
                    borderColor: ["rgb(120, 52, 75)", "rgb(0, 0, 64)"],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    labels: {
                      color: "white",
                    },
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      color: "#F3F3E0",
                    },
                    grid: {
                      color: "#F3F3E0",
                    },
                  },
                  y: {
                    ticks: {
                      color: "#F3F3E0",
                    },
                    grid: {
                      color: "#F3F3E0",
                    },
                  },
                },
              }}
            />
          </div>
          <div
            className="
transition-all 
duration-300
h-[300px]
w-[300px]
p-2
"
          >
            {" "}
            <Pie
              data={{
                labels: ["cardeo", "Blue", "Yellow", "Green"],
                datasets: [
                  {
                    label: "appointments",
                    data: [12, 19, 3, 5],
                    backgroundColor: [
                      "#F7DCB9",
                      "#FF8225",
                      "#B43F3F",
                      "#173B45",
                    ],
                    borderColor: ["#F7DCB9", "#FF8225", "#B43F3F", "#173B45"],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-full my-7">
        <table className="w-full bg-white rounded-xl overflow-hidden shadow-md">
          <thead className="bg-primary text-white dark:text-gray-800">
            <tr className="text-left">
              <th className="p-4">Patient</th>
              <th className="p-4">Date</th>
              <th className="p-4">Doctor</th>
              <th className="p-4">Department</th>
              <th className="p-4">Status</th>
              <th className="p-4">Visited Before</th>
              <th className="p-4">Actions</th>{" "}
            </tr>
          </thead>

          <tbody className="">{showAppointments}</tbody>
        </table>
      </div>{" "}
      <ToastContainer closeButton={CustomCloseButton} />
      <span className="loading loading-spinner text-neutral"></span>
    </div>
  );
};

export default HomeDash;
