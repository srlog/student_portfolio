import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiUser, FiAward, FiLogOut, FiBook } from 'react-icons/fi';

function Navbar({ role }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-primary-600 to-primary-700 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={`/${role}/dashboard`} className="flex items-center space-x-2">
              <FiBook className="h-8 w-8 text-white" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">MSEC</span>
                <span className="text-xs text-primary-100">Student Portfolio</span>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link 
              to={`/${role}/dashboard`} 
              className="flex items-center space-x-1 text-white hover:text-primary-100 transition-colors"
            >
              <FiHome className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            
            <Link 
              to={`/${role}/profile`} 
              className="flex items-center space-x-1 text-white hover:text-primary-100 transition-colors"
            >
              <FiUser className="h-5 w-5" />
              <span>Profile</span>
            </Link>
            
            {role === 'student' && (
              <Link 
                to="/student/achievements" 
                className="flex items-center space-x-1 text-white hover:text-primary-100 transition-colors"
              >
                <FiAward className="h-5 w-5" />
                <span>Achievements</span>
              </Link>
            )}
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-white hover:text-red-200 transition-colors"
            >
              <FiLogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;