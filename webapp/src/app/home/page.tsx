"use client"

import React from 'react';
import { Trophy, Users, ChevronRight, Gamepad2, Swords, Zap } from 'lucide-react';
import Sidebar, { SidebarItem } from '@/components/Sidebar';
import Post from '@/components/Post';
import FullSideBar from '@/components/FullSideBar';

export default function Home() {
  
  const upcomingTournaments = [
    {
      title: 'Apex Legends Cup',
      game: 'APEX LEGENDS',
      participants: '48/64 SPIELER',
      timeLeft: 'IN 2 TAGEN',
      prizePool: '€5,000'
    },
    {
      title: 'CS:GO2 Community Challange',
      game: 'Couter Strike Global Offensiv 2',
      participants: '28/32 TEAMS',
      timeLeft: 'IN 5 TAGEN',
      prizePool: '€3,500'
    },
    {
      title: 'FIFA Weekend GamerLeague',
      game: 'FIFA 25',
      participants: '12/16 SPIELER',
      timeLeft: 'IN 1 TAG',
      prizePool: '€2,000'
    }
  ];

  const trendingGames = [
    { name: 'VALORANT', category: 'TAKTISCHER SHOOTER', players: '120k online' },
    { name: 'LEAGUE OF LEGENDS', category: 'MOBA', players: '320k online' }
  ];

  var selectedPage = {
    0: '/user/Profile',
    1: '/home',
    2: '/tournements/list',
    3: '/user/friends',
    4: '/games/all',
  }

  return (
    <div className="flex max-h-11/12">
      {/* Left Sidebar - Fixed */}
      <FullSideBar which_Page={selectedPage[1]}/>

      {/* Main Content Area */}
      <div className="flex flex-1"> {/* Adjust ml-16 based on your Sidebar width */}
        {/* Middle Content - Scrollable */}
        <main className="flex-1 mr-20 ml-20 overflow-y-scroll no-scrollbar">
          <Post/>
          <Post/>
          <Post/>
          <Post/>
        </main>

        {/* Right Sidebar - Fixed */}
        <aside className="top-0 right-0 bg-[#121428] p-6 w-96">
          {/* Upcoming Tournaments */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="flex items-center font-stretch-90% text-white text-lg">
                <Trophy size={16} className="mr-2 text-pink-500" />
                Anstehende Turniere
              </h2>
              <button className="flex items-center text-pink-400 hover:text-pink-300 text-sm transition-colors hover:animate-pulse hover:duration-100 cursor-pointer">
                alle <ChevronRight size={14} />
              </button>
            </div>
            
            <div className="space-y-4">
              {upcomingTournaments.map((tournament, index) => (
                <div key={index} className="group bg-indigo-900/40 hover:shadow-[#252641] hover:shadow-inner backdrop-blur-sm p-4 border border-indigo-700/30 hover:border-indigo-600/50 rounded-xl transition-all hover:transition-colors hover:delay-100 cursor-pointer">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-white group-hover:text-pink-400 transition-colors hover:delay-75">{tournament.title}</h3>
                    <span className="bg-pink-600/80 px-2 py-0.5 rounded-full text-white text-xs">{tournament.prizePool}</span>
                  </div>
                  <p className="mt-1 text-indigo-300 text-sm">{tournament.game}</p>
                  <div className="flex justify-between mt-3 text-sm">
                    <span className="bg-pink-900/30 px-2 py-1 rounded-md text-pink-400">{tournament.participants}</span>
                    <span className="bg-blue-900/30 px-2 py-1 rounded-md text-blue-300">{tournament.timeLeft}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mr-10 ml-10">
              <button className="bg-gradient-to-r hover:bg-gradient-to-r from-pink-600 hover:from-pink-700 to-purple-600 hover:to-purple-500 shadow-md hover:shadow-[#DA4ECC] hover:shadow-inner mt-6 py-3 rounded-xl w-full text-white transition-all hover:transition-colors hover:duration-500 hover:delay-75 cursor-pointer">
                <span className='font-semibold font-stretch-150%'>Turnier erstellen</span>
              </button>
            </div>
          </div>
          
          {/* Trending Games */}
          <div className="mb-8 pt-5 border-t-2 border-t-gray-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="flex items-center text-white text-lg">
                <div className="bg-green-500 mr-2 rounded-full w-3 h-3 animate-pulse"></div>
                Spiele im Trend
              </h2>
              <button className="flex items-center text-pink-400 hover:text-pink-300 text-sm transition-colors hover:animate-pulse hover:duration-100 cursor-pointer">
                alle <ChevronRight size={14} />
              </button>
            </div>
            
            <div className="space-y-4">
              {trendingGames.map((game, index) => (
                <div key={index} className="group flex items-center bg-indigo-900/30 p-3 border border-indigo-800/30 hover:border-indigo-700/50 rounded-xl transition-all cursor-pointer">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md rounded-lg w-12 h-12"></div>
                  <div className="flex-1 ml-3">
                    <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">{game.name}</h3>
                    <div className="flex justify-between mt-1">
                      <p className="text-indigo-300 text-xs">{game.category}</p>
                      <p className="text-green-400 text-xs">{game.players}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}