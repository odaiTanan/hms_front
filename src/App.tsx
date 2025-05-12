import { Route, Routes } from "react-router-dom";
import Home from "./site/Home";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Err404 from "./auth/Err404";
import "./css/auth/form.css";
import "./css/dashboard/sidebar.css";
import "./css/components/footer.css";
import "./css/components/departmentcard.css";
import "./css/dark.css";
import Appointment from "./site/Appointment";
import Site from "./site/Site";
import SingleDoctor from "./site/SingleDoctor";
import Dashboard from "./Dashboard/Dashboard";
import DoctorsDash from "./Dashboard/pages/doctor/DoctorsDash";
import AddDoctor from "./Dashboard/pages/doctor/AddDoctor";
import Messages from "./Dashboard/pages/messages/Messages";
import HomeDash from "./Dashboard/HomeDash";
function App() {
  return (
    <div className="bg-[#eeeeee] dark:bg-background">
      <Routes>
        <Route element={<Site />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myappointment" element={<Appointment />} />
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
      </Routes>
    </div>
  );
}

export default App;
