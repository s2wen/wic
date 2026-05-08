"use client";
import { useState } from 'react';

export default function App() {
  const [isMember, setIsMember] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  // Mock study group data
  const studyGroup = {
    name: 'CS Morning Crew',
    subject: 'Computer Science',
    day: 'Wednesdays',
    time: '9-12pm',
    meetingType: 'In-Person',
    place: 'Computer Lab',
    currentMembers: 6,
    maxCapacity: 8,
    description: 'Early birds who love coding with fresh minds.',
    members: [
      { initials: 'OC', name: 'Owen Cook', color: 'bg-indigo-100 text-indigo-600' },
      { initials: 'SM', name: 'Scarlett Morgan', color: 'bg-indigo-100 text-indigo-600' },
      { initials: 'JB', name: 'Jayden Bell', color: 'bg-indigo-100 text-indigo-600' },
      { initials: 'HM', name: 'Hannah Murphy', color: 'bg-indigo-100 text-indigo-600' },
      { initials: 'IB', name: 'Isaac Bailey', color: 'bg-indigo-100 text-indigo-600' },
      { initials: 'AR', name: 'Addison Rivera', color: 'bg-indigo-100 text-indigo-600' },
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
      <div className="size-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Returned to browse groups page</p>
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Reopen Study Group (Demo)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full bg-white overflow-auto">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8">
          <h1 className="text-white text-3xl mb-1">{studyGroup.name}</h1>
          <p className="text-white/90">{studyGroup.subject}</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {/* Schedule Card */}
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-gray-900">Schedule</span>
              </div>
              <div className="text-sm">
                <p className="text-gray-600 mb-1"><span className="text-gray-900">Day:</span> {studyGroup.day}</p>
                <p className="text-gray-600"><span className="text-gray-900">Time:</span> {studyGroup.time}</p>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-gray-900">Location</span>
              </div>
              <div className="text-sm">
                <p className="text-gray-600 mb-1"><span className="text-gray-900">Meeting Type:</span> {studyGroup.meetingType}</p>
                <p className="text-gray-600"><span className="text-gray-900">Place:</span> {studyGroup.place}</p>
              </div>
            </div>

            {/* Group Size Card */}
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <span className="text-gray-900">Group Size</span>
              </div>
              <div className="text-sm space-y-2">
                <p className="text-gray-600"><span className="text-gray-900">Current Members:</span> {studyGroup.currentMembers}</p>
                <p className="text-gray-600"><span className="text-gray-900">Maximum Capacity:</span> {studyGroup.maxCapacity}</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all"
                    style={{ width: `${fillPercentage}%` }}
                  ></div>
                </div>
                <p className="text-gray-500 text-xs">{spotsRemaining} spots remaining</p>
              </div>
            </div>

            {/* Subject Card */}
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="text-gray-900">Subject</span>
              </div>
              <p className="text-indigo-600">{studyGroup.subject}</p>
            </div>
          </div>

          {/* About Section */}
          <div className="mb-8">
            <h2 className="text-gray-900 mb-2">About This Group</h2>
            <p className="text-gray-700">{studyGroup.description}</p>
          </div>

          {/* Current Members */}
          <div className="mb-8">
            <h2 className="text-gray-900 mb-4">Current Members ({studyGroup.currentMembers})</h2>
            <div className="grid grid-cols-3 gap-4">
              {studyGroup.members.map((member, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${member.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-sm">{member.initials}</span>
                  </div>
                  <span className="text-gray-700 text-sm">{member.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Success Message */}
          {isMember && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg px-4 py-3 flex items-center gap-3">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-green-800">Successfully joined the study group!</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleBack}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back to Browse Groups
            </button>
            {!isMember ? (
              <button
                onClick={handleJoin}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Join This Group
              </button>
            ) : (
              <button
                onClick={handleLeave}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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