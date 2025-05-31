'use client';
import React, { useEffect, useState } from 'react';
import FullSideBar from '@/components/FullSideBar';
import SendFriendRequest from '@/components/SendFriendRequest';

interface FriendRequest {
  id: string;
  sender_id: string;
  receiver_id: string;
  status: string;
  created_at: string;
  sender_name?: string;
  receiver_name?: string;
}

export default function FriendsPage() {
  const [incoming, setIncoming] = useState<FriendRequest[]>([]);
  const [sent, setSent] = useState<FriendRequest[]>([]);
  const [accepted, setAccepted] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const selectedPage = {
    0: '/user/profile',
    1: '/home',
    2: '/tournements/list',
    3: '/user/friends',
    4: '/games/all',
  };

  useEffect(() => {
    const fetchFriendData = async () => {
      try {
        const token = localStorage.getItem("token");
        const currentUserId = localStorage.getItem("user_id");

        const [incomingRes, sentRes, acceptedRes] = await Promise.all([
          fetch("http://localhost:8000/profile/friends/requests/incoming", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:8000/profile/friends/requests/sent", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:8000/profile/friends/list", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const incomingData: FriendRequest[] = await incomingRes.json();
        const sentData: FriendRequest[] = await sentRes.json();
        const acceptedData = await acceptedRes.json(); // PublicUserProfile[]

        const enrich = async (req: FriendRequest) => {
          const senderRes = await fetch(`http://localhost:8000/profile/by-id/${req.sender_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const receiverRes = await fetch(`http://localhost:8000/profile/by-id/${req.receiver_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const sender = senderRes.ok ? await senderRes.json() : {};
          const receiver = receiverRes.ok ? await receiverRes.json() : {};

          return {
            ...req,
            sender_name: sender.username || req.sender_id,
            receiver_name: receiver.username || req.receiver_id,
          };
        };

        const incoming = await Promise.all(incomingData.map(enrich));
        const sent = await Promise.all(sentData.map(enrich));

      const acceptedFormatted: FriendRequest[] = acceptedData.map((user: any) => ({
        id: user.friendship_id,
        sender_id: currentUserId || '',
        receiver_id: user.user_id,
        status: "accepted",
        created_at: "",
        sender_name: "Du",
        receiver_name: user.username,
      }));

        setIncoming(incoming);
        setSent(sent);
        setAccepted(acceptedFormatted);
      } catch (error) {
        console.error("Fehler beim Laden der Freundesdaten:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriendData();
  }, []);

  const handleAccept = async (requestId: string) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:8000/profile/friends/accept/${requestId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    location.reload();
  };

  const handleDecline = async (requestId: string) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:8000/profile/friends/decline/${requestId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    location.reload();
  };

  return (
    <div className="flex">
      <FullSideBar which_Page={selectedPage[3]} />

      <div className="flex-1 p-10 text-white">
        <h1 className="text-3xl font-bold mb-6">Freunde</h1>

        {loading ? (
          <p>Lade Freundesdaten...</p>
        ) : (
          <>
            <div className="mb-8">
              <SendFriendRequest />
            </div>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Eingehende Anfragen</h2>
              {incoming.length === 0 ? <p>Keine Anfragen.</p> : (
                <ul className="space-y-3">
                  {incoming.map(req => (
                    <li key={req.id} className="bg-[#1e1f3d] p-4 rounded-xl flex justify-between items-center">
                      <span>{req.sender_name}</span>
                      <div className="space-x-2">
                        <button onClick={() => handleAccept(req.id)} className="bg-green-600 px-3 py-1 rounded">Annehmen</button>
                        <button onClick={() => handleDecline(req.id)} className="bg-red-600 px-3 py-1 rounded">Ablehnen</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Gesendete Anfragen</h2>
              {sent.length === 0 ? <p>Keine gesendeten Anfragen.</p> : (
                <ul className="space-y-3">
                  {sent.map(req => (
                    <li key={req.id} className="bg-[#1e1f3d] p-4 rounded-xl">
                      <span>an {req.receiver_name} gesendet</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Akzeptierte Freunde</h2>
              {accepted.length === 0 ? <p>Keine Freunde.</p> : (
                <ul className="space-y-3">
                  {accepted.map(req => (
                    <li key={req.id} className="bg-[#1e1f3d] p-4 rounded-xl flex justify-between items-center">
                      <span>{req.receiver_name}</span>
                      <button
                        onClick={async () => {
                          const token = localStorage.getItem("token");
                          await fetch(`http://localhost:8000/profile/friends/remove/${req.id}`, {
                            method: "DELETE",
                            headers: { Authorization: `Bearer ${token}` },
                          });
                          location.reload(); // aktualisieren
                        }}
                        className="bg-red-600 px-3 py-1 rounded"
                      >
                        Entfernen
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
