import React, { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { LuArrowUpFromDot } from "react-icons/lu";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 500,
      smooth: true,
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className=" h-16 w-16 p-5 drop-shadow-md rounded-full flex justify-center items-center text-3xl bg-coolsecondary text-darkgreen transition duration-300 ease-in-out hover:scale-105 "
        >
          <LuArrowUpFromDot />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
