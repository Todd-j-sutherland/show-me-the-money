import React from "react";

const LoadingSpinner = () => {
  return (
    <div
      data-testid="loading-spinner"
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center p-8 z-50"
    >
      <div
        data-testid="spinner"
        className="w-16 h-16 border-4 border-secondary border-t-primary border-opacity-70 rounded-full animate-spin"
      ></div>
    </div>
  );
};

export default LoadingSpinner;
