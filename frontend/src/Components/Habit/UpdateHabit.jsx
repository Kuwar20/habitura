import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import InputHabit from "../formInputs/InputHabit";
import Datepicker from "../formInputs/Datepicker";
import { GrDocumentUpdate } from "react-icons/gr";
import { makeAuthenticatedPUTRequest } from "../../utils/serverHelpers";
import { Toast, ToastProvider } from "../common/Toast";
import OutsideClickHandler from "react-outside-click-handler";

const UpdateHabit = ({ habitDetails, isPopUp, setIsPopUp, getMyHabits }) => {
  const [key, setKey] = useState("");
  const [habitData, setHabitData] = useState({
    habit: "",
    startDate: new Date(),
    endDate: null,
  });
  useEffect(() => {
    setHabitData({
      habit: habitDetails.habit,
      startDate: habitDetails.startDate,
      endDate: habitDetails.endDate,
    });
  }, [habitDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHabitData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date, field) => {
    setHabitData((prevData) => ({
      ...prevData,
      [field]: date,
    }));
  };

  // Update habits
  const updateHabit = async () => {
    try {
      const response = await makeAuthenticatedPUTRequest(
        `/habit/updateHabit/${habitDetails._id}`,
        habitData
      );
      //   console.log('Update Successful:', response);
      Toast.success("Habit updated successfully");
      getMyHabits();
      setIsPopUp(false);
    } catch (error) {
      console.error("Error updating habit:", error);
      Toast.error("There's an error updating habit, Refer console.");
    }
  };

  const handleKeyDown = (e) => {
    setKey(e.key);
    if (e.key === "Enter") {
      updateHabit();
    }
  };

  return (
    <>
      <OutsideClickHandler
        onOutsideClick={(e) => {
          setIsPopUp(false);
          e.stopPropagation();
        }}
      >
        <ToastProvider />
        <div
          className={`fixed top-[50%] left-[55%] w-[60%] h-[70%] flex justify-center items-center bg-darkestgreen bg-opacity-50 z-50 transform -translate-x-1/2 -translate-y-1/2 shadow-md rounded-sm ${
            isPopUp ? "block" : "hidden"
          } `}
        >
          <RxCross1
            className="absolute top-1 right-1 cursor-pointer font-thin text-5xl text-red-500"
            onClick={() => setIsPopUp(false)}
          />
          <div className="h-3/4 w-3/4 bg-[#ebc1c1] rounded-md shadow-md p-5 space-y-4">
            {/* Title */}
            <div className=" text-3xl font-normal text-darkgreen">
              Update My Habit
            </div>

            {/* Update Habit Input */}
            <div className="flex justify-center items-center rounded-md space-x-3 bg-white drop-shadow-lg px-1">
              <InputHabit
                type={"text"}
                name={"habit"}
                value={habitData.habit}
                onChange={handleChange}
                placeholder={"Eg. Wake Up at 5 AM."}
                onKeyDown={handleKeyDown}
                className="p-3"
              />

              <Datepicker
                selectedDate={habitData.startDate}
                onChange={(date) => handleDateChange(date, "startDate")}
                dateLabel="Start Date"
              />

              <Datepicker
                selectedDate={habitData.endDate}
                onChange={(date) => handleDateChange(date, "endDate")}
                dateLabel="End Date"
              />
            </div>

            {/* button */}
            <button
              className="bg-habit flex justify-center items-center text-white text-lg font-medium px-4 py-2 cursor-pointer hover:bg-[#1c7082] transition-colors duration-300 rounded-md"
              onClick={updateHabit}
            >
              <GrDocumentUpdate className="text-2xl mr-2" />
              Update
            </button>

          </div>
        </div>
      </OutsideClickHandler>
    </>
  );
};

export default UpdateHabit;
