import React from "react";
import SecBtn from "../../Components/buttons/SecBtn";
import Heading from "../../Components/common/Heading";

const Aboutus = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 py-16 space-y-5 bg-gray-100 ">
      {/* Heading */}
      <Heading title={"About Us"}/>

      {/* quote */}
      <div className="w-full p-6 flex flex-col justify-center items-center text-center">
        <p className="text-2xl font-normal text-paragraph mx-48 italic">
          “From documenting our habit-building journey on YouTube to creating a
          comprehensive platform for tracking your progress, Habitura is
          here to help you transform your daily routines into lasting success.”{" "}
        </p>
      </div>

      <SecBtn buttonLabel={"Know More"} />
    </div>
  );
};

export default Aboutus;
