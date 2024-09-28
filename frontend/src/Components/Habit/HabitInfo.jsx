import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { makeAuthenticatedGETRequest } from "../../utils/serverHelpers";
import { TiArrowBack } from "react-icons/ti";
import { SlCalender } from "react-icons/sl";
import HabitCalendar from "../calender/HabitCalender";

const HabitInfo = () => {
  const { id } = useParams(); // Get the habit ID from the URL
  const [habitDetails, setHabitDetails] = useState({
    habit: "",
    startDate: "",
    endDate: "",
    isCompleted: "",
    completionDates: [],
  });
  const [error, setError] = useState(null); // Error state for better error handling

  const fetchHabitDetails = async () => {
    try {
      const response = await makeAuthenticatedGETRequest(
        `/habit/getHabit/${id}`
      );
      setHabitDetails({
        habit: response.habit,
        startDate: response.startDate,
        endDate: response.endDate,
        isCompleted: response.isCompleted,
        completionDates: response.completionDates,
      });
    } catch (err) {
      console.error("Error fetching habit details:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchHabitDetails();
  }, [id]);

  // Show error message if fetching fails
  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  const { habit, startDate, endDate, isCompleted, completionDates } =
    habitDetails;

  return (
    <div className="p-6 bg-primary  h-screen">
      {/* Back button */}
      <Link to={"/myHabits"}>
        <div className="rounded-md border-2 shadow-md max-w-fit px-4 mb-5">
          <TiArrowBack className="text-3xl text-cyan-800  hover:scale-105 transition-all duration-300" />
        </div>
      </Link>
      <div className="h-full grid grid-cols-2">
        <div>
          {/* Habit title */}
          <h2 className="text-2xl text-cyan-900 my-4 font-medium flex items-center">
            {habit || "No habit name provided"}
          </h2>

          {/* Start and end Date */}
          <div className="flex">
            <p className="flex items-center">
              <SlCalender className="text-2xl text-green-700" />
              <span className="ml-2 text-green-600">
                {startDate
                  ? new Date(startDate).toLocaleDateString("default", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "N/A"}
              </span>
            </p>
            ---------
            {endDate && (
              <p className="flex items-center">
                <SlCalender className="text-2xl text-red-700" />
                <span className="ml-2 text-red-600">
                  📅{" "}
                  {new Date(endDate).toLocaleDateString("default", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </p>
            )}
          </div>

          {/* Status */}
          <p className="mt-5">
            <b>Status:</b> {isCompleted ? "✅ Completed" : "❌ Not Completed"}
          </p>
        </div>
        <div className="flex flex-col justify-start items-center h-full">
          <HabitCalendar
            completionDates={completionDates}
            startDate={startDate}
            endDate={endDate}
          />
          <div className="text-2xl text-darkgreen mt-2 font-medium">
            Competion History
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitInfo;
