import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import { useLocation } from "react-router-dom";
import videobg from "../../assets/5490419-hd_1920_1080_25fps.mp4";

const Home = () => {
  const location = useLocation();

  // Determine whether to show Navbar based on the current route
  const showNavbar =
    location.pathname !== "/signup" && location.pathname !== "/login";
  return (
    <div className="h-screen">
      {/* bg-video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0 blur-sm"
      >
        <source src={videobg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="flex justify-between items-center px-homepagePadding h-[10%]">
        {showNavbar && <Navbar />}
      </div>
      <div className=" flex flex-col justify-center items-center p-5 mt-2 h-[90%] overflow-hidden">
        <Hero />
      </div>
    </div>
  );
};

export default Home;
