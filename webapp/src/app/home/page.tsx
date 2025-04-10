"use client"

import React, { useState } from 'react';
import { Trophy, Users, Heart, MessageCircle, Share2, Bookmark, ChevronRight, BarChart3, UserCircle, Gamepad2, Swords } from 'lucide-react';
import Sidebar, { SidebarItem } from '@/components/Sidebar';

export default function Home() {
  const [activeTab, setActiveTab] = useState('TURNIERE');
  
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
    { name: 'LEAGUE OF LEGENDS', category: 'MOBA', players: '320k online' },
    { name: 'ELDEN RING', category: 'ACTION-RPG', players: '85k online' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#1D1D20] ">
      <aside className='flex'>
        {/* Left Bar */}
        <div className='hidden lg:flex max-h-11/12'>
          <Sidebar>
              <SidebarItem icon={<BarChart3 size={20} />} text="Stats" active alert={undefined} />
              <SidebarItem icon={<UserCircle size={20} />} text="Profil" active alert={undefined} />
              <SidebarItem icon={<Swords size={20} />} text="Tournements" active alert={undefined} />
              <SidebarItem icon={<Gamepad2 size={20} />} text="Games" active alert={undefined} />
          </Sidebar> 
        </div>

        {/* Main Content */}
        <main className="flex flex-1 w-full">
          {/* Middle Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* User Post - Card Style */}
            <div className="mb-6 ml-10 mr-10 border shadow-[3px_2px_7px_purple] bg-indigo-900/40 backdrop-blur-sm rounded-2xl border-indigo-700/30">
              <div className="flex items-center p-4">
                <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white rounded-full shadow-inner bg-gradient-to-br from-indigo-600 to-purple-700">E</div>
                <div className="ml-3">
                  <h3 className="font-semibold text-white">ELITE_GAMER</h3>
                  <p className="text-xs text-indigo-300">Turnier-Champion</p>
                </div>
                <div className="flex items-center ml-auto text-sm text-gray-400">
                  <span className="bg-indigo-800/50 px-2 py-0.5 rounded-full text-xs">VOR 2 STUNDEN</span>
                </div>
              </div>
              
              {/* Post Content */}
              <div className="relative flex items-center justify-center bg-gradient-to-b from-gray-800/80 to-gray-900/90 h-80">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-indigo-800/20">

                </div>
              </div>
              
              <div className="p-4 border-t bg-indigo-900/30 border-indigo-700/30">
                <div className="flex justify-between">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-1 text-gray-300 transition-colors hover:text-pink-400">
                      <Heart size={18} />
                      <span className="text-sm">142</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-300 transition-colors hover:text-blue-400">
                      <MessageCircle size={18} />
                      <span className="text-sm">24</span>
                    </button>
                  </div>
                  <div className="flex space-x-4">
                    <button className="text-gray-300 transition-colors hover:text-green-400">
                      <Share2 size={18} />
                    </button>
                    <button className="text-gray-300 transition-colors hover:text-yellow-400">
                      <Bookmark size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6 ml-10 mr-10 border shadow-[3px_2px_7px_purple] bg-indigo-900/40 backdrop-blur-sm rounded-2xl border-indigo-700/30">
              <div className="flex items-center p-4">
                <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white rounded-full shadow-inner bg-gradient-to-br from-indigo-600 to-purple-700">E</div>
                <div className="ml-3">
                  <h3 className="font-semibold text-white">ELITE_GAMER</h3>
                  <p className="text-xs text-indigo-300">Turnier-Champion</p>
                </div>
                <div className="flex items-center ml-auto text-sm text-gray-400">
                  <span className="bg-indigo-800/50 px-2 py-0.5 rounded-full text-xs">VOR 2 STUNDEN</span>
                </div>
              </div>
              
              {/* Post Content */}
              <div className="relative flex items-center justify-center bg-gradient-to-b from-gray-800/80 to-gray-900/90 h-80">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-indigo-800/20">

                </div>
              </div>
              
              <div className="p-4 border-t bg-indigo-900/30 border-indigo-700/30">
                <div className="flex justify-between">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-1 text-gray-300 transition-colors hover:text-pink-400">
                      <Heart size={18} />
                      <span className="text-sm">142</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-300 transition-colors hover:text-blue-400">
                      <MessageCircle size={18} />
                      <span className="text-sm">24</span>
                    </button>
                  </div>
                  <div className="flex space-x-4">
                    <button className="text-gray-300 transition-colors hover:text-green-400">
                      <Share2 size={18} />
                    </button>
                    <button className="text-gray-300 transition-colors hover:text-yellow-400">
                      <Bookmark size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6 ml-10 mr-10 border shadow-[3px_2px_7px_purple] bg-indigo-900/40 backdrop-blur-sm rounded-2xl border-indigo-700/30">
              <div className="flex items-center p-4">
                <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white rounded-full shadow-inner bg-gradient-to-br from-indigo-600 to-purple-700">E</div>
                <div className="ml-3">
                  <h3 className="font-semibold text-white">ELITE_GAMER</h3>
                  <p className="text-xs text-indigo-300">Turnier-Champion</p>
                </div>
                <div className="flex items-center ml-auto text-sm text-gray-400">
                  <span className="bg-indigo-800/50 px-2 py-0.5 rounded-full text-xs">VOR 2 STUNDEN</span>
                </div>
              </div>
              
              {/* Post Content */}
              <div className="relative flex items-center justify-center bg-gradient-to-b from-gray-800/80 to-gray-900/90 h-80">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-indigo-800/20">

                </div>
              </div>
              
              <div className="p-4 border-t bg-indigo-900/30 border-indigo-700/30">
                <div className="flex justify-between">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-1 text-gray-300 transition-colors hover:text-pink-400">
                      <Heart size={18} />
                      <span className="text-sm">142</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-300 transition-colors hover:text-blue-400">
                      <MessageCircle size={18} />
                      <span className="text-sm">24</span>
                    </button>
                  </div>
                  <div className="flex space-x-4">
                    <button className="text-gray-300 transition-colors hover:text-green-400">
                      <Share2 size={18} />
                    </button>
                    <button className="text-gray-300 transition-colors hover:text-yellow-400">
                      <Bookmark size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6 ml-10 mr-10 border shadow-[3px_2px_7px_purple] bg-indigo-900/40 backdrop-blur-sm rounded-2xl border-indigo-700/30">
              <div className="flex items-center p-4">
                <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white rounded-full shadow-inner bg-gradient-to-br from-indigo-600 to-purple-700">E</div>
                <div className="ml-3">
                  <h3 className="font-semibold text-white">ELITE_GAMER</h3>
                  <p className="text-xs text-indigo-300">Turnier-Champion</p>
                </div>
                <div className="flex items-center ml-auto text-sm text-gray-400">
                  <span className="bg-indigo-800/50 px-2 py-0.5 rounded-full text-xs">VOR 2 STUNDEN</span>
                </div>
              </div>
              
              {/* Post Content */}
              <div className="relative flex items-center justify-center bg-gradient-to-b from-gray-800/80 to-gray-900/90 h-80">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-indigo-800/20">

                </div>
              </div>
              
              <div className="p-4 border-t bg-indigo-900/30 border-indigo-700/30">
                <div className="flex justify-between">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-1 text-gray-300 transition-colors hover:text-pink-400">
                      <Heart size={18} />
                      <span className="text-sm">142</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-300 transition-colors hover:text-blue-400">
                      <MessageCircle size={18} />
                      <span className="text-sm">24</span>
                    </button>
                  </div>
                  <div className="flex space-x-4">
                    <button className="text-gray-300 transition-colors hover:text-green-400">
                      <Share2 size={18} />
                    </button>
                    <button className="text-gray-300 transition-colors hover:text-yellow-400">
                      <Bookmark size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </main>

        {/* Right Sidebar - Modern Card Style */}
        <div className="bg-[#121428] w-96 p-6 hidden md:block">
          {/* Upcoming Tournaments */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-stretch-90% text-lg flex items-center">
                <Trophy size={16} className="mr-2 text-pink-500" />
                Anstehende Turniere
              </h2>
              <button className="flex items-center text-sm text-pink-400 transition-colors hover:text-pink-300">
                alle <ChevronRight size={14} />
              </button>
            </div>
            
            <div className="space-y-4">
              {upcomingTournaments.map((tournament, index) => (
                <div key={index} className="p-4 transition-all border cursor-pointer bg-indigo-900/40 backdrop-blur-sm rounded-xl border-indigo-700/30 hover:border-indigo-600/50 hover:shadow-lg group">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-white transition-colors group-hover:text-pink-400">{tournament.title}</h3>
                    <span className="bg-pink-600/80 text-white text-xs py-0.5 px-2 rounded-full">{tournament.prizePool}</span>
                  </div>
                  <p className="mt-1 text-sm text-indigo-300">{tournament.game}</p>
                  <div className="flex justify-between mt-3 text-sm">
                    <span className="px-2 py-1 text-pink-400 rounded-md bg-pink-900/30">{tournament.participants}</span>
                    <span className="px-2 py-1 text-blue-300 rounded-md bg-blue-900/30">{tournament.timeLeft}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="ml-10 mr-10">
              <button className="w-full py-3 mt-6 text-white transition-all shadow-md hover:transition-colors hover:ease-initial hover:delay-100 hover:duration-500 hover:bg-gradient-to-r hover:from-pink-700 hover:to-purple-500 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl">
                <span className='font-semibold font-stretch-150%'>Turnier erstellen</span>
              </button>
            </div>
          </div>
          
          {/* Trending Games */}
          <div className="pt-5 mb-8 border-t-2 border-t-gray-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="flex items-center text-lg text-white">
                <div className="w-3 h-3 mr-2 bg-green-500 rounded-full animate-pulse"></div>
                Spiele im Trend
              </h2>
              <button className="flex items-center text-sm text-pink-400 transition-colors hover:text-pink-300">
                alle <ChevronRight size={14} />
              </button>
            </div>
            
            <div className="space-y-4">
              {trendingGames.map((game, index) => (
                <div key={index} className="flex items-center p-3 transition-all border cursor-pointer bg-indigo-900/30 rounded-xl border-indigo-800/30 hover:border-indigo-700/50 group">
                  <div className="w-12 h-12 rounded-lg shadow-md bg-gradient-to-br from-indigo-500 to-purple-600"></div>
                  <div className="flex-1 ml-3">
                    <h3 className="font-semibold text-white transition-colors group-hover:text-blue-400">{game.name}</h3>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-indigo-300">{game.category}</p>
                      <p className="text-xs text-green-400">{game.players}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Discover Players */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="flex items-center text-lg font-bold text-white">
                <Users size={16} className="mr-2 text-blue-400" />
                ENTDECKE SPIELER
              </h2>
              <button className="flex items-center text-sm text-pink-400 transition-colors hover:text-pink-300">
                MEHR <ChevronRight size={14} />
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="flex items-center justify-center transition-all border cursor-pointer aspect-square bg-gradient-to-br from-indigo-800/30 to-purple-900/30 rounded-xl backdrop-blur-sm border-indigo-700/20 hover:border-indigo-600/50">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </aside>
    </div>
  );
}