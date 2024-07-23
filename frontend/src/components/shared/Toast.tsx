import React, { useState, useEffect } from "react";

const Toast = ({ isError, message, duration = 3000, type = "error" }) => {
  const [isVisible, setIsVisible] = useState(false);

  const show = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, duration);
  };

  useEffect(() => {
    if (isError) {
      show();
    }
  }, [isError]);

  if (!isVisible) return null;

  return (
    <div
      className={`
      fixed bottom-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2
      px-8 py-4 rounded-lg text-white z-50
      transition-all duration-500 ease-in-out
      ${type === "error" ? "bg-red-500" : ""}
      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
    `}
    >
      {message}
    </div>
  );
};

export default Toast;
