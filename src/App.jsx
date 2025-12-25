import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import UpcomingBirthday from "./components/UpcomingBirthday";
import ProtectedRoutes from "./protectedPath/protectedRoutes ";
import AllMemberPage from "./pages/AllMemberPage";

export default function App() {
  return (
    <>

        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/home"
            element={<ProtectedRoutes page={<HomePage />} />}
          />
          <Route
            path="/upcoming"
            element={<ProtectedRoutes page={<UpcomingBirthday />} />}
          />
          <Route
            path="/member"
            element={<ProtectedRoutes page={<AllMemberPage />} />}
          />
        </Routes>

    </>
  );
}
