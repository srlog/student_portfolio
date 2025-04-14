import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-4">
      {/* Inline keyframes for inward roll animation */}
      <style>
        {`
          @keyframes rollInward {
            from { transform: rotateY(360deg) scale(1); }
            to { transform: rotateY(0deg) scale(1.5) inverted; }
          }
        @keyframes heartbeat {
            0% { transform: scale(1); }
            15% { transform: scale(1.05); }
            30% { transform: scale(1); }
            45% { transform: scale(1.05); }
            60% { transform: scale(1); }
            75% { transform: scale(1.05); }
            90% { transform: scale(1); }
            100% { transform: scale(1); }
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Left side: Logo and development credit */}
        <div
          className="flex items-center space-x-2 mb-3 md:mb-0"
          style={{ animation: "heartbeat 1s linear infinite alternate" }}
        >
          <img
            src="/assets/images/sit.png" // Adjust the image path as needed
            alt="Sree Info Tech Logo"
            className="h-8 w-8"
            style={{ animation: "rollInward 3s linear infinite" }}
          />
          <span className="text-sm font-medium">
            Developed by Sree Info Tech
          </span>
        </div>
        {/* Right side: Additional details */}
        <div className="text-xs">
          © {new Date().getFullYear()} Sree Info Tech. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
