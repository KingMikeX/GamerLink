'use client';

import React from 'react';

interface SimplePostProps {
  content: string;
  type?: 'joined' | 'created' | 'interest';
  date?: Date;
}

export default function SimplePost({ content, type = 'created', date }: SimplePostProps) {
  const colorClasses = {
    joined: 'text-blue-400',
    created: 'text-purple-400',
    interest: 'text-green-400',
  };

  const formattedTime = date ? new Date(date).toLocaleTimeString() : new Date().toLocaleTimeString();

  return (
    <div className="bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm p-3 rounded-md shadow-sm border border-[#333]">
      <span className="text-[#6a9955]">[{formattedTime}]</span>{' '}
      <span className={colorClasses[type]}>
        {content}
      </span>
    </div>
  );
}
