import React from "react";
import { Link } from "react-router-dom";

const CheckboxInput = ({
  name,
  labelname,
  linkClassname,
  required = false,
}) => {
  return (
    <div className=" flex items-center space-x-2 ">
      <input
        type="checkbox"
        required={required}
        className={`${linkClassname} bg-transparent border-b-2 border-secondary text-base text-darkgreen outline-none font-primary`}
      />
      {labelname && (
        <label
          for={name}
          className="text-secondary text-xs font-primary font-bold "
        >
          <Link to="#" className={`${linkClassname}`}>
            {labelname}
          </Link>
        </label>
      )}
    </div>
  );
};

export default CheckboxInput;
