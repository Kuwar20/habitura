import React from "react";

const PageHeading = ({ title, className }) => {
  return (
    <div
      className={`text-2xl mb-4 text-secondary font-primary font-medium ${className}`}
    >
      {" "}
      {title}
    </div>
  );
};

export default PageHeading;
