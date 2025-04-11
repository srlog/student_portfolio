import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import adminAPI from '../../services/admin.api.service';
import Navbar from '../../components/Layout/Navbar';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    department: '',
    year: '',
    search: '',
  });

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await adminAPI.getStudents();
      setStudents(response.data);
    } catch (error) {
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student => {
    return (
      (!filters.department || student.department === filters.department) &&
      (!filters.year || student.year === filters.year) &&
      (!filters.search || 
        student.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        student.email.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar role="admin" />
        <div className="max-w-7xl mx-auto p-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar role="admin" />
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Students</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search students..."
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
            />
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={filters.department}
              onChange={(e) => setFilters({...filters, department: e.target.value})}
            >
              <option value="">All Departments</option>
              {/* Add department options */}
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={filters.year}
              onChange={(e) => setFilters({...filters, year: e.target.value})}
            >
              <option value="">All Years</option>
              <option value="1">First Year</option>
              <option value="2">Second Year</option>
              <option value="3">Third Year</option>
              <option value="4">Fourth Year</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <div key={student.id} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{student.name}</h3>
              <p className="text-gray-600 mb-4">{student.email}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {student.department} - Year {student.year}
                </span>
                <Link
                  to={`/admin/students/${student.id}`}
                  className="text-primary-600 hover:text-primary-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {filteredStudents.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No students found matching the filters.
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentList;