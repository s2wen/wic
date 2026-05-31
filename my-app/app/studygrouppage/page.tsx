"use client";
import { useState } from 'react';

export default function App() {
  const [isMember, setIsMember] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  // Updated study group data
  const studyGroup = {
    name: 'CS Morning Crew',
    subject: 'Computer Science',
    date: 'May 20, 2026',
    time: '9:00 AM - 12:00 PM',
    meetingType: 'In-Person',
    place: 'Computer Lab',
    currentMembers: 6,
    maxCapacity: 8,
    description: 'Early birds who love coding with fresh minds.',
    members: [
      { initials: 'OC', name: 'Owen Cook', color: 'bg-blue-100 text-blue-600' },
      { initials: 'SM', name: 'Scarlett Morgan', color: 'bg-blue-100 text-blue-600' },
      { initials: 'JB', name: 'Jayden Bell', color: 'bg-blue-100 text-blue-600' },
      { initials: 'HM', name: 'Hannah Murphy', color: 'bg-blue-100 text-blue-600' },
      { initials: 'IB', name: 'Isaac Bailey', color: 'bg-blue-100 text-blue-600' },
      { initials: 'AR', name: 'Addison Rivera', color: 'bg-blue-100 text-blue-600' },
    ]
  };

  const spotsRemaining = studyGroup.maxCapacity - studyGroup.currentMembers;
  const fillPercentage = (studyGroup.currentMembers / studyGroup.maxCapacity) * 100;

  const handleJoin = () => {
    setIsMember(true);
  };

  const handleLeave = () => {
    setIsMember(false);
    setIsOpen(false);
  };

  const handleBack = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <div className="size-full flex items-center justify-center bg-blue-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Returned to browse groups page</p>
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Reopen Study Group (Demo)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 overflow-auto">
      <div className="max-w-3xl mx-auto py-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-2xl px-8 py-10 shadow-sm">
          <h1 className="text-gray-900 text-4xl font-semibold mb-2">
            {studyGroup.name}
          </h1>
          <p className="text-gray-700 text-lg">{studyGroup.subject}</p>
        </div>

        {/* Content */}
        <div className="p-6">

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-5 mb-8">

            {/* Schedule Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-gray-900 font-medium">Schedule</span>
              </div>

              <div className="text-sm space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium text-gray-900">Date:</span> {studyGroup.date}
                </p>

                <p className="text-gray-700">
                  <span className="font-medium text-gray-900">Time:</span> {studyGroup.time}
                </p>

                <p className="text-blue-600 text-xs mt-2">
                  One-time study session
                </p>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-gray-900 font-medium">Location</span>
              </div>

              <div className="text-sm space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium text-gray-900">Meeting Type:</span> {studyGroup.meetingType}
                </p>

                <p className="text-gray-700">
                  <span className="font-medium text-gray-900">Place:</span> {studyGroup.place}
                </p>
              </div>
            </div>

            {/* Group Size */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" />
                  </svg>
                </div>
                <span className="text-gray-900 font-medium">Group Size</span>
              </div>

              <div className="space-y-2 text-sm">
                <p className="text-gray-700">
                  Current Members: {studyGroup.currentMembers}
                </p>

                <p className="text-gray-700">
                  Maximum Capacity: {studyGroup.maxCapacity}
                </p>

                <div className="w-full bg-blue-100 rounded-full h-2 mt-3">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${fillPercentage}%` }}
                  ></div>
                </div>

                <p className="text-gray-500 text-xs">
                  {spotsRemaining} spots remaining
                </p>
              </div>
            </div>

            {/* Subject */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5" />
                  </svg>
                </div>
                <span className="text-gray-900 font-medium">Subject</span>
              </div>

              <p className="text-blue-600 font-medium">
                {studyGroup.subject}
              </p>
            </div>
          </div>

          {/* About */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 mb-8">
            <h2 className="text-gray-900 text-xl font-semibold mb-3">
              About This Group
            </h2>

            <p className="text-gray-700">
              {studyGroup.description}
            </p>
          </div>

          {/* Members */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 mb-8">
            <h2 className="text-gray-900 text-xl font-semibold mb-5">
              Current Members ({studyGroup.currentMembers})
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {studyGroup.members.map((member, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${member.color} flex items-center justify-center`}>
                    <span className="text-sm font-medium">
                      {member.initials}
                    </span>
                  </div>

                  <span className="text-gray-700 text-sm">
                    {member.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Success Message */}
          {isMember && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-3">
              <span className="text-green-700">
                Successfully joined the study group!
              </span>
            </div>
          )}

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-white border border-blue-200 text-gray-700 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Back to Browse Groups
            </button>

            {!isMember ? (
              <button
                onClick={handleJoin}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
              >
                Join This Group
              </button>
            ) : (
              <button
                onClick={handleLeave}
                className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
              >
                Leave Group
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}