import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUsers,
  FiHome,
  FiUser,
  FiAward,
  FiLogOut,
  FiBook,
  FiMenu,
  FiX,
  FiCheck,
} from "react-icons/fi";

function Navbar({ role,name }) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log(role)

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gradient-to-r from-primary-400 to-primary-600 text-white sticky top-0 z-50 zIndex-11">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link
              to={`/${role}/dashboard`}
              className="flex items-center space-x-2"
            >
              <img src="/assets/images/msec_logo.png" alt="" className="h-14 text-white"/>
              <div className="flex flex-col">
                <span className="text-xl font-bold">MSEC</span>
                <span className="text-xs text-primary-100">
                  Student Portfolio
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to={`/${role}/dashboard`}
              className="flex items-center space-x-1 hover:text-primary-100 transition-colors"
            >
              <FiHome className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>

            {role === "student" && (
              <Link
                to="/student/achievements"
                className="flex items-center space-x-1 hover:text-primary-100 transition-colors"
              >
                <FiAward className="h-5 w-5" />
                <span>Achievements</span>
              </Link>
            )}
            {role === "admin" && (
              <Link
                to="/admin/approvals"
                className="flex items-center space-x-1 hover:text-primary-100 transition-colors"
              >
                <FiCheck className="h-5 w-5" />
                <span>Approve Achievements</span>
              </Link>
            )}
            {/* change to soething else  */}
             {name === "george" &&  (
              <Link
                to="/master/approvals"
                className="flex items-center space-x-1 hover:text-primary-100 transition-colors"
              >
                <FiCheck className="h-5 w-5" />
                <span>Approve Achievements</span>
              </Link>
            )}
            {role === "admin" && (
              <Link
                to="/admin/students"
                className="flex items-center space-x-1 hover:text-primary-100 transition-colors"
              >
                <FiUsers className="h-5 w-5" />
                <span>Students</span>
              </Link>
            )}
            {role === "master" && (
              <Link
                to="/master/students"
                className="flex items-center space-x-1 hover:text-primary-100 transition-colors"
              >
                <FiUsers className="h-5 w-5" />
                <span>Students</span>
              </Link>
            )}
            {role === "student" && (
              <Link
                to={`/student/profile`}
                className="flex items-center space-x-1 hover:text-primary-100 transition-colors"
              >
                <FiUser className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-red-500 hover:text-red-700 transition-colors"
            >
              <FiLogOut className="h-5 w-5 text-red-300" />
              <span className="text-red-300">Logout</span>
            </button>
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="flex flex-col">
                <span className="text-xl font-bold">MS-CIIC</span>
                <span className="text-xs text-primary-100">
                  Upscaling MSEC
                </span>
              </div>
              <div className="relative ">
                {/* Glow layer behind the logo */}
                <div className="absolute inset-0 rounded-full bg-white  opacity-40 blur-md flex" />
                <div>  <img
                  src="/assets/images/msciic.jpg"
                  alt="Logo"
                  className="relative h-12"
                /></div>
                {/* The rotating logo itself with inline animation style */}
              
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex gap-1">
            {/* Logo Section */}
            <div className="flex items-center space-x-1">
              <div className="flex flex-col">
                <span className="text-xl font-bold">MSCIIC</span>
                <span className="text-xs text-primary-100">
                  Upscaling MSEC
                </span>
              </div>
              <div className="relative h-10">
                {/* Glow layer behind the logo */}
                <div className="absolute inset-0 rounded-full bg-white  opacity-40 blur-md flex" />
                <div>  <img
                  src="/assets/images/msciic.jpg"
                  alt="Logo"
                  className="relative h-10"
                  style={{ transform: "rotateZ(360deg)", transition: "transform 3s linear infinite" }}
                /></div>
              </div>
            </div>

            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
            
          </div>
        </div>

        {/* Mobile Menu Items */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-4 pb-4 border-t border-white/20">
            <Link
              to={`/${role}/dashboard`}
              onClick={toggleMenu}
              className="block flex items-center space-x-2 hover:text-primary-100"
            >
              <FiHome className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>

            {role === "student" && (
              <Link
                to="/student/achievements"
                onClick={toggleMenu}
                className="block flex items-center space-x-2 hover:text-primary-100"
              >
                <FiAward className="h-5 w-5" />
                <span>Achievements</span>
              </Link>
            )}
            {role === "admin" && (
              <Link
                to="/admin/approvals"
                className="flex items-center space-x-1 hover:text-primary-100 transition-colors"
              >
                <FiCheck className="h-5 w-5" />
                <span>Approve Achievements</span>
              </Link>
            )}
            {role === "student" && (
              <Link
                to={`/${role}/profile`}
                onClick={toggleMenu}
                className="block flex items-center space-x-2 hover:text-primary-100"
              >
                <FiUser className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            )}

            <button
              onClick={() => {
                toggleMenu();
                handleLogout();
              }}
              className="flex items-center space-x-2 text-red-300 w-full"
            >
              <FiLogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
