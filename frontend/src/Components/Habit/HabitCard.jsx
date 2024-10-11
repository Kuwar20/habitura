import React, { useCallback, useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { BsInfoLg } from "react-icons/bs";
import UpdateHabit from "./UpdateHabit";
import { Link } from "react-router-dom";
import { makeAuthenticatedGETRequest } from "../../utils/serverHelpers";
import { debounce } from "../../utils/throttleandDebounce";

const HabitCard = ({ habitDetails, deleteHabit, getMyHabits }) => {
  const [isUpdating, setIsUpadting] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  const [habitCal, setHabitCal] = useState(null);

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

  // get habit with calculations from backend
  const getHabitWithCalculations = async () => {
    try {
      const response = await makeAuthenticatedGETRequest(
        `/habit/getHabitDetails/${habitDetails._id}`
      );
      setHabitCal(response);
    } catch (error) {
      console.error("Error fetching habit details:", error);
    }
  };

 // Debounced effect to prevent excessive fetching
 const debouncedFetchHabit = useCallback(
  debounce(() => {
    if (habitDetails && habitDetails._id) {
      getHabitWithCalculations();
    }
  }, 300), // Adjust the debounce delay as necessary
  [habitDetails] // Dependencies for the fetch
);

useEffect(() => {
  console.log("Re-render on keydown");
  debouncedFetchHabit(); // Call the debounced fetch function
}, [habitDetails]);

  // Log habitCalculation when it updates
  useEffect(() => {
    if (habitCal) {
      console.log("Updated habitCal:", habitCal);
    }
  }, []);

  return (
    <div className="flex flex-col justify-between items-start space-y-4 pt-7 bg-[#fde2e4] p-3 font-medium  rounded-md shadow-md hover:shadow-xl transition-shadow duration-300 relative">
      {/* Challenge Title */}
      <div className="text-sm text-white font-medium absolute top-0 right-0 p-2 rounded-tr-md rounded-bl-md bg-habit">
        {hasDates
          ? habitCal?.challengeStatus
          : isOngoing
          ? habitCal?.streakStatus ?? "No streak"
          : null}
      </div>

      {/* Habit */}
      <div className="text-base text-habit font-normal">
        {habitDetails.habit}
      </div>

      {/* Date */}
        <div className="flex space-x-3 text-[10px] text-[#1c7082]">
          <span>
            <b>{hasDates ? "From:" : "Start Date:"}</b>{" "}
            {habitCal?.formattedStartDate}
          </span>
          {hasDates && (
            <span>
              <b>To:</b> {habitCal?.formattedEndDate}
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
