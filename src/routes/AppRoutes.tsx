import { Navigate, Route, Routes } from "react-router-dom";

import AboutPage from "@/pages/AboutPage";
import EventsPage from "@/pages/EventsPage";
import GymDetailsPage from "@/pages/GymDetailsPage";
import GymsPage from "@/pages/GymsPage";
import HomePage from "@/pages/HomePage";
import EventDetailsPage from "@/pages/EventDetailsPage";
import LoginPage from "@/pages/LoginPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/:slug" element={<EventDetailsPage />} />
      <Route path="/gyms" element={<GymsPage />} />
      <Route path="/gyms/:slug" element={<GymDetailsPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
