"use client";

import React, { useEffect, useState } from "react";
import FullSideBar from "@/components/FullSideBar";
import { Trophy } from "lucide-react";

interface Tournament {
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
  teamgroeße?: number;
  teamanzahl?: number;
  participants_count?: number;
}

export default function TournamentList() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [joining, setJoining] = useState(false);

  const selectedPage = {
    0: "/user/profile",
    1: "/home",
    2: "/tournements/list",
    3: "/user/friends",
    4: "/games/all",
  };

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await fetch("http://localhost:8000/tournaments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  const fetchTournamentDetails = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8000/tournaments/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) {
        throw new Error("Turnierdetails konnten nicht geladen werden.");
      }
      const data = await res.json();
      setSelectedTournament(data);
    } catch (err) {
      console.error(err);
      alert("Fehler beim Laden der Turnierdetails.");
    }
  };

  const handleJoin = async (tournamentId: string) => {
    try {
      setJoining(true);
      const res = await fetch(`http://localhost:8000/tournaments/${tournamentId}/join`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.detail || "Beitritt fehlgeschlagen.");
        return;
      }
      const result = await res.json();
      alert(result.message || "Erfolgreich beigetreten.");
    } catch (err) {
      console.error(err);
      alert("Fehler beim Beitritt.");
    } finally {
      setJoining(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#252641] text-white">
      <FullSideBar which_Page={selectedPage[2]} />

      <div className="flex-1 px-10 py-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Trophy className="w-7 h-7 text-white" />
            Turniere entdecken
          </h1>

          <a
            href="/tournements/create"
            className="bg-[#dd17c9] hover:bg-pink-600 text-white font-semibold px-5 py-2 rounded-xl transition-colors"
          >
            Turnier erstellen
          </a>
        </div>

        {selectedTournament && (
          <div className="mb-10 bg-[#1A1A3D] rounded-2xl shadow-xl p-6 md:flex gap-6">
            <div className="bg-gray-300 w-full md:max-w-sm h-64 rounded-xl" />
            <div className="flex-1">
              <div className="bg-[#dd17c9] text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                FEATURED
              </div>
              <h2 className="text-2xl font-bold mb-2 uppercase tracking-wide">{selectedTournament.name}</h2>
              <p className="text-sm text-gray-300 mb-4">{selectedTournament.description}</p>
              <div className="text-sm text-white grid grid-cols-2 gap-y-1 mb-4">
                <p><span className="font-semibold">SPIEL:</span> {selectedTournament.game}</p>
                <p><span className="font-semibold">START:</span> {new Date(selectedTournament.start_time).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}</p>
                <p><span className="font-semibold">MAX. SPIELER:</span> {selectedTournament.max_players}</p>
                <p><span className="font-semibold">TEAMGRÖßE:</span> {selectedTournament.teamgroeße ?? "-"}</p>
                <p><span className="font-semibold">TEAMANZAHL:</span> {selectedTournament.teamanzahl ?? "-"}</p>
                <p><span className="font-semibold">BISHER TEILNEHMER:</span> {selectedTournament.participants_count ?? 0}</p>
                <p><span className="font-semibold">ERSTELLT VON:</span> {selectedTournament.created_by_username}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleJoin(selectedTournament.id)}
                  className="px-5 py-2 bg-[#dd17c9] hover:bg-pink-600 rounded-full text-white font-bold text-sm"
                  disabled={joining}
                >
                  {joining ? "Wird beigetreten..." : "JETZT ANMELDEN"}
                </button>
                <a
                  href={`/tournements/${selectedTournament.id}/details`}
                  className="px-5 py-2 bg-[#2c2c4e] hover:bg-[#3b3b63] rounded-full text-white font-bold text-sm"
                >
                  DETAILS ANSEHEN
                </a>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <p>Lade Turniere...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.map((t) => (
              <div
                key={t.id}
                className="bg-[#1A1A3D] rounded-2xl shadow-lg p-5 relative hover:scale-[1.02] transition-transform cursor-pointer"
                onClick={() => fetchTournamentDetails(t.id)}
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