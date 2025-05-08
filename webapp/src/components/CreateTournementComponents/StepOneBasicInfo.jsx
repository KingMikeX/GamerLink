// 3. /components/TournamentCreation/Step1BasicInfo.jsx - Schritt 1: Grundinfo
import React, { useState } from 'react';

const Step1BasicInfo = ({ formData, updateFormData, onNext }) => {
  const [gameSearchQuery, setGameSearchQuery] = useState('');
  
  const teamSizeOptions = [
    { id: '1v1', label: '1v1' , size: 1},
    { id: '2v2', label: '2v2' , size: 2},
    { id: '5v5', label: '5v5' , size: 5},
    { id: 'custom', label: 'CUSTOM' },
  ];
  
  const handleTeamSizeChange = (id) => {
    let size = 0;
    for (let option of teamSizeOptions) {
      if (option.id === id) {
        size = option.size;
        break;
      }
    }

    updateFormData({ 
      ...formData, 
      teamSize: size 
    });
  };
  
  return (
    <div className="bg-[#121428] mx-auto p-6 rounded-lg max-w-3xl">
      <h2 className="mb-6 font-semibold text-xl uppercase">Turnierformat</h2>
      
      {/* Game Selection */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <button className="flex items-center space-x-2 bg-[#131320] hover:bg-[#1A1A2E] px-4 py-2 rounded-lg text-sm">
            <span>CS:GO</span>
            <span className="ml-2">⊙</span>
          </button>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="NACH SPIEL SUCHEN..."
            className="bg-[#44224A] px-4 py-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-full text-sm"
            value={gameSearchQuery}
            onChange={(e) => setGameSearchQuery(e.target.value)}
          />
          <span className="top-1/2 left-3 absolute text-gray-400 -translate-y-1/2 transform">🔍</span>
        </div>
      </div>
      
      {/* Team Size */}
      <div className="mb-6">
        <h3 className="mb-2 font-medium text-gray-400 text-sm uppercase">Teamgröße</h3>
        <div className="flex space-x-2">
          {teamSizeOptions.map(option => (
            <button
              key={option.id}
              className={`px-4 py-2 rounded-lg text-sm ${
                formData.teamSize === option.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-[#131320] text-gray-300 hover:bg-[#1A1A2E]'
              }`}
              onClick={() => handleTeamSizeChange(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Max Teams */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-400 text-sm uppercase">Maximale Anzahl Teams/Spieler</h3>
          <div className="flex items-center bg-[#131320] rounded-lg">
            <span className="px-3 py-1">16 TEAMS</span>
            <button className="px-2 py-1 text-gray-400">▼</button>
          </div>
        </div>
        <div className="text-gray-400 text-xs">Die maximale Anzahl an Teams, die teilnehmen können.</div>
      </div>
      
      {/* Point System */}
      <div className="mb-6">
        <h3 className="mb-2 font-medium text-gray-400 text-sm uppercase">Punktesystem</h3>
        <div className="bg-[#131320] px-4 py-3 rounded-lg text-sm">
          STANDARD (GEWINNER: 3/UNENTSCHIEDEN:1/VERLIERER:0)
        </div>
      </div>
      
      {/* Tournament Rules */}
      <div className="mb-6">
        <h3 className="mb-2 font-medium text-gray-400 text-sm uppercase">Turnierregeln</h3>
        <div className="bg-[#131320] px-6 py-4 rounded-lg text-sm">
        <textarea
          className="p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 w-full h-32"
          placeholder="Gib hier deine Regeln ein ..."/>
        </div>
      </div>
      
      {/* Participation Requirements */}
      <div className="mb-6">
        <h2 className="mb-4 font-semibold text-xl uppercase">Teilnahmebedingungen</h2>
        
        <div className="gap-6 grid grid-cols-2 mb-6">
          {/* Registration Start */}
          <div>
            <h3 className="mb-2 font-medium text-gray-400 text-xs uppercase">Anmeldung Start</h3>
            <div className="flex items-center">
              <div className="flex-1 bg-[#131320] mr-2 p-3 rounded-lg">
                <input
                  type="text"
                  className="bg-transparent outline-none w-full"
                  placeholder="15.04.2025, 08:00"
                  value={formData.registrationStart || ''}
                  onChange={(e) => updateFormData({ 
                    ...formData, 
                    registrationStart: e.target.value 
                  })}
                />
              </div>
              <button className="bg-[#131320] p-3 rounded-lg text-gray-400">
                📅
              </button>
            </div>
          </div>
          
          {/* Registration End */}
          <div>
            <h3 className="mb-2 font-medium text-gray-400 text-xs uppercase">Anmeldung Ende</h3>
            <div className="flex items-center">
              <div className="flex-1 bg-[#131320] mr-2 p-3 rounded-lg">
                <input
                  type="text"
                  className="bg-transparent outline-none w-full"
                  placeholder="30.04.2025, 23:59"
                  value={formData.registrationEnd || ''}
                  onChange={(e) => updateFormData({ 
                    ...formData, 
                    registrationEnd: e.target.value 
                  })}
                />
              </div>
              <button className="bg-[#131320] p-3 rounded-lg text-gray-400">
                📅
              </button>
            </div>
          </div>
        </div>
        
        {/* Entry Fee */}
        <div className="mb-6">
          <h3 className="mb-2 font-medium text-gray-400 text-xs uppercase">Teilnahmegebühr</h3>
          <div className="flex items-center">
            <div className="flex-1 bg-[#131320] p-3 rounded-lg">
              <input
                type="text"
                className="bg-transparent outline-none w-full"
                placeholder="0"
                value={formData.entryFee || ''}
                onChange={(e) => updateFormData({ 
                  ...formData, 
                  entryFee: e.target.value 
                })}
              />
            </div>
          </div>
        </div>
        
        {/* Participation Options */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="publicTournament" 
              className="hidden" 
              checked={formData.isPublic}
              onChange={() => updateFormData({ 
                ...formData, 
                isPublic: !formData.isPublic 
              })}
            />
            <label htmlFor="publicTournament" className="flex items-center cursor-pointer">
              <div className={`w-10 h-5 flex items-center rounded-full p-1 ${formData.isPublic ? 'bg-purple-600' : 'bg-gray-700'}`}>
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${formData.isPublic ? 'translate-x-5' : ''}`}></div>
              </div>
              <span className="ml-3 text-sm">ÖFFENTLICHES TURNIER (jeder kann teilnehmen)</span>
            </label>
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="inviteOnly" 
              className="hidden" 
              checked={formData.inviteOnly}
              onChange={() => updateFormData({ 
                ...formData, 
                inviteOnly: !formData.inviteOnly 
              })}
            />
            <label htmlFor="inviteOnly" className="flex items-center cursor-pointer">
              <div className="flex justify-center items-center mr-3 border border-gray-400 rounded-full w-5 h-5">
                {formData.inviteOnly && <div className="bg-white rounded-full w-3 h-3"></div>}
              </div>
              <span className="text-sm">AUF EINLADUNG (nur eingeladene Spieler können teilnehmen)</span>
            </label>
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="checkInRequired" 
              className="hidden" 
              checked={formData.checkInRequired}
              onChange={() => updateFormData({ 
                ...formData, 
                checkInRequired: !formData.checkInRequired 
              })}
            />
            <label htmlFor="checkInRequired" className="flex items-center cursor-pointer">
              <div className={`w-10 h-5 flex items-center rounded-full p-1 ${formData.checkInRequired ? 'bg-purple-600' : 'bg-gray-700'}`}>
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${formData.checkInRequired ? 'translate-x-5' : ''}`}></div>
              </div>
              <span className="ml-3 text-sm">CHECK-IN ERFORDERLICH (Spieler müssen vor dem Turnier einchecken)</span>
            </label>
          </div>
        </div>
        
        {/* Additional Requirements */}
        <div>
          <h3 className="mb-2 font-medium text-gray-400 text-sm uppercase">Zusätzliche Anforderungen</h3>
          <div className="space-y-2 bg-[#131320] px-4 py-4 rounded-lg text-sm">
            <textarea
            className="p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 w-full h-32"
            placeholder="Anforderungen wie bspw. Discord zur Turnierorganisation und Kommunikation etc."/>
          </div>
        </div>
      </div>
      
      {/* Transparency Notice */}
      <div className="bg-[#22172C] mb-6 p-4 border-purple-500 border-l-4 text-sm">
        <h3 className="font-medium text-purple-400">TIPP: TRANSPARENZ UND FORMAT</h3>
        <p className="mt-1 text-gray-300">
          Wähle ein Format, das für dich und die erwarteten Teilnehmer passt. Ein gutes Turnier (12+ Teams) 
          startet mit Gruppen (Division) oder Swiss System, um mehr Spannende Spiele zu garantieren.
        </p>
      </div>
      
      {/* Navigation */}
      <div className="flex justify-end">
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

export default Step1BasicInfo;