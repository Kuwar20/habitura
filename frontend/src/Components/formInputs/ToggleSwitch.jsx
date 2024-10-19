import React from "react";

const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      <div
        className={`w-11 h-6 bg-primary rounded-full transition-colors duration-300 ease-in-out
        ${checked ? "!bg-secondary" : "bg-primary"}`}
      ></div>
      <span
        className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out
        ${checked ? "translate-x-5" : "translate-x-0"}`}
      ></span>
    </label>
  );
};

export default ToggleSwitch;
