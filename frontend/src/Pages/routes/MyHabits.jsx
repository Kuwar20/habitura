import React from "react";
import Sidebar from "../../Components/common/Sidebar";
import AddHabit from "../../Components/Habit/AddHabit";
import PageHeading from "../../Components/common/PageHeading";

const MyHabits = () => {
  
  return (
      <div className="h-screen flex flex-col lg:flex-row">
        <Sidebar />
        <div className="p-pagePadding w-full h-full bg-primary bg-opacity-opacityPrimary overflow-y-scroll custom-scrollbar">
          <PageHeading title={"My Habits"} titleClass={"text-habit"}/>

          {/* habits */}
          <div className="w-full">
            <AddHabit />
          </div>
        </div>
      </div>
  );
};

export default MyHabits;
