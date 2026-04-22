import mainLogo from "../../assets/main-icon.png";
import { FaSearch } from "react-icons/fa";
import map from "../../assets/pin.gif";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const location = "Kolkata";
  const loading = false;

  return (
    <div className="w-full text-sm bg-white">

      {/* Top Navbar */}
      <div className="px-4 md:px-8">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center py-3">

          {/* Left */}
          <div className="flex items-center space-x-4">

            <img
              onClick={() => navigate("/")}
              src={mainLogo}
              alt="logo"
              className="h-8 cursor-pointer"
            />

            <div className="relative">
              <input
                type="text"
                placeholder="Search for Movies, Events, Plays, Sports and Activities"
                className="border border-gray-300 rounded px-4 py-1.5 w-[400px] outline-none"
              />
              <FaSearch className="absolute right-2 top-2.5 text-gray-500" />
            </div>

          </div>

          {/* Right */}
          <div className="flex items-center space-x-6">

            {/* Location */}
            <div className="cursor-pointer">
              {loading ? (
                <img src={map} className="w-8 h-8" />
              ) : (
                <p>{location} ▼</p>
              )}
            </div>

            {/* Sign in Button */}
            <button
              onClick={() => navigate("/signup")}
              className="bg-[#f84464] text-white px-4 py-1.5 rounded"
            >
              Sign in
            </button>

          </div>

        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="bg-[#f2f2f2] px-4 md:px-8">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center py-2">

          <div className="flex space-x-6 font-medium">
            <span onClick={() => navigate("/movies")} className="cursor-pointer">Movies</span>
            <span className="cursor-pointer">Stream</span>
            <span className="cursor-pointer">Events</span>
            <span className="cursor-pointer">Plays</span>
            <span className="cursor-pointer">Sports</span>
            <span className="cursor-pointer">Activities</span>
          </div>

          <div className="flex space-x-6 text-sm">
            <span>ListYourShow</span>
            <span>Corporates</span>
            <span>Offers</span>
            <span>Gift Cards</span>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Header;