import React from "react";
import { motion } from "framer-motion";

const Howitworks = () => {
  return (
    <section className="py-10 bg-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">How Our Habit Tracking App Works</h2>
        <p className="text-lg text-gray-600 mb-10">Your journey to better habits starts here!</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {instructions.map((instruction, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-full shadow-lg flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }} // Start small
              animate={{ opacity: 1, scale: 1 }} // Animate to full size
              transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered delay
              whileHover={{ scale: 1.1 }} // Slightly scale up on hover
            >
              <img src={instruction.icon} alt="" className="w-16 h-16 mb-4" />
              <h3 className="font-semibold text-lg text-center">{instruction.title}</h3>
              <p className="text-gray-600 text-center">{instruction.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.button
          className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          whileHover={{ scale: 1.1 }} // Scale up on hover
          whileTap={{ scale: 0.9 }} // Scale down on click
        >
          Start Tracking Your Habits!
        </motion.button>
      </div>
    </section>
  );
};

const instructions = [
  {
    title: "Create Your Habits",
    text: "You can create habits for yourself, select a start date, and track challenges or just count streaks.",
    icon: "path/to/icon1.svg", // Replace with your icon paths
  },
  {
    title: "Daily Task List",
    text: "Your habits will automatically be added to your dashboard task list each day for you to mark.",
    icon: "path/to/icon2.svg",
  },
  {
    title: "Set Daily Tasks",
    text: "Set your daily tasks on the dashboard with CRUD functionality and drag functionality.",
    icon: "path/to/icon3.svg",
  },
  {
    title: "Track Progress",
    text: "See the progress of your daily tasks accomplished on the dashboard as a line graph.",
    icon: "path/to/icon4.svg",
  },
  {
    title: "Jot Down Notes",
    text: "Jot down sudden notes right on the dashboard to capture your thoughts.",
    icon: "path/to/icon5.svg",
  },
];

export default Howitworks;
