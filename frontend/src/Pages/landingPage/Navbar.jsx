import React, { useEffect, useState } from "react";
import Logowomen from "../../assets/HabituraCropLogo.png";
import NavButton from "../../Components/buttons/NavButton";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import OutsideClickHandler from "react-outside-click-handler";
import { makeAuthenticatedGETRequest } from "../../utils/serverHelpers";

const Navbar = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [showMenu, setShowMenu] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const logout = () => {
    removeCookie("token", { path: "/" });
  };

    // Fetch current profile data
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const response = await makeAuthenticatedGETRequest(
            "/updateUser/getProfile"
          );
          setProfilePicture(response.profilePicture);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
  
      fetchProfile();
    }, []);

  return (
    <>
      {/* Logo */}
      <div className="flex justify-center items-center cursor-pointer z-10 space-x-2">
        <img
          src={Logowomen}
          alt="Habitura Logo"
          height={70}
          width={70}
          className="rounded-full"
        />
        <div className="font-logo text-darkgreen font-semibold text-4xl z-10 mt-3">
          Habitura
        </div>
      </div>

      {/* nav links */}
      <div className=" space-x-6 flex justify-center items-center">
        <NavButton buttonLabel={"Home"} target={"home"} />
        <NavButton buttonLabel={"About Us"} target={"aboutus"} />
        <NavButton buttonLabel={"Features"} target={"features"} />
        <NavButton buttonLabel={"How It works"} target={"howitworks"} />
        <NavButton buttonLabel={"Success Stories"} target={"testimonials"} />
        <NavButton buttonLabel={"Personal Progress"} target={"videos"} />
        <NavButton buttonLabel={"Subscription"} target={"subscription"} />
        <NavButton buttonLabel={"FAQs"} target={"faqs"} />
      </div>

      {/* logins */}
      <div className="flex items-center space-x-4 cursor-pointer z-10">
        {cookie.token ? (
          <>
            {/* Profile */}
            <OutsideClickHandler
              onOutsideClick={(e) => {
                setShowMenu(false);
                e.stopPropagation();
              }}
            >
              <div className="relative" onClick={toggleMenu}>
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="rounded-full h-12 w-12"
                />

                {/* Profile Menu */}
                {showMenu && (
                  <div className="absolute top-16 right-0 flex flex-col bg-coolsecondary bg-opacity-90 rounded-lg shadow-lg font-medium text-white w-48">
                    <Link to="/my-profile">
                    <button className="p-3 w-full text-left hover:bg-gray-300 hover:text-coolsecondary transition-colors duration-300 rounded-t-lg">
                      My Profile
                    </button>
                    </Link>
                    <button
                      className="p-3 w-full bg-red-400 hover:bg-red-600 text-left transition-colors duration-300 rounded-b-lg"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </OutsideClickHandler>
          </>
        ) : (
          <>
            <Link to="/signup">
              <div className="font-primary text-lg text-primary bg-secondary px-3 py-2 rounded-full shadow-md transition duration-300 ease-in-out hover:scale-105">
                Signup
              </div>
            </Link>
            <Link to="/login">
              <div className="font-primary text-lg text-secondary hover:text-darkgreen">
                Login
              </div>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
