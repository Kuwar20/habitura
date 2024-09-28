import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
      <div className="loader border-4 border-secondary border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
