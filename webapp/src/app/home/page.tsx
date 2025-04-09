"use client"

import React, { useState } from 'react';
import { Search, Bell, MessageSquare, User, Settings, Trophy, Users, Heart, MessageCircle, Share2, Bookmark, ChevronRight, BarChart3, UserCircle, Boxes, Package } from 'lucide-react';
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-950 to-purple-900">
      <aside className='flex'>
        <div className='flex'>
          <Sidebar>
              <SidebarItem icon={<BarChart3 size={20} />} text="Statistics" active alert={undefined} />
              <SidebarItem icon={<UserCircle size={20} />} text="Statistics" active alert={undefined} />
              <SidebarItem icon={<Boxes size={20} />} text="Statistics" active alert={undefined} />
              <SidebarItem icon={<Package size={20} />} text="Statistics" active alert={undefined} />
          </Sidebar> 
        </div>

        {/* Main Content */}
        <main className="flex-1 flex w-full overflow-hidden">
          {/* Middle Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* User Post - Card Style */}
            <div className="mb-6 bg-indigo-900/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-indigo-700/30 shadow-xl mr-10 ml-10">
              <div className="p-4 flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-inner">E</div>
                <div className="ml-3">
                  <h3 className="text-white font-semibold">ELITE_GAMER</h3>
                  <p className="text-indigo-300 text-xs">Turnier-Champion</p>
                </div>
                <div className="ml-auto text-gray-400 text-sm flex items-center">
                  <span className="bg-indigo-800/50 px-2 py-0.5 rounded-full text-xs">VOR 2 STUNDEN</span>
                </div>
              </div>
              
              {/* Post Content */}
              <div className="bg-gradient-to-b from-gray-800/80 to-gray-900/90 h-80 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-indigo-800/20"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-purple-700 rounded-full flex items-center justify-center z-10 shadow-lg border-2 border-white/20">
                  <span className="text-white text-2xl font-bold">V</span>
                  <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-lg border border-white/30">1</div>
                </div>
              </div>
              
              <div className="p-4 bg-indigo-900/30 border-t border-indigo-700/30">
                <div className="flex justify-between">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-1 text-gray-300 hover:text-pink-400 transition-colors">
                      <Heart size={18} />
                      <span className="text-sm">142</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-300 hover:text-blue-400 transition-colors">
                      <MessageCircle size={18} />
                      <span className="text-sm">24</span>
                    </button>
                  </div>
                  <div className="flex space-x-4">
                    <button className="text-gray-300 hover:text-green-400 transition-colors">
                      <Share2 size={18} />
                    </button>
                    <button className="text-gray-300 hover:text-yellow-400 transition-colors">
                      <Bookmark size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar - Modern Card Style */}
        <div className="bg-[#2a2a4a] w-96 p-6 overflow-y-auto hidden lg:block">
          {/* Upcoming Tournaments */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white font-stretch-90% text-lg flex items-center">
                <Trophy size={16} className="text-pink-500 mr-2" />
                Anstehende Turniere
              </h2>
              <button className="text-pink-400 hover:text-pink-300 text-sm flex items-center transition-colors">
                alle <ChevronRight size={14} />
              </button>
            </div>
            
            <div className="space-y-4">
              {upcomingTournaments.map((tournament, index) => (
                <div key={index} className="bg-indigo-900/40 backdrop-blur-sm rounded-xl p-4 border border-indigo-700/30 hover:border-indigo-600/50 transition-all hover:shadow-lg group cursor-pointer">
                  <div className="flex justify-between items-start">
                    <h3 className="text-white font-semibold group-hover:text-pink-400 transition-colors">{tournament.title}</h3>
                    <span className="bg-pink-600/80 text-white text-xs py-0.5 px-2 rounded-full">{tournament.prizePool}</span>
                  </div>
                  <p className="text-indigo-300 text-sm mt-1">{tournament.game}</p>
                  <div className="flex justify-between mt-3 text-sm">
                    <span className="text-pink-400 bg-pink-900/30 py-1 px-2 rounded-md">{tournament.participants}</span>
                    <span className="text-blue-300 bg-blue-900/30 py-1 px-2 rounded-md">{tournament.timeLeft}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mr-10 ml-10">
              <button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-xl mt-6 transition-all shadow-md">
                <span className='font-semibold font-stretch-150%'>Turnier erstellen</span>
              </button>
            </div>
          </div>
          


          {/* Trending Games */}
          <div className="mb-8 pt-5 border-t-2 border-t-gray-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white text-lg flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Spiele im Trend
              </h2>
              <button className="text-pink-400 hover:text-pink-300 text-sm flex items-center transition-colors">
                alle <ChevronRight size={14} />
              </button>
            </div>
            
            <div className="space-y-4">
              {trendingGames.map((game, index) => (
                <div key={index} className="flex items-center p-3 bg-indigo-900/30 rounded-xl border border-indigo-800/30 hover:border-indigo-700/50 transition-all group cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-md"></div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">{game.name}</h3>
                    <div className="flex justify-between mt-1">
                      <p className="text-indigo-300 text-xs">{game.category}</p>
                      <p className="text-green-400 text-xs">{game.players}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Discover Players */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white font-bold text-lg flex items-center">
                <Users size={16} className="text-blue-400 mr-2" />
                ENTDECKE SPIELER
              </h2>
              <button className="text-pink-400 hover:text-pink-300 text-sm flex items-center transition-colors">
                MEHR <ChevronRight size={14} />
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="aspect-square bg-gradient-to-br from-indigo-800/30 to-purple-900/30 rounded-xl backdrop-blur-sm border border-indigo-700/20 flex items-center justify-center cursor-pointer hover:border-indigo-600/50 transition-all">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </aside>
    </div>
  );
}