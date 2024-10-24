import React, { useEffect, useMemo, useState } from "react";
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
import LoadingSpinner from "../common/LoadingSpinner";
import { socket } from "../../socket";

const DailyProgressChart = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");

  const fetchProgress = async () => {
    try {
      const response = await makeAuthenticatedGETRequest("/track/dailyTasks");
      setProgressData(response.allProgress);
      setUserId(response.user._id);
    } catch (error) {
      console.error("Error fetching daily progress:", error);
    } finally {
      setLoading(false);
    }
  };

  // // Live update progress data
  useEffect(() => {
    fetchProgress(); // Initial fetch
    socket.connect();
    console.log("Connected to the frontend");
    // Listen for progress updates from the server
    socket.on("progressUpdate", (data) => {
      if (data.userId === userId) {
        console.log(data.userId, data.allProgress, "hhhhhhh");
        setProgressData((prevData) => [...prevData, data.allProgress]);
      }
    });
    return () => {
      socket.off("progressUpdate")
      socket.disconnect();
    };
  }, [userId]);

  socket.on('connect_error', (err) => {
    console.error('Connection error:', err);
  });
  

  // test socket io
  useEffect(() => {
    console.log("Connecting to socket...");
    socket.connect(); 

    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    socket.on("connect_error", (err) => {
      console.log("Connection error:", err); 
    });

    socket.on("testEvent", (data) => {
      console.log("Received test event:", data);
    });

    return () => {
      socket.off("connect");
      socket.off("testEvent");
      socket.disconnect();
    };
  }, []);

  // Formatted data
  const formattedData = progressData
    .map((progress) => ({
      date: new Date(progress.date).toLocaleDateString("default", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      progress: progress.progressPercentage,
    }))
    .reverse();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!progressData || progressData.length === 0) {
    return <div>No progress data available</div>;
  }

  return (
    <>
      {/* Heading */}
      <div className="text-md mb-2 text-center text-secondary font-primary font-medium">
        Daily Progress
      </div>

      {/* chart */}
      <div className="h-[150px] w-full max-w-screen-lg bg-cyan-50">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            {" "}
            <Line
              type="monotone"
              dataKey="progress"
              stroke="#0891B2"
              strokeWidth={2}
              dot={{ stroke: "#0891B2", strokeWidth: 1, r: 2 }}
            />
            <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#9e9e9e", fontSize: 9 }}
              label={{
                value: " ⟶ ",
                position: "insideBottom",
                offset: -9,
                fill: "#0891B2",
                fontSize: 35,
              }}
            />
            <YAxis
              ticks={[0, 25, 50, 75, 100]}
              tick={{ fill: "#9e9e9e", fontSize: 9 }}
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
