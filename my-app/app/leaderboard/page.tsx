"use client";
import { useState } from 'react';
import Link from "next/link";

interface User {
  name: string;
  hours: number;
  avatar: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'leaderboard'>('home');
  const [activeTab, setActiveTab] = useState<'study' | 'tutoring'>('study');

  const studyLeaders: User[] = [
    { name: 'Emma Watson', hours: 127, avatar: 'EW' },
    { name: 'Liam Chen', hours: 115, avatar: 'LC' },
    { name: 'Sophia Martinez', hours: 98, avatar: 'SM' },
    { name: 'Noah Johnson', hours: 87, avatar: 'NJ' },
    { name: 'Olivia Brown', hours: 82, avatar: 'OB' },
    { name: 'Ethan Davis', hours: 76, avatar: 'ED' },
    { name: 'Ava Wilson', hours: 71, avatar: 'AW' },
    { name: 'Mason Taylor', hours: 68, avatar: 'MT' },
  ];

  const tutoringLeaders: User[] = [
    { name: 'Isabella Garcia', hours: 94, avatar: 'IG' },
    { name: 'James Anderson', hours: 88, avatar: 'JA' },
    { name: 'Charlotte Lee', hours: 79, avatar: 'CL' },
    { name: 'Benjamin White', hours: 65, avatar: 'BW' },
    { name: 'Amelia Harris', hours: 58, avatar: 'AH' },
    { name: 'Lucas Martin', hours: 52, avatar: 'LM' },
    { name: 'Mia Thompson', hours: 47, avatar: 'MT' },
    { name: 'Henry Jackson', hours: 43, avatar: 'HJ' },
  ];

  const currentLeaders =
    activeTab === 'study' ? studyLeaders : tutoringLeaders;

  const topThree = currentLeaders.slice(0, 3);
  const rest = currentLeaders.slice(3);

  const getPodiumHeight = (rank: number) => {
    if (rank === 0) return 'h-40';
    if (rank === 1) return 'h-32';
    return 'h-24';
  };

  const getPodiumColor = (rank: number) => {
    if (rank === 0)
      return 'bg-gradient-to-b from-yellow-300 to-yellow-400';

    if (rank === 1)
      return 'bg-gradient-to-b from-blue-200 to-blue-300';

    return 'bg-gradient-to-b from-orange-300 to-orange-400';
  };

  const getMedalColor = (rank: number) => {
    if (rank === 0)
      return 'bg-yellow-300 text-yellow-900';

    if (rank === 1)
      return 'bg-blue-200 text-blue-900';

    return 'bg-orange-300 text-orange-900';
  };

