import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { Toaster } from 'react-hot-toast';
import "quill/dist/quill.snow.css";

import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import UserLogin from "./components/userLogin/UserLogin";

import RecruiterLogin from "./components/recruiterLogin/RecruiterLogin";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import ManageJobs from "./pages/ManageJobs";
import ViewApplications from "./pages/ViewApplications";

import { AppContext } from "./context/AppContext";

function App() {

  const { showRecruiterLogin, companyToken, showUserLogin } = useContext(AppContext)

  const ProtectedRoute = ({ token, children }) => {
    if (!token) {
      return <Navigate to="/" replace />  // redirect if no token
    }
    return children
  };

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      {showUserLogin && <UserLogin />}
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Applications />} />

        <Route path="/dashboard"
          element={
            <ProtectedRoute token={companyToken}>
              <Dashboard />
            </ProtectedRoute>}>
          <Route path="add-job" element={<AddJob />} />
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="view-applications" element={<ViewApplications />} />
        </Route>

      </Routes>
    </div>
  )
};

export default App;