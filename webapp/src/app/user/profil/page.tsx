"use client";
import { useState } from "react";

// Typdefinition für den Profile-Zustand
interface ProfileState {
  image?: string;
  username: string;
  email: string;
  about: string;
  location: string;
  birthdate: string;
  games: string[];
  newGame: string;
  platform: string;
  playstyle: string;
  languages: string[];
  newLanguage: string;
  discord: string;
  steam: string;
  twitch: string;
  youtube: string;
  privacy: {
    public: boolean;
    online: boolean;
    emailNotifications: boolean;
    friendRequests: boolean;
  };
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileState>({
    image: "",
    username: "",
    email: "",
    about: "",
    location: "",
    birthdate: "",
    games: [],
    newGame: "",
    platform: "",
    playstyle: "",
    languages: [],
    newLanguage: "",
    discord: "",
    steam: "",
    twitch: "",
    youtube: "",
    privacy: {
      public: false,
      online: false,
      emailNotifications: false,
      friendRequests: false,
    },
  });

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddGame = () => {
    if (profile.newGame.trim()) {
      setProfile((prev) => ({
        ...prev,
        games: [...prev.games, prev.newGame.trim()],
        newGame: "",
      }));
    }
  };

  const handleRemoveGame = (gameToRemove: string) => {
    setProfile((prev) => ({
      ...prev,
      games: prev.games.filter((game) => game !== gameToRemove),
    }));
  };

  const handleAddLanguage = () => {
    if (profile.newLanguage.trim()) {
      setProfile((prev) => ({
        ...prev,
        languages: [...prev.languages, prev.newLanguage.trim()],
        newLanguage: "",
      }));
    }
  };

  const handleRemoveLanguage = (langToRemove: string) => {
    setProfile((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang !== langToRemove),
    }));
  };

  return (
    <div className="min-h-screen flex font-sans text-white bg-[#252641]">
      <aside className="w-[260px] min-h-screen bg-[#1A1B2E] px-4 py-6 flex flex-col items-center text-sm sticky top-0">
        <div className="flex flex-col items-center mb-6">
        <label htmlFor="profileImage" className="relative w-[150px] h-[150px] bg-[#20223A] rounded-full flex items-center justify-center text-sm mb-2 cursor-pointer overflow-hidden">
  {profile.image ? (
    <img src={profile.image} alt="Profilbild" className="w-full h-full object-cover rounded-full" />
  ) : (
    <span className="text-white text-sm">150 x 150</span>
  )}
  <div className="absolute bottom-0 right-0 w-9 h-9 bg-pink-400 rounded-full flex items-center justify-center shadow-lg">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13h3l10-10m-6 6l-4 4m0 0H9v-3m0 3v3h3" />
    </svg>
  </div>
  <input
    id="profileImage"
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfile((prev) => ({ ...prev, image: reader.result as string }));
        };
        reader.readAsDataURL(file);
      }
    }}
    className="hidden"
  />
