import React from "react";
import { LiaUserEditSolid } from "react-icons/lia";

const FileInput = ({ label, onChange, onClick, className }) => {
  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        id="profilePictureInput"
        onChange={onChange}
        className="hidden"
      />

      {/* Edit Icon */}
      <label
        htmlFor="profilePictureInput"
        className={`cursor-pointer text-white font-semibold hover:text-coolsecondary transition-colors duration-300 ${className}`}
      >
        <LiaUserEditSolid size={30} />
      </label>

      {/* Optional button for uploading */}
      <button
        className=" border border-secondary shadow-md bg-coolsecondary text-secondary bg-opacity-30 hover:bg-opacity-60 transition-colors duration-300 p-1 px-4 rounded-sm"
        onClick={onClick}
      >
        Upload
      </button>
    </div>
  );
};

export default FileInput;
