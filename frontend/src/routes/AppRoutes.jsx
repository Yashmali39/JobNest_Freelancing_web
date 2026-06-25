import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/public/LandingPage";

import Login from "../pages/auth/Login";

import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";

import ProtectedRoute from "../components/common/ProtectedRoute"

import ChooseProfileType from "../pages/auth/ChooseProfileType";

import RoleGuard from "../components/common/RoleGuard";

import CreateFreelancerProfile from "../pages/freelancer/CreateFreelancerProfile";

import CreateClientProfile from "../pages/client/CreateClientProfile";

import MainLayout from "../layouts/MainLayout";

import MyApplications from "../pages/applications/MyApplications";

import Jobs from "../pages/jobs/Jobs";

import Profile from "../pages/profile/Profile";

import EditFreelancerProfile from "../pages/profile/EditFreelancerProfile";

import EditClientProfile from "../pages/profile/EditClientProfile";

import CreateJob from "../pages/jobs/CreateJob";

import UpdateJob from "../pages/jobs/UpdateJob";

import JobDetails from "../pages/jobs/JobDetails";

import JobApplications from "../pages/applications/JobApplications";

import FreelancerDetails from "../pages/freelancer/FreelancerDetails";

import LandingPage from "../pages/public/LandingPage";

import FreelancerDirectory from "../pages/freelancer/FreelancerDirectory";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route

          path="/"
          element={
            <ProtectedRoute>
              <RoleGuard>
                <Home />
              </RoleGuard>
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/choose-profile"
          element={<ChooseProfileType />}
        />

        <Route
          path="/freelancer/create-profile"
          element={
            <ProtectedRoute>
              <CreateFreelancerProfile />
            </ProtectedRoute>
          }
        />


        <Route
          path="/client/create-profile"
          element={
            <ProtectedRoute>
              <CreateClientProfile />
            </ProtectedRoute>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <RoleGuard>
                <MainLayout />
              </RoleGuard>
            </ProtectedRoute>
          }
        >



          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/jobs"
            element={<Jobs />}
          />

          <Route
            path="/applications"
            element={
              <MyApplications />
            }
          />

          <Route
            path="/jobs/:jobId/applications"
            element={
              <JobApplications />
            }
          />

          

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/profile/edit-freelancer"
            element={
              <EditFreelancerProfile />
            }
          />

          <Route
            path="/profile/edit-client"
            element={
              <EditClientProfile />
            }
          />

          <Route
            path="/jobs/create"
            element={
              <CreateJob />
            }
          />

          <Route
            path="/freelancers"
            element={
              <FreelancerDirectory />
            }
          />

          <Route
            path="/jobs/edit/:id"
            element={<UpdateJob />}
          />

          <Route
            path="/jobs/:id"
            element={<JobDetails />}
          />
          <Route
            path="/freelancers/:id"
            element={
              <FreelancerDetails />
            }
          />

        </Route>





      </Routes>
    </BrowserRouter >
  );
}

export default AppRoutes;