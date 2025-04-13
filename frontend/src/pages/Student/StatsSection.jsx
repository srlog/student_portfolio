import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { FiAward, FiUser, FiBell } from 'react-icons/fi';

// Subcomponent for a single stat card.
const Stat = ({ label, value, extra }) => {
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
};
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

const StatsSection = ({ profile, profileCompletion }) => {
  return (
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
              <CountUp
                start={0}
                end={profile.achievements.total_achievements || 0}
                duration={1}
              />
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
              <CountUp
                    start={0}
                    end={profileCompletion}
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
            <ProfileCompletionBar completion={profileCompletion} />

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
          value={
            <CountUp
              start={0}
              end={profile.achievements.total_number_of_internships || 0}
              duration={2}
            />
          }
        />
        <Stat
          label="Projects"
          value={
            <CountUp
              start={0}
              end={profile.achievements.total_number_of_projects || 0}
              duration={2}
            />
          }
        />
        <Stat
          label="Online Courses"
          value={
            <CountUp
              start={0}
              end={profile.achievements.total_number_of_online_courses || 0}
              duration={2}
            />
          }
        />
        <Stat
          label="Hackathons"
          value={
            <CountUp
              start={0}
              end={profile.achievements.total_number_of_hackathons || 0}
              duration={2}
            />
          }
        />
      </div>
    </div>
  );
};

export default StatsSection;
