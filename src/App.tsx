import Card3d from "./components/home/Card3d";

import logo from "@/assets/Fight Link-logo/octagon-transperent-logo.png";
import { HiMenu } from "react-icons/hi";
import { GoSearch } from "react-icons/go";

import { Link, Route, Routes } from "react-router-dom";
import GymsPage from "./pages/GymsPage";

export default function App() {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm mb-10">
        <div className="navbar-start">
          <button className="btn btn-square btn-ghost">
            <HiMenu size={30} />
          </button>
        </div>
        <div className="navbar-center gap-4">
          <Link to="/gyms">
            <button className="btn btn-link btn-ghost font-bold">Gyms</button>
          </Link>
          <Link className="text-xl" to="/">
            <img src={logo} className="w-40" alt="Logo" />
          </Link>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <GoSearch size={20} />
          </button>
        </div>
      </div>

      <div className="item-container flex flex-wrap gap-5 justify-center">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Card3d />
              </>
            }
          />
          <Route path="/gyms" element={<GymsPage />} />
        </Routes>
      </div>
    </>
  );
}
