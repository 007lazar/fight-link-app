import { HiMenu } from "react-icons/hi";
import GymList from "./components/GymList";
import { GoSearch } from "react-icons/go";

export default function App() {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm mb-10">
        <div className="navbar-start">
          <button className="btn btn-square btn-ghost">
            <HiMenu size={30} />
          </button>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">FightLink</a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <GoSearch size={20} />
          </button>
        </div>
      </div>

      <div className="item-container flex flex-wrap gap-5 justify-center">
        <GymList />
      </div>
    </>
  );
}
