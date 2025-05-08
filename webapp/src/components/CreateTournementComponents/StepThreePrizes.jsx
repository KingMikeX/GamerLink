// 5. /components/TournamentCreation/Step3Prizes.jsx - Schritt 3: Preise
import React, { useState } from 'react';

const Step3Prizes = ({ formData, updateFormData, onBack, onNext }) => {
  const [prizeType, setPrizeType] = useState('physical'); // 'physical', 'money', 'none'
  
  const handleAddPrize = () => {
    // Logik zum Hinzufügen eines neuen Preises
    const newPrize = {
      id: Date.now(),
      place: formData.prizes ? formData.prizes.length + 1 : 1,
      name: '',
      description: ''
    };
    
    updateFormData({
      ...formData,
      prizes: [...(formData.prizes || []), newPrize]
    });
  };
  
  return (
    <div className="bg-[#121428] mx-auto p-6 rounded-lg max-w-3xl">
      <h2 className="mb-6 font-semibold text-xl uppercase">Turnierpreise</h2>
      
      {/* Prize Type Selection */}
      <div className="flex space-x-6 mb-6">
        <div 
          className={`cursor-pointer pb-3 flex-1 text-center ${prizeType === 'physical' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-400'}`}
          onClick={() => setPrizeType('physical')}
        >
          <div className="font-medium uppercase">Sachpreise</div>
          <div className="mt-1 text-xs">Gegenstände als Preise</div>
        </div>
        
        <div 
          className={`cursor-pointer pb-3 flex-1 text-center ${prizeType === 'money' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-400'}`}
          onClick={() => setPrizeType('money')}
        >
          <div className="font-medium uppercase">Geldpreise</div>
          <div className="mt-1 text-xs">Bargeld oder Gutscheine</div>
        </div>
        
        <div 
          className={`cursor-pointer pb-3 flex-1 text-center ${prizeType === 'none' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-400'}`} 
          onClick={() => setPrizeType('none')}
        >
          <div className="font-medium uppercase">Keine Preise</div>
          <div className="mt-1 text-xs">Nur für den Spaß</div>
        </div>
      </div>
      
      <h3 className="mb-4 font-medium text-sm uppercase">Preise hinzufügen</h3>
      
      {/* Prize List */}
      <div className="space-y-4 mb-6">
        {/* 1st Place Prize */}
        <div className="bg-[#131320] p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <span className="mr-3 font-bold text-purple-500 text-xl">1.</span>
            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-white"
              placeholder="Preis für den ersten Platz"
              value="Gaming Headset XYZ Pro"
              onChange={(e) => {/* Update logic */}}
            />
          </div>
          <div className="pl-7">
            <input
              type="text"
              className="bg-transparent outline-none w-full text-gray-400 text-sm"
              placeholder="Beschreibung (optional)"
              value="Professionelles Gaming-Headset mit 7.1 Surround Sound und RGB-Beleuchtung."
              onChange={(e) => {/* Update logic */}}
            />
          </div>
        </div>
        
        {/* 2nd Place Prize */}
        <div className="bg-[#131320] p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <span className="mr-3 font-bold text-purple-500 text-xl">2.</span>
            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-white"
              placeholder="Preis für den zweiten Platz"
              value="Gaming Maus Ultra"
              onChange={(e) => {/* Update logic */}}
            />
          </div>
          <div className="pl-7">
            <input
              type="text"
              className="bg-transparent outline-none w-full text-gray-400 text-sm"
              placeholder="Beschreibung (optional)"
              value="Ergonomische Gaming-Maus mit 18.000 DPI und programmierbaren Tasten."
              onChange={(e) => {/* Update logic */}}
            />
          </div>
        </div>
        
        {/* 3rd Place Prize */}
        <div className="bg-[#131320] p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <span className="mr-3 font-bold text-purple-500 text-xl">3.</span>
            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-white"
              placeholder="Preis für den dritten Platz"
              value="T-Shirt + Mousepad"
              onChange={(e) => {/* Update logic */}}
            />
          </div>
          <div className="pl-7">
            <input
              type="text"
              className="bg-transparent outline-none w-full text-gray-400 text-sm"
              placeholder="Beschreibung (optional)"
              value="Limitiertes Gamertec T-Shirt und Premium Mousepad im Bundle."
              onChange={(e) => {/* Update logic */}}
            />
          </div>
        </div>
      </div>
      
      {/* Add More Prizes Button */}
      <button 
        className="bg-purple-600 hover:bg-purple-700 mb-6 py-3 rounded-lg w-full font-medium text-white"
        onClick={handleAddPrize}
      >
        + WEITERE PREISE HINZUFÜGEN
      </button>
      
      {/* Prize Image Upload */}
      <div className="mb-8">
        <h3 className="mb-3 font-medium text-sm uppercase">Preisbilder hochladen (optional)</h3>
        <div className="bg-[#131320] p-4 rounded-lg text-center">
          <div className="bg-[#0F0F1D] p-2 rounded-lg text-gray-400">
            Keine Datei ausgewählt.
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg font-medium text-white"
        >
          ZURÜCK
        </button>
        <button
          onClick={onNext}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-medium text-white"
        >
          WEITER
        </button>
      </div>
    </div>
  );
};

export default Step3Prizes;