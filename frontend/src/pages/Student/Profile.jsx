import { useState, useEffect } from "react";
import CountUp from "react-countup";
import { toast } from "react-toastify";
import studentAPI from "../../services/student.api.service";
import Navbar from "../../components/Layout/Navbar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import * as Tabs from "@radix-ui/react-tabs";
import "react-circular-progressbar/dist/styles.css";
import ReactMarkdown from "react-markdown";
import {
  GlobeAltIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { FiAward, FiUser, FiBell  } from "react-icons/fi";
function Profile() {
  // Set a default for achievements so it never is undefined.
  const [profile, setProfile] = useState({ achievements: {} });
  const [activeTab, setActiveTab] = useState("achievements");
  const [loading, setLoading] = useState(true);

  // Calculate profile completion as percentage of mandatory fields present.
  const calculateProfileCompletion = () => {
    const requiredFields = [
      profile.gender,
      profile.fathers_name,
      profile.date_of_birth,
      profile.residential_address,
      profile.mobile,
      profile.parents_mobile_no,
      profile.aadhar_card_no,
      profile.department,
      profile.year,
      profile.section,
      profile.cgpa,
      profile.bio,
      profile.profile_picture,
    ];
    const filled = requiredFields.filter((field) => field).length;
    return Math.round((filled / requiredFields.length) * 100);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await studentAPI.getProfile();
        // Ensure achievements is present. If not, fallback to an empty object.
        const data = { ...response.data.student };
        setProfile(data);
      } catch (error) {
        toast.error("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  const socialLinks = [
    {
      icon: <GlobeAltIcon className="h-5 w-5" />,
      label: "Portfolio",
      url: "#",
    },
    {
      icon: <EnvelopeIcon className="h-5 w-5" />,
      label: "Email",
      url: `mailto:${profile.email}`,
    },
    {
      icon: <PhoneIcon className="h-5 w-5" />,
      label: "Phone",
      url: `tel:${profile.mobile}`,
    },
  ];

  const renderAchievements = (category) => (
    <div className="mt-6" key={category}>
      <h3 className="text-xl font-semibold mb-4 capitalize border-b pb-2 text-gray-800">
        {category.replace(/_/g, " ")} (
        {profile.achievements[category]?.length || 0})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profile.achievements[category]?.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition duration-300"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg text-gray-900">
                {item.title}
              </h4>
              <span
                className={`text-xs px-2 py-1 rounded-full font-semibold ${
                  item.approved_by_department && item.approved_by_placement
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {item.approved_by_department && item.approved_by_placement
                  ? "Approved"
                  : "Pending"}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{item.specialization}</p>
            <div className="mt-3 text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-medium">Issued by:</span> {item.issued_by}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(item.issued_date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Calculate profile completion once profile data is loaded.
  const profileCompletion = calculateProfileCompletion();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="student" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-800 via-blue-600 to-blue-500 p-10 mb-12 shadow-xl">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
          <div className="relative flex flex-col md:flex-row items-center gap-10">
            <img
              src={profile.profile_picture}
              alt={profile.name}
              className="h-48 w-48 rounded-full border-4 border-white shadow-xl object-cover"
            />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl font-extrabold text-white mb-2 drop-shadow">
                {profile.name}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-white/90 mb-4 text-sm">
                <span className="font-medium">{profile.reg_no}</span>
                <span>•</span>
                <span className="font-medium">
                  {profile.department} - {profile.year} Year
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-6">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    className="flex items-center gap-2 text-white hover:text-white/90 text-sm transition-colors"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="w-28">
              <CircularProgressbar
                value={profile.cgpa * 10}
                text={`${profile.cgpa}`}
                styles={buildStyles({
                  textColor: "white",
                  pathColor: "#00FFD1",
                  trailColor: "rgba(255,255,255,0.2)",
                })}
              />
            </div>
          </div>
        </div>

        {/* Biography */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Biography
          </h2>
          <div className="prose prose-sm text-gray-700">
            <ReactMarkdown>{profile.bio}</ReactMarkdown>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mt-6 space-y-6">
          {/* Row One: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Achievements */}
            <div className="p-6 hover:border-primary-500 transition-colors border border-gray-200 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <FiAward className="h-6 w-6 text-indigo-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">
                  Total Achievements
                </span>
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-bold text-gray-900">
                  {profile.achievements.total_achievements || 0}
                </h3>
                <span className="text-green-500 text-sm font-medium">
                  +2 this month
                </span>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="p-6 hover:border-green-500 transition-colors border border-gray-200 rounded-xl">
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
                    {profileCompletion}%
                  </h3>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-green-500 rounded-full transition-all duration-500"
                    style={{ width: `${profileCompletion}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="p-6 hover:border-yellow-500 transition-colors border border-gray-200 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <FiBell className="h-6 w-6 text-yellow-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">
                  Notifications
                </span>
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-bold text-gray-900">10</h3>
                <span className="text-yellow-500 text-sm font-medium">
                  New updates
                </span>
              </div>
            </div>
          </div>

          {/* Row Two: 5 Achievement Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
            <Stat
              label="Certificates"
              value={
                <CountUp
                  start={0}
                  end={profile.achievements.total_number_of_certificates || 0}
                  duration={2}
                />
              }
            />
            <Stat
              label="Internships"
              value={profile.achievements.total_number_of_internships || 0}
            />
            <Stat
              label="Projects"
              value={profile.achievements.total_number_of_projects || 0}
            />
            <Stat
              label="Online Courses"
              value={profile.achievements.total_number_of_online_courses || 0}
            />
            <Stat
              label="Hackathons"
              value={profile.achievements.total_number_of_hackathons || 0}
            />
          </div>
        </div>

        {/* Achievements Tabs */}
        <div className="bg-white p-8 rounded-2xl shadow-xl mt-10">
          <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
            <Tabs.List className="flex space-x-2 bg-gray-100 rounded-full p-1 mb-8">
              <Tabs.Trigger
                value="achievements"
                className={`flex-1 px-6 py-2 text-sm font-semibold rounded-full transition-colors ${
                  activeTab === "achievements"
                    ? "bg-white shadow text-blue-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                ACHIEVEMENTS
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="achievements" className="space-y-10">
              {Object.keys(profile.achievements || {})
                .filter((key) => Array.isArray(profile.achievements[key]))
                .map((category) => renderAchievements(category))}
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
}

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

export default Profile;
