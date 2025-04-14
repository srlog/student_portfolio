import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import achievementAPI from "../../services/achievement.api.service";
import Navbar from "../../components/Layout/Navbar";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

// Stat component based on provided code snippet.
function Stat({ label, value, extra }) {
  return (
    <div className="flex flex-col bg-blue-100 items-center p-4 space-y-2 rounded-xl border border-gray-200 shadow-sm">
      <span className="text-sm font-semibold text-gray-700 text-center">
        {label}
      </span>

      <span className="text-3xl font-bold text-green-800 text-right">
        {value}
      </span>
    </div>
  );
}

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    department: "",
    year: "",
    search: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await achievementAPI.getStudentsListMaster();
      console.log(response.data);
      setStudents(response.data);
    } catch (error) {
      toast.error("Failed to load student data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Apply filtering on department, year, and search text (matches student's name or email)
  const filteredStudents = students.filter((studentItem) => {
    const student = studentItem.student;
    if (!student) return false;
    const matchesDept =
      !filters.department || student.department === filters.department;
    const matchesYear =
      !filters.year || student.year.toString() === filters.year;
    const searchLower = filters.search.toLowerCase();
    const matchesSearch =
      !filters.search ||
      student.name.toLowerCase().includes(searchLower) ||
      student.email.toLowerCase().includes(searchLower);
    return matchesDept && matchesYear && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar role="admin" />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-lg font-medium text-gray-700">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="admin" />
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Students</h1>

        {/* Filters Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search students..."
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={filters.department}
              onChange={(e) =>
                setFilters({ ...filters, department: e.target.value })
              }
            >
              <option value="">All Departments</option>
              <option value="AI&DS">AI&DS</option>
              <option value="CSE">CSE</option>
              <option value="CIVIL">CIVIL</option>
              <option value="EEE">EEE</option>
              <option value="ECE">ECE</option>
              <option value="IT">IT</option>
              <option value="MECH">MECH</option> 
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            >
              <option value="">All Years</option>
              <option value="1">First Year</option>
              <option value="2">Second Year</option>
              <option value="3">Third Year</option>
              <option value="4">Fourth Year</option>
            </select>
            {/* <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={filters.section}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            >
              <option value="">All Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select> */}
          </div>
        </div>

        {/* Student Cards Section - one card per row */}
        <div className="grid grid-cols-1 gap-6">
          {filteredStudents.map((studentItem) => {
            const student = studentItem.student;
            const achievements = studentItem.achievements;
            return (
              <div key={student.id}>
                <div className="bg-white rounded-lg shadow-md border border-gray-200 flex items-center w-full p-4 hidden md:flex">
                  {" "}
                  <div className="w-[20%] m-3 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                    {student.profile_picture ? (
                      <img
                        src={student.profile_picture}
                        alt={student.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={student.profile_picture || "/assets/images/avatar.jpg"}
                        alt={student.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  {/* Right Section (approximately 80% of card width, full card height) */}
                  <div className="flex flex-col ml-[5%] w-[80%] h-[100%]">
                    {/* Top Half: Basic Details (80×50) */}
                    <div className="h-1/2 w-full p-2">
                      <div className="w-80">
                        {" "}
                        <h3 className="text-lg font-semibold text-gray-800">
                          {student.name}
                        </h3>
                        <p className="text-sm text-gray-600">{student.email}</p>
                        <p className="text-sm text-gray-500">
                          {student.department} &middot; Year {student.year}
                        </p>
                        <p className="text-sm text-gray-500">
                          Reg No: {student.reg_no}
                        </p>
                      </div>

                      <div className="flex justify-end mt-2">
                        <Link
                          to={`/admin/students/${student.id}`}
                          className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-full"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>

                    {/* Bottom Half: Stats Container (80×50) */}
                    <div className="h-1/4 w-full p-2 grid grid-cols-4 gap-3 md:grid-cols-7">
                      <Stat
                        label="Total"
                        value={achievements.total_achievements}
                      />
                      <Stat
                        label="Certificates"
                        value={achievements.total_number_of_certificates}
                      />
                      <Stat
                        label="Hackathons"
                        value={achievements.total_number_of_hackathons}
                      />
                      <Stat
                        label="Internships"
                        value={achievements.total_number_of_internships}
                      />
                      <Stat
                        label="Online Courses"
                        value={achievements.total_number_of_online_courses}
                      />
                      <Stat
                        label="Paper Presentations"
                        value={achievements.total_number_of_paper_presentations}
                      />
                      <Stat
                        label="Projects"
                        value={achievements.total_number_of_projects}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 md:hidden  ">
                  <div className="w-full flex justify-center mb-4">
                    <div className="w-24 h-24 m-3 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                      {student.profile_picture ? (
                        <img
                          src={student.profile_picture}
                          alt={student.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src = "/assets/images/avatar.jpg"
                          alt={student.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {student.name}
                    </h3>
                    <p className="text-sm text-gray-600">{student.email}</p>
                    <p className="text-sm text-gray-500">
                      {student.department} &middot; Year {student.year}
                    </p>
                    <p className="text-sm text-gray-500">
                      Reg No: {student.reg_no}
                    </p>
                    <p className="text-sm text-gray-500">
                      Total Achievements: {achievements.total_achievements}
                    </p>
                    
                  </div>
                  <div className="flex justify-center mb-4">
                    <Link
                      to={`/admin/students/${student.id}`}
                      className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-full"
                    >
                      View Profile
                    </Link>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {/* <Stat label="Total" value={achievements.total_achievements} /> */}
                    <Stat label="Certificates" value={achievements.total_number_of_certificates} />
                    <Stat label="Hackathons" value={achievements.total_number_of_hackathons} />
                    <Stat label="Internships" value={achievements.total_number_of_internships} />
                    <Stat label="Online Courses" value={achievements.total_number_of_online_courses} />
                    <Stat label="Paper Presentations" value={achievements.total_number_of_paper_presentations} />
                    <Stat label="Projects" value={achievements.total_number_of_projects} />
                  </div>
                </div>
                {/* Profile Picture Section (14x14 with margin 3) */}
              </div>
            );
          })}
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
