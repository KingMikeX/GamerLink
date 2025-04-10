"use client"

import React from 'react';
import Post from '@/components/Post';
import FullSideBar from '@/components/FullSideBar';
import HomeShortCutPanel from '@/components/HomeShortCutPanel';
import { Trophy, Users, ChevronRight, Gamepad2, Swords, Zap } from 'lucide-react';

export default function Home() {

  const trendingGames = [
    { name: 'VALORANT', category: 'TAKTISCHER SHOOTER', players: '120k online' },
    { name: 'LEAGUE OF LEGENDS', category: 'MOBA', players: '320k online' }
  ];


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

  var selectedPage = {
    0: '/user/Profile',
    1: '/home',
    2: '/tournements/list',
    3: '/user/friends',
    4: '/games/all',
  }

  return (
    <div className="flex max-h-screen">
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
        
        <HomeShortCutPanel/>
      </div>
    </div>
  );
}