import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { BsInfoLg } from "react-icons/bs";
import UpdateHabit from "./UpdateHabit";
import { Link } from "react-router-dom";

const HabitCard = ({ habitDetails, deleteHabit, getMyHabits }) => {
  const [isUpdating, setIsUpadting] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("default", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // calculate days difference
  const calculateDateDifference = (startDate, endDate) => {
    const diffTime = Math.abs(new Date(endDate) - new Date(startDate));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const hasDates = habitDetails.startDate && habitDetails.endDate;
  const isOngoing = habitDetails.startDate && !habitDetails.endDate;

  // Delete
  const handleDelete = () => {
    deleteHabit(habitDetails._id);
  };

  // Update
  const handleUpdate = () => {
    setIsUpadting(true);
    setIsPopUp(true);
  };

  // Challenge completion
  const challenge = () => {
    const completedDays = habitDetails.completionDates.length;
    const totalDays = calculateDateDifference(
      habitDetails.startDate,
      habitDetails.endDate
    );

    // Edge case: prevent division by zero if totalDays is 0
    if (totalDays === 0) return "Invalid date range";

    if (completedDays === totalDays) {
      return "🏆 Challenge completed";
    }

    if (completedDays < totalDays) {
      // Return the fraction of completed days
      return `🎯 ${completedDays} / ${totalDays} Days Challenge`;
    }
  };

  // Streak Track
  const streakTracking = () => {
    const streakDateHistory = habitDetails.completionDates || [];
    let currentStreak = 0;
    let maxStreak = 0;

    if (streakDateHistory.length === 0) {
      return "🌱 Let's grow!";
    }

    for (let i = 0; i < streakDateHistory.length; i++) {
      if (i === 0) {
        currentStreak = 1;
      } else {
        const previousDate = new Date(streakDateHistory[i - 1]).setHours(
          0,
          0,
          0,
          0
        );
        const currentDate = new Date(streakDateHistory[i]).setHours(0, 0, 0, 0);

        // Calculate difference in days
        const dayDifference =
          (currentDate - previousDate) / (1000 * 60 * 60 * 24);

        if (dayDifference === 1) {
          currentStreak++;
        } else {
          currentStreak = 1;
        }
      }
      maxStreak = Math.max(currentStreak, maxStreak);
    }

    return maxStreak === 1 ? "🔥 1 Day Streak" : `🔥 ${maxStreak} Days Streak`;
  };

  useEffect(() => {
    console.log("Re-render on keydown");
    // console.log(habitDetails);
  }, [habitDetails]);

  return (
    <div className="flex flex-col justify-between items-start space-y-4 pt-7 bg-[#fde2e4] p-3 font-medium  rounded-md shadow-md hover:shadow-xl transition-shadow duration-300 relative">
      {/* Challenge Title */}
      <div className="text-sm text-white font-medium absolute top-0 right-0 p-2 rounded-tr-md rounded-bl-md bg-habit">
        {hasDates
          ? `${challenge()}`
          : isOngoing
          ? `${streakTracking()} `
          : null}
      </div>

      {/* Habit */}
      <div className="text-base text-habit font-normal">
        {habitDetails.habit}
      </div>

      {/* Date */}
      <div className="flex space-x-3 text-xs text-[#1c7082]">
        <span>
          <b>{hasDates ? "From:" : "Start Date:"}</b>{" "}
          {formatDate(habitDetails.startDate)}
        </span>
        {hasDates && (
          <span>
            <b>To:</b> {formatDate(habitDetails.endDate)}
          </span>
        )}
      </div>

      {/* Icons */}
      <div className="flex justify-center items-center w-full space-x-3">
        <MdDeleteForever
          className="text-2xl text-[#1c7082] cursor-pointer transition-transform duration-300 transform hover:text-red-500 hover:scale-110"
          title="Delete"
          onClick={handleDelete}
        />
        <RxUpdate
          className="text-xl text-[#1c7082] cursor-pointer transition-transform duration-300 transform hover:text-blue-500 hover:scale-110"
          title="Update"
          onClick={handleUpdate}
        />
        <Link to={`/habitInfo/${habitDetails._id}`}>
          <BsInfoLg
            className="text-xl text-[#1c7082] cursor-pointer transition-transform duration-300 transform hover:text-yellow-500 hover:scale-110"
            title="Know More"
          />
        </Link>
      </div>

      {/* Update Card */}
      {isUpdating && (
        <UpdateHabit
          habitDetails={habitDetails}
          isPopUp={isPopUp}
          setIsPopUp={setIsPopUp}
          getMyHabits={getMyHabits}
        />
      )}
    </div>
  );
};

export default HabitCard;
