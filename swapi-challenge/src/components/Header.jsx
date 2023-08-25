import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between items-center w-full bg-green-500 p-5 drop-shadow-lg h-1/6 text-3xl">
      <Link to="/" className="font-bold uppercase text-white">
        vehicles
      </Link>
      <Link to="/starships" className="font-bold uppercase text-white">
        starships
      </Link>
    </div>
  );
};

export default Header;
