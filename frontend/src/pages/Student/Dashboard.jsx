import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { toast } from "react-toastify";
import { FiAward, FiUser, FiBell, FiTrendingUp, FiBook } from "react-icons/fi";
import Navbar from "../../components/Layout/Navbar";
import studentAPI from "../../services/student.api.service";

// Reusable Stat component for small card stats
function Stat({ label, value, extra }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
      <span className="text-sm font-medium text-gray-600">{label}</span>
      {extra ? (
        <div className="w-16 h-16 mt-2">{extra}</div>
      ) : (
        <span className="text-3xl font-bold text-gray-800 mt-2">{value}</span>
      )}
    </div>
  );
}

const ProfileCompletionBar = ({ completion }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += 1;
      if (start >= completion) {
        clearInterval(interval);
        setProgress(completion);
      } else {
        setProgress(start);
      }
    }, 4); // speed of animation (lower = faster)

    return () => clearInterval(interval);
  }, [completion]);

  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-2 bg-green-500 rounded-full transition-all duration-100"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

function Dashboard() {
  const [stats, setStats] = useState({
    totalAchievements: 0,
    profileCompletion: 0,
    notifications: 0,
    recentAchievements: [],
    achievements: {
      total_number_of_certificates: 0,
      total_number_of_internships: 0,
      total_number_of_projects: 0,
      total_number_of_online_courses: 0,
      total_number_of_hackathons: 0,
    },
  });
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Student" };
  const [profileCompletion, setProfileCompletion] = useState(0);

  // Fetch the dashboard/profile data dynamically from the backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {

        const response = await studentAPI.getProfile();
        if (response.data && response.data.student) {
          const data = { ...response.data.student };
          console.log(data)
          const all_achievements = [];
          all_achievements.push(...data.achievements.certificates);
          all_achievements.push(...data.achievements.projects);
          all_achievements.push(...data.achievements.online_courses);
          all_achievements.push(...data.achievements.hackathons);
          all_achievements.push(...data.achievements.paper_presentations);
          all_achievements.push(...data.achievements.internships);
          all_achievements.sort((a, b) => new Date(b.issued_date) - new Date(a.issued_date));
          const non_approved_achivements = all_achievements.filter(
            (achievement) =>
              (!achievement.approved_by_department ||
                !achievement.approved_by_placement)
          );

          // Here, assume the backend returns fields like:
          // data.total_achievements, data.notifications and profile achievements counts
          setStats({
            totalAchievements: data.achievements.total_achievements || 0,
            profileCompletion: calculateProfileCompletion(data),
            notifications: data.notifications || 0,
            recentAchievements: non_approved_achivements || [],
            achievements: {
              total_number_of_certificates:
                data.achievements.total_number_of_certificates || 0,
              total_number_of_internships:
                data.achievements.total_number_of_internships || 0,
              total_number_of_projects:
                data.achievements.total_number_of_projects || 0,
              total_number_of_online_courses:
                data.achievements.total_number_of_online_courses || 0,
              total_number_of_hackathons:
                data.achievements.total_number_of_hackathons || 0,
            },
          });
        } else {
          toast.error("No profile data found");
        }
      } catch (error) {
        toast.error("Failed to fetch dashboard data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Calculate profile completion as percentage based on mandatory fields in profile data.
  // Adjust the list below to include fields that represent profile completion.
  function calculateProfileCompletion(profileData) {
    const requiredFields = [
      profileData.gender,
      profileData.fathers_name,
      profileData.date_of_birth,
      profileData.residential_address,
      profileData.mobile,
      profileData.parents_mobile_no,
      profileData.aadhar_card_no,
      profileData.department,
      profileData.year,
      profileData.section,
      profileData.cgpa,
      profileData.bio,
      profileData.profile_picture,
      profileData.linkedin_profile,
      profileData.portfolio,
      profileData.github_profile,
      profileData.achievements.certificates,
      profileData.achievements.online_courses,
      profileData.achievements.paper_presentations,
      profileData.achievements.internships,
      profileData.achievements.projects,
      profileData.achievements.hackathons,

    ];
    const filled = requiredFields.filter((field) => field != null).length;
    return Math.round((filled / requiredFields.length) * 100);
  }
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="student" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Greeting Section */}
        <div className="mb-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
          <div className="flex items-center space-x-4">
            <FiBook className="h-12 w-12" />
            <div>
              <h1 className="text-3xl font-bold">
                Hello {user.name}! Welcome to MSEC
              </h1>
              <p className="mt-2 text-primary-100">
                Track your academic journey and achievements
              </p>
            </div>
          </div>
        </div>

        {/* Top Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6 hover:border-primary-500 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-primary-100 rounded-lg">
                <FiAward className="h-6 w-6 text-primary-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">
                Total Achievements
              </span>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-gray-900">
                <CountUp
                  start={0}
                  end={stats.totalAchievements}
                  duration={1.5}
                  separator=","
                  decimal=","
                  decimals={0}
                  prefix=""
                  suffix=""
                />
              </h3>
              <span className="text-green-500 text-sm font-medium">
                +2 this month
              </span>
            </div>
          </div>
          <div className="card p-6 hover:border-green-500 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <FiUser className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">
                Profile Completion
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-bold text-gray-900">
                  <CountUp
                    start={0}
                    end={stats.profileCompletion}
                    duration={1.5}
                    separator=","
                    decimal=","
                    decimals={0}
                    prefix=""
                    suffix="%"
                  />
                </h3>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <ProfileCompletionBar completion={stats.profileCompletion} />

              </div>
            </div>
          </div>
          <div className="card p-6 hover:border-yellow-500 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FiBell className="h-6 w-6 text-yellow-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">
                Notifications
              </span>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-gray-900">
                {stats.notifications}
              </h3>
              <span className="text-yellow-500 text-sm font-medium">
                New updates
              </span>
            </div>
          </div>
          <div className="card p-6 hover:border-blue-500 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FiTrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">
                Progress
              </span>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-gray-900">Good</h3>
              <span className="text-blue-500 text-sm font-medium">
                On track
              </span>
            </div>
          </div>
        </div>

        {/* Breakdown Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
          <Stat
            label="Certificates"
            value={
              <CountUp
                start={0}
                end={stats.achievements.total_number_of_certificates || 0}
                duration={2}
              />
            }
          />
          <Stat
            label="Internships"
            value={
              <CountUp
                start={0}
                end={stats.achievements.total_number_of_internships || 0}
                duration={2}
              />
            }
          />
          <Stat
            label="Projects"
            value={
              <CountUp
                start={0}
                end={stats.achievements.total_number_of_projects || 0}
                duration={2}
              />
            }
          />
          <Stat
            label="Online Courses"
            value={
              <CountUp
                start={0}
                end={stats.achievements.total_number_of_online_courses || 0}
                duration={2}
              />
            }
          />
          <Stat
            label="Hackathons"
            value={
              <CountUp
                start={0}
                end={stats.achievements.total_number_of_hackathons || 0}
                duration={2}
              />
            }
          />
        </div>
        <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Quick Actions
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/student/achievements/"
                className="p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors group"
              >
                <h3 className="font-medium text-primary-700 group-hover:text-primary-800">
                  Add Achievement
                </h3>
                <p className="text-sm text-primary-600 mt-1">
                  Record a new achievement
                </p>
              </Link>
              <Link
                to="/student/profile"
                className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
              >
                <h3 className="font-medium text-green-700 group-hover:text-green-800">
                  Update Profile
                </h3>
                <p className="text-sm text-green-600 mt-1">
                  Keep your info up to date
                </p>
              </Link>
            </div>
          </div>
        {/* Recent Achievements and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mt-8">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                 Achievements waiting for Approval
              </h2>
              <Link
                to="/student/achievements"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {stats.recentAchievements.length > 0 ? (
                stats.recentAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(achievement.issued_date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {achievement.description}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Issued by: {achievement.issued_by}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      
                    <span className="badge badge-info">{achievement.type}</span>
                      <span
                        className={`badge text-center ${
                          
                          achievement.approved_by_placement
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {
                        achievement.approved_by_placement
                          ? "Approved by Placement"
                          : "Pending for placement "}
                          
                      </span>
                      <span
                        className={`badge text-center ${
                          achievement.approved_by_department 
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {achievement.approved_by_department
                          ? "Approved by Department"
                          : "Pending for Department"}
                          
                      </span>
                      
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No recent achievements</p>
              )}
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
