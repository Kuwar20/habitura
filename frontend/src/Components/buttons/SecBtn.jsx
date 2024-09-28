import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const SecBtn = ({ buttonLabel, linkTo }) => {
  return (
    <Link
      to={linkTo}
      className="relative inline-flex items-center justify-center px-20 font-primary py-2 overflow-hidden font-medium tracking-tighter text-primary bg-secondary rounded-lg group hover:text-secondary"
    >
      <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-primary rounded-full group-hover:w-72 group-hover:h-56"></span>
      <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-100"></span>

      {/* Text before hover */}
      <span className="relative text-xl transition-opacity duration-300 group-hover:opacity-0">
        {buttonLabel}
      </span>

      {/* Arrow after hover */}
      <span className="absolute inset-0 flex justify-center items-center text-4xl font-semibold opacity-0 transition-all duration-300 translate-x-[-90px] group-hover:opacity-100 group-hover:translate-x-[0px]">
  <FaArrowRightLong />
</span>

    </Link>
  );
};

export default SecBtn;
