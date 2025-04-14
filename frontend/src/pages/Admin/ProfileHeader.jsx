import React from 'react';
import { FiEdit, FiLock } from 'react-icons/fi';
import ReactMarkdown from "react-markdown";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProfileHeader = ({ profile, socialLinks }) => {

  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-8 mb-14 shadow-2xl">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />

      <div className="relative flex flex-col lg:flex-row items-center gap-4">
        <div className="w-full lg:w-3/4 flex flex-col sm:flex-row items-center gap-8">
          <div className="relative group">
            <img
              src={profile.profile_picture}
              alt={profile.name}
              className="h-40 w-40 rounded-full border-4 border-white shadow-xl object-cover transition-transform duration-300 transform group-hover:scale-110"
            />
            <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-white/80 transition-colors duration-300" />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
              {profile.name}
            </h1>
            <div className="flex items-center justify-center sm:justify-start gap-3 text-white/80 mb-3 text-lg">
              <span className="font-medium">{profile.reg_no}</span>
              <span>•</span>
              <span className="font-medium">{profile.department} - {profile.year} Year</span>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow border border-white/40 mt-5">
              <div className="prose prose-blue text-gray-700 text-base">
                <ReactMarkdown>{profile.bio}</ReactMarkdown>
              </div>
            </div>

            {socialLinks && socialLinks.length > 0 && (
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-5 mt-5 ">
                {socialLinks.map((link, i) => (
                  link.isPresent && (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white hover:text-white/90 text-base transition-colors"
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </a>
                  )
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:flex md:flex-col items-center">
            <div className="w-24 h-24">
              <CircularProgressbar
                value={profile.cgpa * 10}
                text={`${profile.cgpa}`}
                styles={buildStyles({
                  textColor: "#fff",
                  pathColor: "#00FFD1",
                  trailColor: "rgba(255,255,255,0.2)",
                  textSize: '18px',
                })}
              />
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default ProfileHeader;

