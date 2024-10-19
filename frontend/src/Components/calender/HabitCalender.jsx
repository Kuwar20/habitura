// HabitCalendar.js
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const HabitCalendar = ({ completionDates }) => {
  const events = completionDates.map((date) => ({
    start: new Date(date),
    end: new Date(date),
  }));

  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: "green",
      border: "1px solid gray",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      fontSize: "20px", // Update for font size
      color: "white", // Keep text color for better contrast
    };
    return {
      style,
    };
  };

  return (
    <div className="p-6 bg-[#b9e1cb] bg-opacity-40 rounded-lg shadow-lg h-full md:h-3/4 w-full">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month"]}
        popup
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default HabitCalendar;
