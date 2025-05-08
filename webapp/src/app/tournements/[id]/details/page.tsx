"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FullSideBar from "@/components/FullSideBar";
import { Trophy, Users, Flag, Clock, Calendar, Info } from "lucide-react";

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
  teamanzahl: number;
  teamgroeße: number;
  participants_count: number;
}

interface Participant {
  user_id: string;
  username: string;
  joined_at: string;
}

interface Match {
  id: string;
  team_a_name: string;
  team_b_name: string;
  is_played: boolean;
  played_at: string | null;
  winner_team_id: string | null;
  matchday: number;
}

export default function TournamentDetailsPage() {
  const { id } = useParams();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const resTournament = await fetch(`http://localhost:8000/tournaments/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const tournamentData = await resTournament.json();

        const resParticipants = await fetch(`http://localhost:8000/tournaments/${id}/participants`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const participantData = await resParticipants.json();

        const resMatches = await fetch(`http://localhost:8000/tournaments/${id}/matches`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const matchData = await resMatches.json();

        setTournament(tournamentData);
        setParticipants(participantData);
        setMatches(matchData);
      } catch (error) {
        console.error("Fehler beim Laden der Turnierdetails:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading || !tournament) return <p>Lade Turnierdetails...</p>;

  return (
    <div className="flex min-h-screen bg-[#252641] text-white">
      <FullSideBar which_Page="/tournaments/list" />
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold flex items-center gap-3 mb-4">
            <Trophy className="w-8 h-8" /> {tournament.name}
          </h1>
          <p className="text-gray-400 text-lg mb-2">{tournament.description}</p>
          <div className="text-sm text-gray-300 grid grid-cols-2 gap-y-1 mb-4">
            <p><strong>Spiel:</strong> {tournament.game}</p>
            <p><strong>Start:</strong> {new Date(tournament.start_time).toLocaleString("de-DE")}</p>
            <p><strong>Max. Spieler:</strong> {tournament.max_players}</p>
            <p><strong>Teamgröße:</strong> {tournament.teamgroeße}</p>
            <p><strong>Teamanzahl:</strong> {tournament.teamanzahl}</p>
            <p><strong>Erstellt von:</strong> {tournament.created_by_username}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Users className="w-6 h-6" /> Teilnehmer</h2>
          {participants.length > 0 ? (
            <ul>
              {participants.map((p) => (
                <li key={p.user_id} className="text-gray-300 mb-2">{p.username}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Keine Teilnehmer gefunden.</p>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Flag className="w-6 h-6" /> Matches</h2>
          {matches.length > 0 ? (
            <ul>
              {matches.map((m) => (
                <li key={m.id} className="text-gray-300 mb-2">
                  <span className="font-semibold">Matchday {m.matchday}:</span> {m.team_a_name} vs. {m.team_b_name} {m.is_played ? "(Beendet)" : "(Ausstehend)"}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Keine Matches gefunden.</p>
          )}
        </div>
      </div>
    </div>
  );
}
