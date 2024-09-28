import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { makeAuthenticatedGETRequest } from "../../utils/serverHelpers";
import PageHeading from "../common/PageHeading";
import LoadingSpinner from "../common/LoadingSpinner";

const DailyProgressChart = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProgress = async () => {
    try {
      const response = await makeAuthenticatedGETRequest("/track/dailyTasks");
      setProgressData(response.allProgress);
    } catch (error) {
      console.error("Error fetching daily progress:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, [progressData]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!progressData || progressData.length === 0) {
    return <div>No progress data available</div>;
  }

  // Format the data for the chart
  const formattedData = progressData.map((progress) => ({
    date: new Date(progress.date).toLocaleDateString("default", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    progress: progress.progressPercentage,
  }));

  return (
    <>
    {/* Heading */}
      <PageHeading title={"Daily Progress"} />

      {/* chart */}
      <div className="h-[200px] w-full max-w-screen-lg mx-auto bg-cyan-50">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            {" "}
            <Line
              type="monotone"
              dataKey="progress"
              stroke="#8bc34a"
              strokeWidth={2}
              dot={{ stroke: "#0891B2", strokeWidth: 2, r: 4 }}
            />
            <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#9e9e9e", fontSize: 12 }}
              label={{
                value: "Recent ⟶ Old",
                position: "insideBottom",
                offset: -5,
                fill: "#0891B2",
                fontSize: 18,
              }} 
            />
            <YAxis
              ticks={[0, 25, 50, 75, 100]}
              tick={{ fill: "#9e9e9e", fontSize: 14 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f5f5f5",
                border: "1px solid #e0e0e0",
              }}
              labelStyle={{ color: "#333" }}
              itemStyle={{ color: "#0891B2" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default DailyProgressChart;
