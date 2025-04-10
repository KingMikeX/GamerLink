"use client";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    firstName: "Max",
    lastName: "Mustermann",
    email: "max@example.com",
    profileVisible: true,
    showEmail: false,
    image: null as string | null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
        setProfile((prev) => ({ ...prev, image: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setMessage("✅ Profil gespeichert.");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0D0F23] text-white px-4 py-8">
      <div className="max-w-3xl mx-auto bg-[#1A1C2D] p-8 rounded-2xl shadow-lg">
        <h1 className="mb-8 text-3xl font-bold text-center text-white">Profilverwaltung</h1>

        {/* Bild */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#D047FF] shadow-lg mb-3">
            {imagePreview ? (
              <img src={imagePreview} className="object-cover w-full h-full" alt="Profilbild" />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-300 bg-gray-700">Kein Bild</div>
            )}
          </div>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm" />
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            placeholder="Vorname"
            className="w-full bg-[#2A2C3E] text-white px-4 py-2 rounded-md border border-[#3F415A] focus:outline-none focus:ring-2 focus:ring-[#D047FF]"
          />
          <input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            placeholder="Nachname"
            className="w-full bg-[#2A2C3E] text-white px-4 py-2 rounded-md border border-[#3F415A] focus:outline-none focus:ring-2 focus:ring-[#D047FF]"
          />
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="E-Mail"
            className="w-full bg-[#2A2C3E] text-white px-4 py-2 rounded-md border border-[#3F415A] focus:outline-none focus:ring-2 focus:ring-[#D047FF]"
          />
        </div>

        {/* Datenschutz */}
        <div className="mt-6 space-y-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="profileVisible"
              checked={profile.profileVisible}
              onChange={handleChange}
              className="form-checkbox accent-[#D047FF] w-5 h-5"
            />
            <span>Profil für andere sichtbar</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="showEmail"
              checked={profile.showEmail}
              onChange={handleChange}
              className="form-checkbox accent-[#D047FF] w-5 h-5"
            />
            <span>E-Mail-Adresse anzeigen</span>
          </label>
        </div>

        {/* Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleSave}
            className="bg-[#D047FF] hover:bg-[#b43ede] text-white font-medium px-6 py-2 rounded-md shadow-lg transition"
          >
            Profil speichern
          </button>
          {message && <p className="mt-3 text-green-400">{message}</p>}
        </div>
      </div>
    </div>
  );
}
