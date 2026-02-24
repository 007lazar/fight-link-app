import { Link } from "react-router-dom";
import Card3d from "./Card3d";

const Hero = () => {
  return (
    <div className="hero rounded-2xl bg-transparent">
      <div className="hero-content w-full flex-col lg:flex-row justify-between">
        <div className=" card-3d">
            <Card3d/>
        </div>
        <div>
          <h1 className="text-5xl font-bold text-white">Welcome to Fight Link!</h1>
          <p className="py-6 text-white">
            “Discover Martial Arts Events & Gyms in Serbia”
          </p>
          <div className="flex justify-evenly">
            <Link to="/gyms" ><button className="btn btn-neutral">Explore Gyms</button></Link>
            <Link to="/events" ><button className="btn btn-neutral">View Events</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
