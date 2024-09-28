import React from "react";
import { Link } from "react-scroll";

const NavButton = ({ buttonLabel, target }) => {
  return (
    <Link
      to={target}
      smooth={true}
      duration={500}
      className="relative group flex items-center cursor-pointer"
    >
      <button class="relative py-1 inline cursor-pointer text-base text-darkgreen font-semibold before:bg-secondary hover:rounded-b-none before:absolute before:-bottom-0 before:-left-0  before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
        {buttonLabel}
      </button>
    </Link>
  );
};

export default NavButton;
