import React from "react";
import { Link } from "react-router-dom";
import EnterBtn from "../../Components/buttons/EnterBtn";

const Hero = () => {
  return (
    <>
      <div className=" z-10 font-primary font-medium text-6xl text-darkgreen">
        Commit, Progress, Achieve.
      </div>
      <div className=" z-10 font-primary text-coolsecondary m-4 text-center text-xl">
        "Unlock your true potential by embracing each step toward greatness.
        <br />
        Stay consistent, believe in yourself, and watch your aspirations turn
        into reality."
      </div>
      <EnterBtn btnLabel="Unlock Your Potential" linkTo={"/dashboard"} />
    </>
  );
};

export default Hero;