</label>
          <span className="text-md font-semibold">{profile.username || "BENUTZERNAME"}</span>
          <span className="text-xs text-gray-400">BEARBEITE DEIN PROFIL</span>
        </div>
        <nav className="flex flex-col space-y-2 w-full">
          <button onClick={() => handleScrollTo("section-personal")} className="text-left w-full py-2 px-4 rounded-md bg-[#252641] hover:bg-[#1F213A]">PERSÖNLICHE INFOS</button>
          <button onClick={() => handleScrollTo("section-gaming")} className="text-left w-full py-2 px-4 rounded-md bg-[#252641] hover:bg-[#1F213A]">GAMING-PRÄFERENZEN</button>
          <button onClick={() => handleScrollTo("section-social")} className="text-left w-full py-2 px-4 rounded-md bg-[#252641] hover:bg-[#1F213A]">VERBINDUNGEN</button>
          <button onClick={() => handleScrollTo("section-privacy")} className="text-left w-full py-2 px-4 rounded-md bg-[#252641] hover:bg-[#1F213A]">DATENSCHUTZ</button>
        </nav>
        <div className="mt-auto pt-10 text-xs text-gray-400">Einstellungen</div>
      </aside>

      <main className="flex-1 overflow-y-auto px-8 py-10 space-y-16">
        <section id="section-personal">
          <h2 className="text-[#da4ecc] text-sm font-bold border-b border-[#2E314A] pb-2 mb-4">PERSÖNLICHE INFORMATIONEN</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-white">Benutzername</label>
              <input name="username" value={profile.username} onChange={handleChange} className="bg-[#1A1C2D] px-4 py-2  mr-70 rounded-lg" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold text-white">E-Mail-Adresse</label>
              <input name="email" value={profile.email} onChange={handleChange} className="bg-[#1A1C2D] px-4 py-2 mr-70 rounded-md" />
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm font-bold text-white">Über mich</label>
            <textarea name="about" value={profile.about} onChange={handleChange} className="w-full bg-[#1A1C2D] p-4 rounded-md h-28" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-white">Standort</label>
              <input name="location" value={profile.location} onChange={handleChange} className="bg-[#1A1C2D] px-4 py-2 mr-70 rounded-md" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold text-white">Geburtsdatum</label>
              <input name="birthdate" type="date" value={profile.birthdate} onChange={handleChange} className="bg-[#1A1C2D] mr-70 px-4 py-2 rounded-md" />
            </div>
          </div>
        </section>
        <section id="section-gaming">
          <h2 className="text-[#da4ecc] text-sm font-bold border-b border-[#2E314A] pb-2 mb-4">GAMING-PROFIL</h2>
          <div className="flex flex-col mb-2">
            <label className="text-sm font-bold text-white">Lieblingsspiele</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {profile.games.map((game, index) => (
                <span key={index} className="bg-[#2A2C3E] px-3 py-1 rounded-full text-xs">
                  {game} <button onClick={() => handleRemoveGame(game)} className="ml-1 text-pink-400">×</button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label className="text-sm font-bold text-white">Neues Spiel</label>
            <div className="flex gap-2">
              <input name="newGame" value={profile.newGame} onChange={handleChange} className="bg-[#1A1C2D] px-4 py-2 rounded-md w-full mr-130" />
              <button onClick={handleAddGame} className="bg-[#dd17c9] hover:bg-pink-600 px-6 py-2 rounded-md text-xs">HINZUFÜGEN</button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-white">Hauptplattform</label>
              <select name="platform" value={profile.platform} onChange={handleChange} className="bg-[#1A1C2D] px-4 py-2 rounded-md mr-70">
                <option value="">Bitte wählen</option>
                <option value="PC">PC</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Xbox">Xbox</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold text-white">Spielstil</label>
              <select name="playstyle" value={profile.playstyle} onChange={handleChange} className="bg-[#1A1C2D] px-4 py-2 rounded-md mr-70">
                <option value="">Bitte wählen</option>
                <option value="COMPETETIV">COMPETETIV</option>
                <option value="CASUAL">CASUAL</option>
                <option value="KOOP">KOOP</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <label className="text-sm font-bold text-white">Sprachen</label>
            <div className="flex gap-2 flex-wrap mt-1">
              {profile.languages.map((lang, index) => (
                <span key={index} className="bg-[#2A2C3E] px-3 py-1 rounded-full text-xs">
                  {lang} <button onClick={() => handleRemoveLanguage(lang)} className="ml-1 text-pink-400">×</button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-white">Neue Sprache hinzufügen</label>
            <div className="flex gap-2">
              <input name="newLanguage" value={profile.newLanguage} onChange={handleChange} className="bg-[#1A1C2D] px-4 py-2 rounded-md w-full mr-130" />
              <button onClick={handleAddLanguage} className="bg-[#dd17c9] hover:bg-pink-600 px-6 py-2 rounded-md text-xs ml">HINZUFÜGEN</button>
            </div>
          </div>
        </section>

        <section id="section-social">
          <h2 className="text-[#da4ecc] text-sm font-bold border-b border-[#2E314A] pb-2 mb-4">SOCIAL MEDIA & GAMING ACCOUNT</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-white">Discord</label>
              <input name="discord" value={profile.discord} onChange={handleChange} className="bg-[#1A1C2D] px-4 py-2 rounded-md" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold text-white">Steam</label>
              <input name="steam" value={profile.steam} onChange={handleChange} className="bg-[#1A1C2D] px-4 py-2 rounded-md" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold text-white">Twitch</label>
              <input name="twitch" value={profile.twitch} onChange={handleChange} className="bg-[#1A1C2D] px-4 py-2 rounded-md" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold text-white">YouTube</label>
              <input name="youtube" value={profile.youtube} onChange={handleChange} className="bg-[#1A1C2D] px-4 py-2 rounded-md" />
            </div>
          </div>
        </section>

        <section id="section-privacy">
          <h2 className="text-[#da4ecc] text-sm font-bold border-b border-[#2E314A] pb-2 mb-4">PRIVATSPHÄRE-EINSTELLUNGEN</h2>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input type="checkbox" checked={profile.privacy.public} onChange={() => setProfile(p => ({ ...p, privacy: { ...p.privacy, public: !p.privacy.public } }))} className="accent-pink-500 w-5 h-5" />
              <span className="text-white font-semibold">Profil öffentlich sichtbar</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" checked={profile.privacy.online} onChange={() => setProfile(p => ({ ...p, privacy: { ...p.privacy, online: !p.privacy.online } }))} className="accent-pink-500 w-5 h-5" />
              <span className="text-white font-semibold">Online-Status anzeigen</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" checked={profile.privacy.emailNotifications} onChange={() => setProfile(p => ({ ...p, privacy: { ...p.privacy, emailNotifications: !p.privacy.emailNotifications } }))} className="accent-pink-500 w-5 h-5" />
              <span className="text-white font-semibold">E-Mail-Benachrichtigungen erhalten</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" checked={profile.privacy.friendRequests} onChange={() => setProfile(p => ({ ...p, privacy: { ...p.privacy, friendRequests: !p.privacy.friendRequests } }))} className="accent-pink-500 w-5 h-5" />
              <span className="text-white font-semibold">Freundschaftsanfragen erlauben</span>
            </label>
          </div>
        </section>
        <section className="border-t border-[#2E314A] pt-6 mt-10 flex justify-end gap-4">
        <button className="px-6 py-2 rounded-md bg-[#1F213A] text-white hover:bg-[#2E314A]">ABBRECHEN</button>
        <button className="px-6 py-2 rounded-md bg-[#dd17c9] text-white hover:bg-pink-600">ÄNDERUNGEN SPEICHERN</button>
</section>
      </main>
    </div>
  );
}