import React from "react";

const TextareaInput = ({ handleChange, value }) => {
  return (
    <div className="flex flex-col h-full">
      <textarea
        value={value}
        onChange={handleChange}
        placeholder="Write your notes here ... "
        tabIndex={-1}
        className="flex-grow bg-red-100 w-full h-full resize-none p-2 font-handwritten focus:outline-none"
      ></textarea>
    </div>
  );
};

export default TextareaInput;
