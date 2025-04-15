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
import { FaLinkedin, FaGithub, FaGit } from 'react-icons/fa';
import { FiAward, FiUser, FiBell } from "react-icons/fi";

// Import your modal forms
import { ConfirmPassword, EditProfile } from "./EditProfile";
import ProfileHeader from "./ProfileHeader";
import {StatsSection} from "./StatsSection";

// A reusable Modal component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-lg p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
};


function Profile() {
  // Set a default for achievements so it never is undefined.
  const [profile, setProfile] = useState({ achievements: {} });
  const [activeTab, setActiveTab] = useState("achievements");
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);

  // Calculate profile completion as percentage of mandatory fields present.
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await studentAPI.getProfile();
        // Ensure achievements is present. If not, fallback to an empty object.
        const data = { ...response.data.student };
        console
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
      isPresent: !!profile.email,
      icon: <EnvelopeIcon className="h-5 w-5" />,
      label: profile.email,
      url: `mailto:${profile.email}`,
    },
    {
      isPresent: !!profile.mobile,
      icon: <PhoneIcon className="h-5 w-5" />,
      label: profile.mobile,
      url: `tel:${profile.mobile}`,
    },  {
      isPresent: !!profile.portfolio,
      icon: <GlobeAltIcon className="h-5 w-5" />,
      url: profile.portfolio,
    },
    {
      isPresent: !!profile.github_profile,
      icon: <FaGithub className="h-5 w-5" />,
      url: profile.github_profile,
    },
    {
      isPresent: !!profile.linkedin_profile,
      icon: <FaLinkedin className="h-5 w-5" />,
      url: profile.linkedin_profile,
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
  const profileCompletion = calculateProfileCompletion(profile);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="student" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProfileHeader
          profile={profile}
          socialLinks={socialLinks}
          onEditProfile={() => setShowEditProfileModal(true)}
          onUpdatePassword={() => setShowUpdatePasswordModal(true)}
        />
        <StatsSection profile={profile} profileCompletion={profileCompletion} />

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

      {/* Modal for Edit Profile */}
      <Modal
        isOpen={showEditProfileModal}
        onClose={() => setShowEditProfileModal(false)}
      >
        <EditProfile
          profile={profile}
          onClose={() => setShowEditProfileModal(false)}
          // Optionally pass an onSave callback to update profile data after successful edit.
          onSave={(updatedProfile) => {
            setProfile(updatedProfile);
            setShowEditProfileModal(false);
          }}
        />
      </Modal>

      {/* Modal for Update Password */}
      <Modal
        isOpen={showUpdatePasswordModal}
        onClose={() => setShowUpdatePasswordModal(false)}
      >
        <ConfirmPassword onClose={() => setShowUpdatePasswordModal(false)} />
      </Modal>
    </div>
  );
}

// A simple Stat subcomponent used in StatsSection
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
