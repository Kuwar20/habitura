import React from "react";
import Sidebar from "../../Components/common/Sidebar";
import DailyTasks from "../../Components/dailyTasks/DailyTasks";
import DailyProgress from "../../Components/trackingProgress/DailyProgress";
import MyNote from "../../Components/notes/MyNote";

const Dashboard = () => {
  return (
    <div className="h-screen flex">
      <Sidebar />

      <div className="w-full grid grid-cols-2 gap-3 max-h-full bg-primary bg-opacity-50 p-pagePadding">
        {/* Habit Section - left */}
        <div className="flex-1 bg-white p-5 shadow-md rounded-md overflow-y-auto custom-scrollbar">
            <DailyTasks />
        </div>

        {/* Stats - right */}
        <div className="grid grid-rows-3 gap-3">
          {/* Bar graph daily status */}
          <div className="bg-cyan-50 max-h-full rounded-md shadow-md p-2">
            <DailyProgress />
          </div>

          {/* My notes */}
          <div className="row-span-2 max-h-full rounded-md shadow-md ">
            <MyNote/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
