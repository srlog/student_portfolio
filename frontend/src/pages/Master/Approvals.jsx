import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import achievementAPI from "../../services/achievement.api.service";
import Navbar from "../../components/Layout/Navbar";

function Approvals() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("all");

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    try {
      const response = await achievementAPI.getAll();
      console.log(response.data);
      setAchievements(response.data.achievements);
    } catch (error) {
      toast.error("Failed to load achievements");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await achievementAPI.approve(id, { approved_by_placement: true });
      toast.success("Achievement approved successfully");
      loadAchievements();
    } catch (error) {
      toast.error("Failed to approve achievement");
    }
  };

  const handleReject = async (id) => {
    try {
      await achievementAPI.reject(id);
      toast.success("Achievement rejected successfully");
      loadAchievements();
    } catch (error) {
      toast.error("Failed to reject achievement");
    }
  };

  const filteredAchievements = achievements.filter((achievement) => {
    const student = achievement.achievementStudent || {};

    const statusCondition =
      statusFilter === "all" ||
      (statusFilter === "approved" && achievement.approved_by_placement) ||
      (statusFilter === "pending" && !achievement.approved_by_placement);

    const lowerSearch = searchTerm.toLowerCase();
    const searchCondition =
      student.name?.toLowerCase().includes(lowerSearch) ||
      student.reg_no?.toLowerCase().includes(lowerSearch);

    const yearCondition = yearFilter === "all" || student.year === yearFilter;

    return statusCondition && searchCondition && yearCondition;
  });
  const name = JSON.parse(localStorage.getItem("user"))?.name;
  

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar role="master" name />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-lg font-medium text-gray-700">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen   bg-gray-50">
      <Navbar role="master" name={name} />
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center sm:text-left">
          Achievement Approval
        </h1>

        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-shrink-0">
            <label htmlFor="statusFilter" className="sr-only">
              Filter by status
            </label>
            <select
              id="statusFilter"
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
            </select>
          </div>

          <div className="flex-1">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search by name or reg no..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex-shrink-0">
            <label htmlFor="yearFilter" className="sr-only">
              Filter by year
            </label>
            <select
              id="yearFilter"
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <option value="all">All Years</option>
              <option value="I">Year I</option>
              <option value="II">Year II</option>
              <option value="III">Year III</option>
              <option value="IV">Year IV</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col justify-between transition hover:shadow-lg"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {achievement.specialization || "No specialization available"}
                </p>
                <div className="space-y-1 mb-4">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Student:</span>{" "}
                    {achievement.achievementStudent?.name || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Reg No:</span>{" "}
                    {achievement.achievementStudent?.reg_no || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Year:</span>{" "}
                    {achievement.achievementStudent?.year || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(achievement.issued_date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Type:</span>{" "}
                    {achievement.type}
                  </p>
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                {achievement.approved_by_placement ? (
                  <button
                    onClick={() => handleReject(achievement.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md transition duration-200"
                  >
                    Reject
                  </button>
                ) : (
                  <button
                    onClick={() => handleApprove(achievement.id)}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-md transition duration-200"
                  >
                    Approve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            No achievements found matching the selected filters.
          </div>
        )}
      </div>
    </div>
  );
}

export default Approvals;
