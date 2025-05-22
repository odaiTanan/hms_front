import { toast } from "react-toastify";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import "../css/dashboard/homedash.css";
import { useEffect, useReducer, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import useUpdateStatus from "../queries/appointment/useUpdateStatus";
import Loading from "../components/Loading";
import useDelete from "../queries/public/useDelete";
import {
  DELETE_APPOINTMENT,
  GET_ALL_APPOINTEMENTS,
  GET_ALL_DOCTORS,
} from "../api/api";
import useGetQuery from "../queries/public/useGetQuery";
import Spinner from "../components/Spinner";
import { demo } from "../DemoErr";
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
const getStatusColor = (status: string) => {
  switch (status) {
    case "Accepted":
      return "bg-green-400";
    case "Rejected":
      return "bg-red-400";
    default:
      return "bg-yellow-400";
  }
};
function reducer(
  state: { cardiology: number; orthopedics: number; pediatrics: number },
  action: { type: string }
) {
  switch (action.type) {
    case "cardiology":
      return { ...state, cardiology: state.cardiology + 1 };
    case "orthopedics":
      return { ...state, orthopedics: state.orthopedics + 1 };
    case "pediatrics":
      return { ...state, pediatrics: state.pediatrics + 1 };
    case "reset":
      return { cardiology: 0, orthopedics: 0, pediatrics: 0 };
    default:
      return state;
  }
}
const HomeDash = () => {
  //get every section appointments count for pie chart
  const [state, dispatch] = useReducer(reducer, {
    cardiology: 0,
    orthopedics: 0,
    pediatrics: 0,
  });
  //get doctors query
  const {
    data: doctors,
    error: e2,
    isLoading: l2,
  } = useGetQuery({ api: GET_ALL_DOCTORS, queryKey: "doctors" });

  //get appointments query
  const {
    data: appointments,
    error: e3,
    isLoading: l3,
  } = useGetQuery({ api: GET_ALL_APPOINTEMENTS, queryKey: "appointments" });
  //delete appointment mutation
  const {
    mutation: deleteMutation,
    error: e4,
    loading: deleteLoading,
    isDeleteSuccess,
  } = useDelete({ api: DELETE_APPOINTMENT, queryKey: "appointments" });
  const { mutation: updateMutation, error: e5 } = useUpdateStatus();
  useEffect(() => {
    if (appointments?.data?.appointments) {
      dispatch({ type: "reset" });
      appointments.data.appointments.forEach((appointment: appointment) => {
        dispatch({ type: appointment.department });
      });
    }
  }, [appointments?.data?.appointments]);
  // cancle buttons to handle delete and loading
  const [deleteLoadingBtn, setDeleteLoadingBtn] = useState<string>("");
  //status select bg depending on option
  const selectContainers = useRef<(HTMLDivElement | null)[]>([]);
  const success = () => {
    toast.success("appointment deleted successfuly");
  };
  useEffect(() => {
    if (isDeleteSuccess) {
      success();
      setDeleteLoadingBtn("");
    }
  }, [isDeleteSuccess]);

  //show any error accord
  const errNotify = () =>
    toast.error(`${e2?.message || e3?.message || e4?.message || e5?.message}`, {
      toastId: "validation-error",
      className: "text-primary dark:bg-gray-800",
    });
  useEffect(() => {
    if (e2?.message || e3?.message || e4?.message || e5?.message) errNotify();
  }, [e2, e3, e4, e5]);
  //display appointments
  const showAppointments = appointments?.data.appointments.map(
    (appointment: appointment, index: number) => {
      return (
        <tr
          className="hover:bg-gray-50 dark:border border-primary transition-colors dark:bg-gray-800 dark:text-gray-100   even:bg-red-100 even:dark:bg-gray-700"
          key={index}
        >
          <td className="p-1 md:p-2 lg:p-4"> {appointment.name}</td>
          <td className="p-1 md:p-2 lg:p-4">{appointment.appointment_date}</td>
          <td className="p-1 md:p-2 lg:p-4">{appointment.doctor.name}</td>
          <td className="p-1 md:p-2 lg:p-4">{appointment.department}</td>
          <td className="p-1 md:p-2 lg:p-4">
            <div
              ref={(element) => {
                selectContainers.current[index] = element;
              }}
              className={`px-2 py-1 w-fit rounded-full ${getStatusColor(
                appointment.status
              )} text-xs dark:text-white text-white`}
            >
              <select
                defaultValue={appointment.status}
                onChange={() => {
                  demo();
                  /*
                  const val = e.target.value;
                  const item = selectContainers.current[index];
                  item!.style.backgroundColor =
                    val == "Accepted" ? "green" : "red";
                  updateMutation.mutate({
                    id: appointment._id,
                    status: e.target.value,
                  });*/
                }}
                className="bg-transparent outline-none"
                name="status"
              >
                <option disabled value="Pending" className="text-yellow-400">
                  Pending
                </option>
                <option disabled value="Accepted" className="text-green-400">
                  Accepted
                </option>
                <option disabled value="Rejected" className="text-red-400">
                  Rejected
                </option>
              </select>
              {/*appointment.status*/}
            </div>
          </td>
          <td className="p-4">
            <div
              className={`px-2 py-1 w-fit rounded-full text-xs ${
                appointment.hasVisited == true
                  ? "bg-green-100 dark:bg-green-400 text-green-800"
                  : "bg-red-100 dark:bg-red-300 text-red-800"
              }`}
            >
              {"" + appointment.hasVisited}
            </div>
          </td>
          <td className="p-4 ">
            {!(deleteLoading && deleteLoadingBtn == appointment._id) ? (
              <button
                key={index}
                onClick={() => {
                  demo();
                  //select deleted element to make spinner loading on it
                  //    setDeleteLoadingBtn(appointment._id);
                  //  deleteMutation.mutate(appointment._id);
                }}
                className="text-[#ff0000]"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            ) : (
              //spinner
              <Spinner />
            )}
          </td>
        </tr>
      );
    }
  );
  //show appointments for small screens
  const showinSmall = appointments?.data.appointments.map(
    (appointment: appointment, index: number) => {
      return (
        <div className="cells-con" key={index}>
          <div className="responsive-cell ">
            {" "}
            <h1>Patient</h1>
            <p className=""> {appointment.name}</p>
          </div>
          <div className="responsive-cell ">
            <h1>Date</h1>
            <p className="">{appointment.appointment_date}</p>
          </div>
          <div className="responsive-cell ">
            {" "}
            <h1>Doctor</h1>
            <p className="">{appointment.doctor.name}</p>
          </div>
          <div className="responsive-cell ">
            {" "}
            <h1>Department</h1>
            <p className="">{appointment.department}</p>
          </div>
          <div className="responsive-cell ">
            {" "}
            <h1>Status</h1>{" "}
            <div
              ref={(element) => {
                selectContainers.current[index] = element;
              }}
              className={`px-[.5px] py-1 w-fit rounded-full ${getStatusColor(
                appointment.status
              )} text-xs dark:text-white text-white`}
            >
              <select
                defaultValue={appointment.status}
                onChange={(e) => {
                  const val = e.target.value;
                  const item = selectContainers.current[index];
                  item!.style.backgroundColor =
                    val == "Accepted" ? "green" : "red";
                  updateMutation.mutate({
                    id: appointment._id,
                    status: e.target.value,
                  });
                }}
                className="bg-transparent outline-none"
                name="status"
              >
                <option value="Pending" className="text-yellow-400" disabled>
                  Pending
                </option>
                <option value="Accepted" className="text-green-400">
                  Accepted
                </option>
                <option value="Rejected" className="text-red-400">
                  Rejected
                </option>
              </select>
              {/*appointment.status*/}
            </div>
          </div>
          <div className="responsive-cell ">
            {" "}
            <h1>Visited Before</h1>{" "}
            <div
              className={`p-1 w-fit rounded-full text-xs ${
                appointment.hasVisited == true
                  ? "bg-green-100 dark:bg-green-400 text-green-800"
                  : "bg-red-100 dark:bg-red-300 text-red-800"
              }`}
            >
              {"" + appointment.hasVisited}
            </div>
          </div>
          <div className="responsive-cell ">
            {" "}
            <h1>Actions</h1>
            <div>
              {!(deleteLoading && deleteLoadingBtn == appointment._id) ? (
                <button
                  key={index}
                  onClick={() => {
                    //select deleted element to make spinner loading on it
                    setDeleteLoadingBtn(appointment._id);
                    deleteMutation.mutate(appointment._id);
                  }}
                  className="text-[#ff0000]"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              ) : (
                //spinner
                <Spinner />
              )}
            </div>
          </div>
        </div>
      );
    }
  );
  return l2 || l3 ? (
    <Loading />
  ) : (
    <div className="w-full">
      <div className="center w-full my-4">
        <div
          className="flex w-full
justify-center 
lg:justify-between
items-center
gap-8
flex-wrap "
        >
          {" "}
          <div
            className="w-[230px]  md:w-[500px] 
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
                    label: "count",
                    data: [
                      doctors?.data?.doctors.length,
                      appointments?.data.appointments?.length,
                    ],
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
h-[220px]
w-[220px]
md:h-[300px]
md:w-[300px]
p-2
"
          >
            {" "}
            <Pie
              data={{
                labels: ["Cardiology", "Orthopedics", "Pediatrics"],
                datasets: [
                  {
                    label: "appointments",
                    data: [
                      state.cardiology,
                      state.orthopedics,
                      state.pediatrics,
                    ],
                    backgroundColor: ["#F7DCB9", "#FF8225", "#B43F3F"],
                    borderColor: ["#F7DCB9", "#FF8225", "#B43F3F"],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-full my-7">
        <table className="w-full hidden md:table bg-white rounded-xl overflow-hidden shadow-md">
          <thead className="bg-primary text-white dark:text-gray-800">
            <tr className="text-left">
              <th className="p-1 md:p-2 lg:p-4">Patient</th>
              <th className="p-1 md:p-2 lg:p-4">Date</th>
              <th className="p-1 md:p-2 lg:p-4">Doctor</th>
              <th className="p-1 md:p-2 lg:p-4">Department</th>
              <th className="p-1 md:p-2 lg:p-4">Status</th>
              <th className="p-1 md:p-2 lg:p-4">Visited Before</th>
              <th className="p-1 md:p-2 lg:p-4">Actions</th>{" "}
            </tr>
          </thead>

          <tbody className="">{showAppointments}</tbody>
        </table>
        <div className="justify-center  justify-items-center grid-cols-[repeat(auto-fill,minmax(220px,1fr))] md:hidden  gap-4 ">
          <h1 className="text-center mt-8 mb-4 text-primary">Appointments</h1>
          {showinSmall}
        </div>{" "}
        <span className="loading loading-spinner text-neutral"></span>
      </div>
    </div>
  );
};

export default HomeDash;
