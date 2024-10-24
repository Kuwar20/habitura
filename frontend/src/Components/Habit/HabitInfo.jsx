import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { makeAuthenticatedGETRequest } from "../../utils/serverHelpers";
import { TiArrowBack } from "react-icons/ti";
import { SlCalender } from "react-icons/sl";
import HabitCalendar from "../calender/HabitCalender";

const HabitInfo = () => {
  const location = useLocation();
  const { habitCal } = location.state;

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
    console.log(habitCal); // Log the habitCal state
  }, [id]);

  // Show error message if fetching fails
  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  const { habit, startDate, endDate, isCompleted, completionDates } =
    habitDetails;

  return (
    <div className="p-6 bg-primary h-screen">
      {/* Back button */}
      <Link to="/myHabits">
        <div className=" border-cyan-800 px- py-2 mb-5 max-w-max transition-transform duration-300 hover:scale-110">
          <TiArrowBack className="text-4xl text-cyan-800" />
        </div>
      </Link>

      <div className="h-full grid md:grid-cols-2 gap-8">
        {/* Habit Information Section */}
        <div>
          {/* Habit title */}
          <h2 className="text-3xl text-cyan-900 font-handwritten my-4 font-semibold">
            {habit || "No habit name provided"}
          </h2>

          {/* Start and End Date */}
          <div className="flex items-center space-x-6 mb-4">
            <div className="flex items-center">
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
            </div>

            {endDate && (
              <div className="flex items-center">
                <SlCalender className="text-2xl text-red-700" />
                <span className="ml-2 text-red-600">
                  {new Date(endDate).toLocaleDateString("default", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}
          </div>

          {/* Status */}
          <p className="text-lg mt-4">
            <span className="font-bold">Status:</span>{" "}
            {isCompleted ? "✅ Completed" : "❌ Not Completed"}
          </p>

          {/* Max streak or Challenge status */}
          <p className="text-lg mt-4">
            {endDate ? (
              <>
                <span className="font-bold">Challenge Status:</span>{" "}
                {habitCal?.challengeStatus || "N/A"}
              </>
            ) : (
              <>
                <span className="font-bold">🔥 Max Streak :</span>{" "}
                {habitCal.streaks.maxStreak || "N/A"}
              </>
            )}
          </p>
        </div>

        {/* Calendar and History Section */}
        <div className="flex flex-col justify-start items-center h-full">
          <HabitCalendar
            completionDates={completionDates}
            startDate={startDate}
            endDate={endDate}
          />
          <div className="text-2xl text-darkgreen mt-4 font-medium">
            Completion History
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitInfo;
