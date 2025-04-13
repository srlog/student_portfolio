import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiUser, FiAward, FiLogOut, FiBook, FiMenu, FiX } from 'react-icons/fi';

function Navbar({ role }) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gradient-to-r from-primary-600 to-primary-700 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to={`/${role}/dashboard`} className="flex items-center space-x-2">
              <FiBook className="h-8 w-8 text-white" />
              <div className="flex flex-col">
                <span className="text-xl font-bold">MSEC</span>
                <span className="text-xs text-primary-100">Student Portfolio</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to={`/${role}/dashboard`} className="flex items-center space-x-1 hover:text-primary-100 transition-colors">
              <FiHome className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>

            <Link to={`/${role}/profile`} className="flex items-center space-x-1 hover:text-primary-100 transition-colors">
              <FiUser className="h-5 w-5" />
              <span>Profile</span>
            </Link>

            {role === 'student' && (
              <Link to="/student/achievements" className="flex items-center space-x-1 hover:text-primary-100 transition-colors">
                <FiAward className="h-5 w-5" />
                <span>Achievements</span>
              </Link>
            )}

            <button onClick={handleLogout} className="flex items-center space-x-1 hover:text-red-200 transition-colors">
              <FiLogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isMobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Items */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-4 pb-4 border-t border-white/20">
            <Link to={`/${role}/dashboard`} onClick={toggleMenu} className="block flex items-center space-x-2 hover:text-primary-100">
              <FiHome className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>

            <Link to={`/${role}/profile`} onClick={toggleMenu} className="block flex items-center space-x-2 hover:text-primary-100">
              <FiUser className="h-5 w-5" />
              <span>Profile</span>
            </Link>

            {role === 'student' && (
              <Link to="/student/achievements" onClick={toggleMenu} className="block flex items-center space-x-2 hover:text-primary-100">
                <FiAward className="h-5 w-5" />
                <span>Achievements</span>
              </Link>
            )}

            <button onClick={() => { toggleMenu(); handleLogout(); }} className="flex items-center space-x-2 hover:text-red-200 w-full">
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
