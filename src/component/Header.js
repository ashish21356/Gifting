import { useState } from "react";
import { LOGO_URL } from "../../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../../utils/useOnlineStatus";

const Header = () => {
  const [authBtn, setAuthBtn] = useState("Login");
  const UserStatus = useOnlineStatus();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center py-2 px-6">
        {/* Logo Section */}
        <Link to="/">
          <img className="w-20 cursor-pointer" src={LOGO_URL} alt="logo" />
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="flex items-center space-x-6 text-lg font-medium text-gray-700">
            <li className="flex items-center space-x-2">
              <span>{UserStatus ? "Online" : "Offline"}</span>
              <div
                className={`h-2 w-2 rounded-full ${
                  UserStatus ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
            </li>
            <li>
              <Link to="/" className="hover:text-purple-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-purple-600 transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/aboutus" className="hover:text-purple-600 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/Grocery" className="hover:text-purple-600 transition">
                Grocery
              </Link>
            </li>
          </ul>
        </nav>

        {/* Authentication Button */}
        <button
          className="px-5 py-2 text-white bg-purple-500 hover:bg-purple-600 rounded-full transition-all duration-300 shadow-md"
          onClick={() => setAuthBtn(authBtn === "Logout" ? "Login" : "Logout")}
        >
          {authBtn}
        </button>
      </div>
    </header>
  );
};

export default Header;