  if (currentPage === 'home') {
    return (
      <div className="size-full flex items-center justify-center bg-blue-50">
        <div className="text-center">
          <h1 className="text-gray-900 text-5xl font-semibold mb-4">
            Study Buddies
          </h1>

          <p className="text-gray-600 text-xl mb-8">
            Find your perfect study group
          </p>

          <button
            onClick={() => setCurrentPage('leaderboard')}
            className="px-8 py-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-colors shadow-md text-lg"
          >
            View Leaderboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full bg-blue-50 overflow-auto">
      <div className="max-w-4xl mx-auto pb-12">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-200 to-blue-100 px-6 py-8 mb-6 rounded-b-3xl shadow-sm">
          <h1 className="text-gray-900 text-3xl font-semibold mb-2">
            Leaderboard
          </h1>

          <p className="text-gray-700">
            Top performers in our community
          </p>
        </div>

        {/* Tabs */}
        <div className="px-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-1 inline-flex">

            <button
              onClick={() => setActiveTab('study')}
              className={`px-6 py-3 rounded-xl transition-all ${
                activeTab === 'study'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Total Study Hours
            </button>

            <button
              onClick={() => setActiveTab('tutoring')}
              className={`px-6 py-3 rounded-xl transition-all ${
                activeTab === 'tutoring'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Total Tutoring Hours
            </button>
          </div>
        </div>

        {/* Podium */}
        <div className="px-6 mb-12">
          <div className="bg-white rounded-3xl shadow-sm border border-blue-100 p-8">

            <h2 className="text-gray-900 text-2xl font-semibold mb-8 text-center">
              Top 3 Champions
            </h2>

            <div className="flex items-end justify-center gap-6 mb-8">

              {/* 2nd Place */}
              <div className="flex flex-col items-center">

                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center shadow-md">
                    <span className="text-white text-xl font-medium">
                      {topThree[1]?.avatar}
                    </span>
                  </div>

                  <div
                    className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full ${getMedalColor(1)} flex items-center justify-center text-sm shadow-md`}
                  >
                    2
                  </div>
                </div>

                <p className="text-gray-900 font-medium text-center">
                  {topThree[1]?.name}
                </p>

                <p className="text-gray-600 text-sm mb-4">
                  {topThree[1]?.hours} hours
                </p>

                <div
                  className={`${getPodiumHeight(1)} ${getPodiumColor(1)} w-28 rounded-t-2xl shadow-sm flex items-center justify-center`}
                >
                  <span className="text-white text-2xl font-semibold">
                    2
                  </span>
                </div>
              </div>

              {/* 1st Place */}
              <div className="flex flex-col items-center">

                <svg
                  className="w-12 h-12 text-yellow-400 mb-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z" />
                </svg>

                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center shadow-lg border-4 border-yellow-300">

                    <span className="text-white text-2xl font-semibold">
                      {topThree[0]?.avatar}
                    </span>
                  </div>

                  <div
                    className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full ${getMedalColor(0)} flex items-center justify-center shadow-md`}
                  >
                    1
                  </div>
                </div>

                <p className="text-gray-900 font-medium text-center">
                  {topThree[0]?.name}
                </p>

                <p className="text-gray-600 text-sm mb-4">
                  {topThree[0]?.hours} hours
                </p>

                <div
                  className={`${getPodiumHeight(0)} ${getPodiumColor(0)} w-32 rounded-t-2xl shadow-md flex items-center justify-center`}
                >
                  <span className="text-white text-3xl font-semibold">
                    1
                  </span>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center">

                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center shadow-md">

                    <span className="text-white text-xl font-medium">
                      {topThree[2]?.avatar}
                    </span>
                  </div>

                  <div
                    className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full ${getMedalColor(2)} flex items-center justify-center text-sm shadow-md`}
                  >
                    3
                  </div>
                </div>

                <p className="text-gray-900 font-medium text-center">
                  {topThree[2]?.name}
                </p>

                <p className="text-gray-600 text-sm mb-4">
                  {topThree[2]?.hours} hours
                </p>

                <div
                  className={`${getPodiumHeight(2)} ${getPodiumColor(2)} w-28 rounded-t-2xl shadow-sm flex items-center justify-center`}
                >
                  <span className="text-white text-2xl font-semibold">
                    3
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rankings */}
        <div className="px-6">
          <div className="bg-white rounded-3xl shadow-sm border border-blue-100 overflow-hidden">

            <div className="px-6 py-4 border-b border-blue-100">
              <h2 className="text-gray-900 text-xl font-semibold">
                All Rankings
              </h2>
            </div>

            <div className="divide-y divide-blue-100">
              {rest.map((user, index) => (
                <div
                  key={index}
                  className="px-6 py-4 flex items-center justify-between hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center gap-4">

                    <span className="text-gray-500 text-lg w-8">
                      {index + 4}
                    </span>

                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center">

                      <span className="text-white font-medium">
                        {user.avatar}
                      </span>
                    </div>

                    <span className="text-gray-900 font-medium">
                      {user.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 font-semibold">
                      {user.hours}
                    </span>

                    <span className="text-gray-500">
                      hours
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="px-6 mt-8">
          <Link href="/homepage" className="w-full px-6 py-3 bg-white border border-blue-200 text-gray-700 rounded-2xl hover:bg-blue-50 transition-colors">Back to Homepage</Link>
          {/* <button
            onClick={() => setCurrentPage('home')}
            className="w-full px-6 py-3 bg-white border border-blue-200 text-gray-700 rounded-2xl hover:bg-blue-50 transition-colors"
          >
            Back to Homepage
          </button> */}
        </div>
      </div>
    </div>
  );
}