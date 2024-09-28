import React, { forwardRef } from "react";

const InputHabit = forwardRef(({ value, name, onChange, type, placeholder, className, onKeyDown }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      name={name}
      onChange={onChange}
      value={value}
      className={`flex-1 rounded-md outline-none focus:bg-none font-primary ${className}`}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
    />
  );
});

export default InputHabit;
