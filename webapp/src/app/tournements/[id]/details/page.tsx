"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function TournamentDetailsPage() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const res = await fetch(`http://localhost:8000/tournaments/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setTournament(data);
    };

    fetchData();
  }, [id]);

  return (
    <div className="text-white p-8">
      <h1 className="text-3xl font-bold">Turnierdetails</h1>
      {tournament ? (
        <pre>{JSON.stringify(tournament, null, 2)}</pre>
      ) : (
        <p>Lade...</p>
      )}
    </div>
  );
}
