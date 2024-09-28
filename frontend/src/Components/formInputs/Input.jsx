import React from "react";

const Input = ({
  name,
  labelname,
  type,
  placeholder = "",
  value,
  handleChange,
  onKeyDown,
  required=false
}) => {
  return (
    <div className="flex justify-start items-start flex-col">
      {labelname && (
        <label
          htmlFor={name}
          className="text-secondary text-xs font-primary font-bold "
        >
          {labelname}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
        onKeyDown={onKeyDown}
        className="bg-transparent border-b-2 border-coolsecondary rounded-md px-2 placeholder:text-sm text-base text-darkgreen outline-none font-primary w-full"
        
      />
    </div>
  );
};

export default Input;
