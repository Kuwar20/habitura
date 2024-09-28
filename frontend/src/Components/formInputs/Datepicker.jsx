import React from "react";
import DatePicker from "react-datepicker";
import { AiOutlineCalendar } from "react-icons/ai"; // Import the calendar icon
import "react-datepicker/dist/react-datepicker.css";

const Datepicker = ({ selectedDate, onChange, dateLabel, title }) => {
  return (
    <div className="flex flex-col justify-around items-center" title={title}>
      <label htmlFor="" className="text-[8px] text-[#1c7082]">{dateLabel}</label> 
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        customInput={
          <button className="flex items-center bg-habit text-white rounded-md hover:bg-[#1c7082] transition-colors duration-300">
            <AiOutlineCalendar className="text-3xl" />
          </button>
        }
      />
    </div>
  );
};

export default Datepicker;
