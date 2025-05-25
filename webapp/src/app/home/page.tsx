'use client';
import React, { useEffect, useState } from 'react';
import Post from '@/components/Post';
import FullSideBar from '@/components/FullSideBar';
import HomeShortCutPanel from '@/components/HomeShortCutPanel';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [joinedTournaments, setJoinedTournaments] = useState<any[]>([]);
  const [createdTournaments, setCreatedTournaments] = useState<any[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [joinedRes, createdRes, profileRes] = await Promise.all([
          fetch("http://localhost:8000/tournaments/me", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
          fetch("http://localhost:8000/tournaments/created-by-me", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
          fetch("http://localhost:8000/profile/me", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
        ]);

        const joinedData = await joinedRes.json();
        const createdData = await createdRes.json();
        const profileData = await profileRes.json();

        setJoinedTournaments(joinedData ?? []);
        setCreatedTournaments(createdData ?? []);
        setInterests(profileData?.interests ?? []);
      } catch (error) {
        console.error("Fehler beim Laden der Daten:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const selectedPage = {
    0: '/user/profile',
    1: '/home',
    2: '/tournaments/list',
    3: '/user/friends',
    4: '/games/all',
  };

  const renderPosts = () => {
    const allPosts = [
      ...joinedTournaments.map(t => ({ type: 'joined', content: `Beigetreten zu "${t.name}"` })),
      ...createdTournaments.map(t => ({ type: 'created', content: `Erstellt: "${t.name}"` })),
      ...interests.map(g => ({ type: 'interest', content: `Interessiert an ${g}` })),
    ];

    return allPosts.map((post, index) => (
      <Post key={index}>{post.content}</Post>
    ));
  };

  return (
    <div className="flex max-h-screen">
      <FullSideBar which_Page={selectedPage[1]} />
      <div className="flex flex-1">
        <main className="flex-1 mr-20 ml-20 overflow-y-scroll no-scrollbar">
          {loading ? <p>Loading personalized feed...</p> : renderPosts()}
        </main>
        <HomeShortCutPanel />
      </div>
    </div>
  );
}
