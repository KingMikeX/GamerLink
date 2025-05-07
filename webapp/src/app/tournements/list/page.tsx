"use client"

import React, { useEffect, useState } from 'react';
import FullSideBar from '@/components/FullSideBar';
import { Trophy } from 'lucide-react';

type Tournament = {
  id: string;
  name: string;
  game: string;
  niveau: string;
  start_time: string;
  duration_minutes: number;
  max_players: number;
  description: string;
  created_at: string;
  created_by_username: string;
};

export default function TournamentList() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const selectedPage = {
    0: '/user/profile',
    1: '/home',
    2: '/tournements/list',
    3: '/user/friends',
    4: '/games/all',
  };

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await fetch("/tournaments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        if (!res.ok) throw new Error("Fehler beim Laden der Turniere.");
        const data = await res.json();
        setTournaments(data);
      } catch (err) {
        setError("Turniere konnten nicht geladen werden.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0E0E2C] text-white">
      <FullSideBar which_Page={selectedPage[2]} />

      <div className="flex-1 px-10 py-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Trophy className="w-7 h-7 text-yellow-400" />
          Turniere entdecken
        </h1>

        {loading ? (
          <p>Lade Turniere...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.map((t) => (
              <div
                key={t.id}
                className="bg-[#1A1A3D] rounded-2xl shadow-lg p-5 relative hover:scale-[1.02] transition-transform"
              >
                <div className="absolute top-4 right-4 bg-orange-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                  {new Date(t.start_time) > new Date() ? "BALD" : "LIVE"}
                </div>

                <div className="bg-gray-700 h-32 w-full rounded-xl mb-4" />
                <p className="text-xs text-purple-400 font-bold">{t.game}</p>
                <h2 className="text-lg font-semibold">{t.name}</h2>
                <p className="text-sm text-gray-300">{t.max_players} SPIELER</p>
                <p className="text-sm text-gray-300">{t.niveau.toUpperCase()}</p>
                <p className="text-sm text-green-400 font-bold mt-2">
                  Start: {new Date(t.start_time).toLocaleString("de-DE")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
