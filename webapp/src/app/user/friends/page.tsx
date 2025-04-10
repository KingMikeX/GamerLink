"use client"

import React from 'react';
import FullSideBar from '@/components/FullSideBar';

export default function Home() {

  var selectedPage = {
    0: '/user/Profile',
    1: '/home',
    2: '/tournements/list',
    3: '/user/friends',
    4: '/games/all',
  }

  return (
    <div className="flex">
      {/* Left Sidebar - Fixed */}
      <FullSideBar which_Page={selectedPage[3]}/>

      {/* Main Content Area */}
      
    </div>
  );
}