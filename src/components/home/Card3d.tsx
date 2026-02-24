import logo from "@/assets/Fight Link-logo/default.png";

const Card3d = () => {
  return (
    <div className="hover-3d">
      {/* content */}
      <figure className="max-w-100 rounded-2xl">
        <img
          src={logo}
          alt="3D card"
        />
      </figure>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Card3d;
