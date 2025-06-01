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
  entry_fee: number;
  timezone: string;
  check_in_required: boolean;
  rules: string;
  mode: string;
  scoring_system: string;
  registration_start: string;
  registration_end: string;
  is_public: boolean;
  invite_only: boolean;
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
  team_a_id?: string;  
  team_b_id?: string;  
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
  const [editedTeamNames, setEditedTeamNames] = useState<Record<string, { teamA: string; teamB: string }>>({});
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const isParticipant = Array.isArray(participants) && participants.some(p => p.username === currentUsername);



  const [joining, setJoining] = useState(false);

const handleJoin = async () => {
  try {
    setJoining(true);
    const res = await fetch(`http://localhost:8000/tournaments/${id}/join`, {
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
    window.location.reload(); // Optional: Seite neu laden
  } catch (err) {
    console.error(err);
    alert("Fehler beim Beitritt.");
  } finally {
    setJoining(false);
  }
};

const handleTeamNameChange = (matchId: string, team: 'A' | 'B', value: string) => {
  const existing = editedTeamNames[matchId];
  const match = matches.find(m => m.id === matchId);
  if (!match) return;

  setEditedTeamNames(prev => ({
    ...prev,
    [matchId]: {
      teamA: team === 'A' ? value : existing?.teamA ?? match.team_a_name,
      teamB: team === 'B' ? value : existing?.teamB ?? match.team_b_name,
    },
  }));

  setMatches(prev => prev.map(m =>
    m.id === matchId
      ? {
          ...m,
          team_a_name: team === 'A' ? value : m.team_a_name,
          team_b_name: team === 'B' ? value : m.team_b_name,
        }
      : m
  ));
};


const saveTeamNames = async (matchId: string) => {
  const names = editedTeamNames[matchId];
  if (!names) return;

  // Wenn ein Teamname leer ist, sende ihn NICHT mit (sonst wird z. B. team_b_id überschrieben)
  const payload: any = {};
  if (names.teamA && names.teamA.trim() !== "") {
    payload.team_a_name = names.teamA;
  }
  if (names.teamB && names.teamB.trim() !== "") {
    payload.team_b_name = names.teamB;
  }

  if (Object.keys(payload).length === 0) return; // nichts zu speichern

  try {
    const res = await fetch(`http://localhost:8000/tournaments/${id}/matches/${matchId}/rename-teams`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || "Fehler beim Speichern");
    }

    console.log("Teamnamen erfolgreich gespeichert");
  } catch (error) {
    console.error("Fehler beim Speichern der Teamnamen:", error);
  }
};



  const submitResult = async (matchId: string, winnerName: string | null) => {
    try {
    const match = matches.find(m => m.id === matchId);
    if (!match) return;

    let winnerTeamId: string | null = null;
    if (winnerName === match.team_a_name) {
      winnerTeamId = match.team_a_id!;
    } else if (winnerName === match.team_b_name) {
      winnerTeamId = match.team_b_id!;
    }

    const res = await fetch(`http://localhost:8000/tournaments/${id}/matches/${matchId}/result`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ winner_team_id: winnerTeamId }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      alert(errorData.detail || "Fehler beim Eintragen.");
      return;
  }


    // Nach erfolgreicher Speicherung: Matchliste aktualisieren
    setMatches(prev =>
      prev.map(m =>
        m.id === matchId
          ? { ...m, is_played: true, winner_team_id: winnerTeamId, played_at: new Date().toISOString() }
          : m
      )
    );
  } catch (error) {
    console.error("Fehler beim Speichern:", error);
  }
};

