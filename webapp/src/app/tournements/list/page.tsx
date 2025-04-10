"use client"

import React from 'react';
import Sidebar, { SidebarItem } from '@/components/Sidebar';
import TournamentCard from '@/components/TournementCard';
import { Gamepad2, Swords, Users, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TournamentPage() {
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

  return (
    <div className="flex flex-col h-screen">
      <aside className='flex'>
          {/* Left Bar */}
          <div className='hidden lg:flex border-[#1D1D20] border-t-1 h-screen max-h-11/12'>
            <Sidebar>
                <SidebarItem icon={<Zap size={20} />} text="Feed" active onClick={goToFeed} selected={false}/>
                <SidebarItem icon={<Swords size={20} />} text="Tournaments" active onClick={goToTournaments} selected={true}/>
                <SidebarItem icon={<Users size={20} />} text="Friends" active onClick={goToFriends} selected={false}/>
                <SidebarItem icon={<Gamepad2 size={20} />} text="Games" active onClick={goToGames} selected={false}/>
            </Sidebar> 
          </div>

      <div className="flex mt-10 h-screen">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Tournament Section */}
          <div className="px-8 pb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-white text-xl">TURNIERE</h2>
              <button className="flex items-center gap-2 bg-pink-600 px-4 py-1 rounded-md text-white text-sm">
                <span>➕</span> TURNIER ERSTELLEN
              </button>
            </div>

            {/* Featured Tournament */}
            <div className="bg-[#1a1225] mb-6 p-4 rounded-md">
              <div className="flex">
                <div className="bg-gray-800 rounded-md w-1/3 h-40">
                  {/* Tournament Image Placeholder */}
                </div>
                <div className="flex-1 ml-4">
                  <div className="inline-block bg-pink-600 mb-2 px-2 py-1 rounded-full text-white text-xs">FEATURED</div>
                  <h3 className="font-bold text-white text-lg">LOL GAMERLINK CHAMPIONSHIP</h3>
                  <p className="mb-4 text-gray-400 text-sm">
                    Das größte Community-Turnier des Jahres mit den besten Teams aus ganz Europa! Kämpft um ein Preisgeld von 1500 $ und ewigen Ruhm!
                  </p>

                  <div className="flex justify-between mb-4">
                    <div>
                      <div className="text-gray-400 text-xs">SPIEL</div>
                      <div className="text-white">LEAGUE OF LEGENDS</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs">FORMAT</div>
                      <div className="text-white">5V5 DOUBLE ELIMINATION</div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <div className="text-gray-400 text-xs">START</div>
                      <div className="text-white">15 APRIL 2025</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs">PREISGELD</div>
                      <div className="text-green-400">$ 1500 $</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-4">
                    <button className="bg-pink-600 px-6 py-2 rounded-md text-white text-sm">JETZT ANMELDEN</button>
                    <button className="px-6 py-2 border border-white rounded-md text-white text-sm">DETAILS ANSEHEN</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tournament Nav */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-6">
                <button className="text-white underline underline-offset-8">ALLE TURNIERE</button>
                <button className="text-white">MEINE TURNIERE</button>
                <button className="text-white">VERGANGENE TURNIERE</button>
                <button className="text-white">KOMMENDE TURNIERE</button>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="TURNIER SUCHEN..." 
                    className="bg-[#1a1225] px-4 py-2 pl-8 rounded-md text-white text-sm"
                  />
                  <span className="top-2 left-2 absolute text-white">🔍</span>
                </div>
                <select className="bg-[#1a1225] px-4 py-2 rounded-md text-white text-sm">
                  <option>ALLE SPIELE</option>
                </select>
                <select className="bg-[#1a1225] px-4 py-2 rounded-md text-white text-sm">
                  <option>STATUS: ALLE</option>
                </select>
                <select className="bg-[#1a1225] px-4 py-2 rounded-md text-white text-sm">
                  <option>FORMAT: ALLE FORMATE</option>
                </select>
              </div>
            </div>

            <h3 className="mb-4 font-bold text-white text-lg">AKTUELLE TURNIERE</h3>

            {/* Tournament Grid */}
            <div className="gap-4 grid grid-cols-3">
              {/* VALORANT Tournament */}
              <TournamentCard 
                status="LIVE"
                game="VALORANT"
                title="VALORANT Spring Cup 2025"
                mode="5v5 - Solo"
                format="3v3 Single Elimination"
                platform="PC/Mac"
                prize="1,000 $"
                players={63}
              />

              {/* CSGO Tournament */}
              <TournamentCard 
                status="BALD"
                game="COUNTER-STRIKE"
                title="COUNTER-STRIKE MASTERS"
                mode="5v5 - Solo"
                format="5v5 Double Elimination"
                platform="PC/Windows"
                prize="500 $"
                players={42}
              />

              {/* Fortnite Tournament */}
              <TournamentCard 
                status="BALD"
                game="FORTNITE"
                title="FORTNITE SOLO CUP"
                mode="Solo - FFA"
                format="Solo Battle Royal"
                platform="PC/Xbox"
                prize="300 $"
                players={56}
              />

              {/* LOL Tournament */}
              <TournamentCard 
                status="LIVE"
                game="LEAGUE OF LEGENDS"
                title="LOL COMMUNITY CUP"
                mode="5v5 - Team"
                format="5v5 Ranked Teams"
                platform="PC/Mac"
                prize="1,500 $"
                players={76}
              />

              {/* Rocket League Tournament */}
              <TournamentCard 
                status="BALD"
                game="ROCKET LEAGUE"
                title="ROCKET LEAGUE CHAMPIONSHIP"
                mode="3v3 - Solo"
                format="3v3 Doubles Elimination"
                platform="PC/Konsole"
                prize="650 $"
                players={48}
              />

              {/* Apex Tournament */}
              <TournamentCard 
                status="BALD"
                game="APEX LEGENDS"
                title="APEX PREDATOR CUP"
                mode="3v3 - Team"
                format="Trio Battle Royal"
                platform="PC/Xbox"
                prize="750 $"
                players={60}
              />
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <button className="mx-2 text-white">◀</button>
              <button className="bg-purple-600 mx-1 rounded-md w-8 h-8 text-white">1</button>
              <button className="mx-1 rounded-md w-8 h-8 text-white">2</button>
              <button className="mx-1 rounded-md w-8 h-8 text-white">3</button>
              <button className="mx-1 rounded-md w-8 h-8 text-white">4</button>
              <button className="mx-1 rounded-md w-8 h-8 text-white">5</button>
              <button className="mx-2 text-white">▶</button>
            </div>
          </div>
        </div>

      </div>
      </aside>
    </div>
  );
}
