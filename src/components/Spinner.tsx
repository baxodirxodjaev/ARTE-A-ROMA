import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-200">
      <div className="flex flex-col items-center">
        
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 bg-indigo-500 rounded-full opacity-75 animate-ping"></div>
          <div className="absolute inset-0 bg-indigo-700 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute inset-0 bg-indigo-900 rounded-full"></div>
        </div>

        <p className="text-indigo-400 text-lg font-semibold mt-4 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Spinner;