useEffect(() => {
  if (!id) return;

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch("http://localhost:8000/profile/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Fehler beim Laden des Benutzers");

      const data = await res.json();
      setCurrentUsername(data.username);
      setIsAdmin(data.is_admin ?? false); // Falls `is_admin` im Backend existiert
    } catch (err) {
      console.error("Fehler beim Laden des aktuellen Benutzers:", err);
    }
  };

  const fetchData = async () => {
    await fetchCurrentUser(); // 👈 zuerst Benutzer laden

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

      // Matches propagieren
      const propagatedMatches = [...matchData];

      setMatches(propagatedMatches);
    } catch (error) {
      console.error("Fehler beim Laden der Turnierdetails:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [id]);


  if (loading || !tournament) return <p>Lade Turnierdetails...</p>;

  const saveAllTeamNames = async () => {
  try {
    for (const matchId of Object.keys(editedTeamNames)) {
      await saveTeamNames(matchId);
    }
    alert("Alle Teamnamen wurden gespeichert.");
  } catch (error) {
    console.error("Fehler beim Speichern aller Teamnamen:", error);
  }
};

const isOwnerOrAdmin = currentUsername === tournament.created_by_username || isAdmin;

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
            <p><strong>Dauer:</strong> {tournament.duration_minutes} Minuten</p>
            <p><strong>Gebühr:</strong> {tournament.entry_fee} €</p>
            <p><strong>Zeitzone:</strong> {tournament.timezone}</p>
            <p><strong>Check-In:</strong> {tournament.check_in_required ? "Ja" : "Nein"}</p>
            <p><strong>Regeln:</strong> {tournament.rules}</p>
            <p><strong>Modus:</strong> {tournament.mode}</p>
            <p><strong>Scoring:</strong> {tournament.scoring_system}</p>
            <p><strong>Registrierung:</strong> {new Date(tournament.registration_start).toLocaleString("de-DE")} – {new Date(tournament.registration_end).toLocaleString("de-DE")}</p>
            <p><strong>Sichtbarkeit:</strong> {tournament.is_public ? "Öffentlich" : "Privat"}</p>
            <p><strong>Nur mit Einladung:</strong> {tournament.invite_only ? "Ja" : "Nein"}</p>
          </div>
        </div>

        {!isParticipant && (
        <div className="mb-8">
          <button
            className="px-5 py-2 bg-[#dd17c9] hover:bg-[#aa0d9d] rounded-full text-white font-bold text-sm"
            onClick={handleJoin}
            disabled={joining}
          >
            {joining ? "Wird beigetreten..." : "JETZT ANMELDEN"}
          </button>
        </div>
      )}


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
          {isOwnerOrAdmin && (
            <div className="flex mb-2">
              <button
                className="bg-purple-600 px-4 py-2 rounded text-white text-sm hover:bg-purple-700"
                onClick={saveAllTeamNames}
              >
                Alle Teamnamen speichern
              </button>
            </div>
          )}


          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Flag className="w-6 h-6" /> Matches</h2>
          {matches.length > 0 ? (
            <ul>

        {matches.map((m) => {
        const names = m.is_played
        ? { teamA: m.team_a_name, teamB: m.team_b_name } 
        : editedTeamNames[m.id] || { teamA: m.team_a_name, teamB: m.team_b_name };

        const winnerName =
          m.winner_team_id === m.team_a_id
            ? m.team_a_name
            : m.winner_team_id === m.team_b_id
            ? m.team_b_name
            : null;

        const isDraw = m.is_played && !m.winner_team_id;

        return (
          <div key={m.id} className="text-gray-300 mb-4 border-b pb-2">
            <p className="mb-1">
              <span className="font-semibold">Matchday {m.matchday}:</span>{" "}
              <input
                className="bg-gray-700 border border-gray-500 px-2 py-1 rounded mr-1 text-white"
                value={names.teamA}
                onChange={(e) => handleTeamNameChange(m.id, "A", e.target.value)}
                placeholder="Team A"
                disabled={m.is_played || !isOwnerOrAdmin}
              />{" "}
              vs.{" "}
              <input
                className="bg-gray-700 border border-gray-500 px-2 py-1 rounded mr-1 text-white"
                value={names.teamB}
                onChange={(e) => handleTeamNameChange(m.id, "B", e.target.value)}
                placeholder="Team B"
                disabled={m.is_played || !isOwnerOrAdmin}
              />
              {m.is_played ? (
                <span className="ml-2 text-green-400 font-bold">(Beendet)</span>
              ) : (
                <span className="ml-2 text-yellow-400">(Ausstehend)</span>
              )}
            </p>

            {!m.is_played && isOwnerOrAdmin ? (
              <div className="flex gap-2 mt-1">
                <button
                  className="bg-green-600 px-3 py-1 rounded text-white text-sm hover:bg-green-700"
                  onClick={() => submitResult(m.id, names.teamA)}
                >
                  Sieger: {names.teamA}
                </button>
                <button
                  className="bg-blue-600 px-3 py-1 rounded text-white text-sm hover:bg-blue-700"
                  onClick={() => submitResult(m.id, names.teamB)}
                >
                  Sieger: {names.teamB}
                </button>
                <button
                  className="bg-gray-600 px-3 py-1 rounded text-white text-sm hover:bg-gray-700"
                  onClick={() => submitResult(m.id, null)}
                >
                  Unentschieden
                </button>
              </div>
            ) : (
              <div className="mt-2">
                {isDraw ? (
                  <span className="text-gray-400 italic">Unentschieden</span>
                ) : (
                <span className="text-green-400 font-bold">
                  Sieger: {winnerName}
                </span>

                )}
              </div>
            )}
          </div>
        );
      })}




            </ul>
          ) : (
            <p className="text-gray-500">Keine Matches gefunden.</p>
          )}
        </div>
      </div>
    </div>
  );
}
