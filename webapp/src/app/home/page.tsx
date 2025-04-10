"use client"

import React, { useState } from 'react';
import { Trophy, Users, Heart, MessageCircle, Share2, Bookmark, ChevronRight, BarChart3, UserCircle, Gamepad2, Swords, EggFriedIcon, Zap, User } from 'lucide-react';
import Sidebar, { SidebarItem } from '@/components/Sidebar';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()

  const goToTournaments = () => {
    router.push('/tournements/list')
  }

  const goToFriends = () => {
    router.push('/user/friends')
  }

  const goToGames = () => {
    router.push('/games/all')
  }

  const goToFeed = () => {
    router.push('/home')
  }

  var selectedPage = {
    0: '/tournements/list',
    1: '/user/friends',
    2: '/games/all',
    3: '/home'
  }
  
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

  const goToProfil = () => {
    router.push('/user/Profil')
  }


  return (
    <div className="flex flex-col min-h-screen">
      <aside className='flex overflow-hidden'>
        {/* Left Bar */}
        <div className='hidden lg:flex max-h-11/12'>
          <Sidebar>
              <SidebarItem icon={<User size={20} />} text="Profil" active onClick={goToProfil} selected={false}/>
              <SidebarItem icon={<Zap size={20} />} text="Feed" active onClick={goToFeed} selected={true}/>
              <SidebarItem icon={<Swords size={20} />} text="Tournaments" active onClick={goToTournaments} selected={false}/>
              <SidebarItem icon={<Users size={20} />} text="Friends" active onClick={goToFriends} selected={false}/>
              <SidebarItem icon={<Gamepad2 size={20} />} text="Games" active onClick={goToGames} selected={false}/>
          </Sidebar> 
        </div>

        {/* Main Content */}
        <main className="flex flex-1 w-full">
          {/* Middle Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* User Post - Card Style */}
            <div className="bg-indigo-900/40 shadow-[3px_2px_7px_purple] backdrop-blur-sm mr-10 mb-6 ml-10 border border-indigo-700/30 rounded-2xl">
              <div className="flex items-center p-4">
                <div className="flex justify-center items-center bg-gradient-to-br from-indigo-600 to-purple-700 shadow-inner rounded-full w-12 h-12 font-bold text-white text-lg">E</div>
                <div className="ml-3">
                  <h3 className="font-semibold text-white">ELITE_GAMER</h3>
                  <p className="text-indigo-300 text-xs">Turnier-Champion</p>
                </div>
                <div className="flex items-center ml-auto text-gray-400 text-sm">
                  <span className="bg-indigo-800/50 px-2 py-0.5 rounded-full text-xs">VOR 2 STUNDEN</span>
                </div>
              </div>
              
              {/* Post Content */}
              <div className="relative flex justify-center items-center bg-gradient-to-b from-gray-800/80 to-gray-900/90 h-80">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-indigo-800/20">

                </div>
              </div>
              
              <div className="bg-indigo-900/30 p-4 border-indigo-700/30 border-t">
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

            <div className="bg-indigo-900/40 shadow-[3px_2px_7px_purple] backdrop-blur-sm mr-10 mb-6 ml-10 border border-indigo-700/30 rounded-2xl">
              <div className="flex items-center p-4">
                <div className="flex justify-center items-center bg-gradient-to-br from-indigo-600 to-purple-700 shadow-inner rounded-full w-12 h-12 font-bold text-white text-lg">E</div>
                <div className="ml-3">
                  <h3 className="font-semibold text-white">ELITE_GAMER</h3>
                  <p className="text-indigo-300 text-xs">Turnier-Champion</p>
                </div>
                <div className="flex items-center ml-auto text-gray-400 text-sm">
                  <span className="bg-indigo-800/50 px-2 py-0.5 rounded-full text-xs">VOR 2 STUNDEN</span>
                </div>
              </div>
              
              {/* Post Content */}
              <div className="relative flex justify-center items-center bg-gradient-to-b from-gray-800/80 to-gray-900/90 h-80">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-indigo-800/20">

                </div>
              </div>
              
              <div className="bg-indigo-900/30 p-4 border-indigo-700/30 border-t">
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

            <div className="bg-indigo-900/40 shadow-[3px_2px_7px_purple] backdrop-blur-sm mr-10 mb-6 ml-10 border border-indigo-700/30 rounded-2xl">
              <div className="flex items-center p-4">
                <div className="flex justify-center items-center bg-gradient-to-br from-indigo-600 to-purple-700 shadow-inner rounded-full w-12 h-12 font-bold text-white text-lg">E</div>
                <div className="ml-3">
                  <h3 className="font-semibold text-white">ELITE_GAMER</h3>
                  <p className="text-indigo-300 text-xs">Turnier-Champion</p>
                </div>
                <div className="flex items-center ml-auto text-gray-400 text-sm">
                  <span className="bg-indigo-800/50 px-2 py-0.5 rounded-full text-xs">VOR 2 STUNDEN</span>
                </div>
              </div>
              
              {/* Post Content */}
              <div className="relative flex justify-center items-center bg-gradient-to-b from-gray-800/80 to-gray-900/90 h-80">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-indigo-800/20">

                </div>
              </div>
              
              <div className="bg-indigo-900/30 p-4 border-indigo-700/30 border-t">
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

            <div className="bg-indigo-900/40 shadow-[3px_2px_7px_purple] backdrop-blur-sm mr-10 mb-6 ml-10 border border-indigo-700/30 rounded-2xl">
              <div className="flex items-center p-4">
                <div className="flex justify-center items-center bg-gradient-to-br from-indigo-600 to-purple-700 shadow-inner rounded-full w-12 h-12 font-bold text-white text-lg">E</div>
                <div className="ml-3">
                  <h3 className="font-semibold text-white">ELITE_GAMER</h3>
                  <p className="text-indigo-300 text-xs">Turnier-Champion</p>
                </div>
                <div className="flex items-center ml-auto text-gray-400 text-sm">
                  <span className="bg-indigo-800/50 px-2 py-0.5 rounded-full text-xs">VOR 2 STUNDEN</span>
                </div>
              </div>
              
              {/* Post Content */}
              <div className="relative flex justify-center items-center bg-gradient-to-b from-gray-800/80 to-gray-900/90 h-80">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-indigo-800/20">

                </div>
              </div>
              
              <div className="bg-indigo-900/30 p-4 border-indigo-700/30 border-t">
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
        <div className="hidden md:block bg-[#121428] p-6 w-96">
          {/* Upcoming Tournaments */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="flex items-center font-stretch-90% text-white text-lg">
                <Trophy size={16} className="mr-2 text-pink-500" />
                Anstehende Turniere
              </h2>
              <button className="flex items-center text-pink-400 hover:text-pink-300 text-sm transition-colors">
                alle <ChevronRight size={14} />
              </button>
            </div>
            
            <div className="space-y-4">
              {upcomingTournaments.map((tournament, index) => (
                <div key={index} className="group bg-indigo-900/40 hover:shadow-lg backdrop-blur-sm p-4 border border-indigo-700/30 hover:border-indigo-600/50 rounded-xl transition-all cursor-pointer">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-white group-hover:text-pink-400 transition-colors">{tournament.title}</h3>
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
              <button className="bg-gradient-to-r hover:bg-gradient-to-r from-pink-600 hover:from-pink-700 to-purple-600 hover:to-purple-500 shadow-md hover:shadow-[#DA4ECC] hover:shadow-inner mt-6 py-3 rounded-xl w-full text-white transition-all hover:transition-colors hover:duration-500 hover:delay-75">
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
              <button className="flex items-center text-pink-400 hover:text-pink-300 text-sm transition-colors">
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
          
          {/* Discover Players */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="flex items-center font-bold text-white text-lg">
                <Users size={16} className="mr-2 text-blue-400" />
                ENTDECKE SPIELER
              </h2>
              <button className="flex items-center text-pink-400 hover:text-pink-300 text-sm transition-colors">
                MEHR <ChevronRight size={14} />
              </button>
            </div>
            
            <div className="gap-2 grid grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="flex justify-center items-center bg-gradient-to-br from-indigo-800/30 to-purple-900/30 backdrop-blur-sm border border-indigo-700/20 hover:border-indigo-600/50 rounded-xl aspect-square transition-all cursor-pointer">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-10 h-10"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </aside>
    </div>
  );
}