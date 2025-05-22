import { Route, Routes } from "react-router-dom";
import Home from "./site/pages/Home";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Err404 from "./auth/Err404";
import "./css/auth/form.css";
import "./css/dashboard/sidebar.css";
import "./css/components/footer.css";
import "./css/components/departmentcard.css";
import "./css/dark.css";
import Site from "./site/Site";
import SingleDoctor from "./site/pages/SingleDoctor";
import Dashboard from "./Dashboard/Dashboard";
import DoctorsDash from "./Dashboard/pages/doctor/DoctorsDash";
import AddDoctor from "./Dashboard/pages/doctor/AddDoctor";
import Messages from "./Dashboard/pages/messages/Messages";
import HomeDash from "./Dashboard/HomeDash";
import AllDoctors from "./site/pages/AllDoctors";
import Err403 from "./auth/Err403";
import PreventAuthanticatedBack from "./auth/PreventAuthanticatedBack";
import MyAppointments from "./site/pages/MyAppointments";
import AdminLogin from "./auth/AdminLogin";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className=" dark:bg-background">
      <Routes>
        {" "}
        <Route element={<PreventAuthanticatedBack role="a" />}>
          <Route path="/adminlogin" element={<AdminLogin />} />
        </Route>
        <Route element={<Site />}>
          <Route path="/" element={<Home />} />
          <Route element={<PreventAuthanticatedBack role="p" />}>
            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/403" element={<Err403 />} />
          <Route path="/alldoctors" element={<AllDoctors />} />
          <Route path="/myappointments" element={<MyAppointments />} />
          <Route path="/alldoctors/:department" element={<AllDoctors />} />
          <Route path="/doctor/:id" element={<SingleDoctor />} />
        </Route>
        {/*Protected Routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<HomeDash />} />
          <Route path="doctors" element={<DoctorsDash />} />
          <Route path="adddoctor" element={<AddDoctor />} />
          <Route path="messages" element={<Messages />} />
        </Route>
        <Route path="*" element={<Err404 />} />
      </Routes>{" "}
      <ToastContainer />
    </div>
  );
}

export default App;
