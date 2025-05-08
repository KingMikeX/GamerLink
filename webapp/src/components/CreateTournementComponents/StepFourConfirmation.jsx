// 6. /components/TournamentCreation/Step4Confirmation.jsx - Schritt 4: Bestätigung
import React from 'react';

const Step4Confirmation = ({ formData, onBack, onSubmit }) => {
  return (
    <div className="bg-[#121428] mx-auto p-6 rounded-lg max-w-3xl">
      <h2 className="mb-6 font-semibold text-xl uppercase">Turnierbestätigung</h2>
      
      {/* Tournament Quick Info */}
      <div className="flex justify-around items-center bg-[#131320] mb-6 px-4 py-3 rounded-lg">
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">CS:GO</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">5v5</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">Single Elimination</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">20.04.2025</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">18:00</span>
        </div>
      </div>
      
      {/* Tournament Card Preview */}
      <div className="mb-8">
        <div className="bg-gray-200 mb-2 rounded-lg overflow-hidden">
          {/* Tournament Banner Image Placeholder */}
          <div className="flex justify-center items-center bg-gray-300 h-48">
            <div className="bg-white p-2 rounded text-gray-500">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          
          {/* Tournament Title & Info */}
          <div className="bg-purple-600 px-4 py-3 text-white">
            <h3 className="font-bold text-xl">CSGO Summer Cup 2025</h3>
            <p className="text-sm">Veranstaltet von GamerLink Team | 16 Teams</p>
          </div>
        </div>
        
        {/* Tournament Description */}
        <div className="bg-[#131320] p-4 rounded-lg">
          <p>Der ultimative CSGO-Wettbewerb für ambitionierte Teams. Zeigt euer Können und kämpft um attraktive Preise!</p>
        </div>
      </div>
      
      {/* Tournament Details */}
      <div className="mb-8">
        <h3 className="mb-4 font-medium text-lg uppercase">Grundinformationen</h3>
        
        <div className="gap-4 grid grid-cols-2">
          <div className="flex flex-col">
            <label className="text-gray-400 text-sm">Turniername</label>
            <div className="bg-[#131320] mt-1 px-3 py-2 rounded">CSGO SUMMER CUP 2025</div>
          </div>
          
          <div className="flex flex-col">
            <label className="text-gray-400 text-sm">Spiel</label>
            <div className="bg-[#131320] mt-1 px-3 py-2 rounded">COUNTER-STRIKE: GLOBAL OFFENSIVE</div>
          </div>
          
          <div className="flex flex-col">
            <label className="text-gray-400 text-sm">Format</label>
            <div className="bg-[#131320] mt-1 px-3 py-2 rounded">5v5, SINGLE ELIMINATION</div>
          </div>
          
          <div className="flex flex-col">
            <label className="text-gray-400 text-sm">Maximale Teams</label>
            <div className="bg-[#131320] mt-1 px-3 py-2 rounded">16</div>
          </div>
          
          <div className="flex flex-col">
            <label className="text-gray-400 text-sm">Punktesystem</label>
            <div className="bg-[#131320] mt-1 px-3 py-2 rounded">STANDARD (GEWINNER: 3/UNENTSCHIEDEN:1/VERLIERER:0)</div>
          </div>
          
          <div className="flex flex-col">
            <label className="text-gray-400 text-sm">Turnierregeln</label>
            <div className="bg-[#131320] mt-1 px-3 py-2 rounded">........</div>
          </div>
          
          <div className="flex flex-col">
            <label className="text-gray-400 text-sm">Anmeldestart</label>
            <div className="bg-[#131320] mt-1 px-3 py-2 rounded">15.04.2025, 08:00</div>
          </div>
          
          <div className="flex flex-col">
            <label className="text-gray-400 text-sm">Anmeldeende</label>
            <div className="bg-[#131320] mt-1 px-3 py-2 rounded">30.04.2025, 23:59</div>
          </div>
          
          <div className="flex flex-col">
            <label className="text-gray-400 text-sm">Teilnahmegebühr</label>
            <div className="bg-[#131320] mt-1 px-3 py-2 rounded">$ 0</div>
          </div>
          
          <div className="col-span-2">
            <div className="bg-[#131320] mt-1 px-3 py-2 rounded uppercase">ÖFFENTLICHES TURNIER</div>
          </div>
          
          <div className="col-span-2">
            <div className="bg-[#131320] mt-1 px-3 py-2 rounded uppercase">KEINE EINLADUNG</div>
          </div>
          
          <div className="col-span-2">
            <div className="bg-[#131320] mt-1 px-3 py-2 rounded uppercase">CHECK-IN ERFORDERLICH</div>
          </div>
          
          <div className="col-span-2">
            <label className="text-gray-400 text-sm">Zusätzliche Informationen</label>
            <div className="bg-[#131320] mt-1 px-3 py-2 rounded">........</div>
          </div>
        </div>
      </div>
      
      {/* Schedule Details */}
      <div className="mb-8">
        <h3 className="mb-4 font-medium text-lg uppercase">Zeitplanung</h3>
        
        <div className="gap-4 grid grid-cols-2">
          <div className="flex flex-col">
            <label className="text-gray-400 text-sm">Startdatum</label>
            <div className="bg-[#131320] mt-1 px-3 py-2 rounded">20.04.2025</div>
          </div>
          
          <div className="flex flex-col">
            <label className="text-gray-400 text-sm">Startzeit</label>
            <div className="bg-[#131320] mt-1 px-3 py-2 rounded">18:00</div>
          </div>
          
          <div className="flex flex-col">
            <label className="text-gray-400 text-sm">Zeitzone</label>
            <div className="bg-[#131320] mt-1 px-3 py-2 rounded">MITTELEUROPÄISCHE ZEIT (CET/CEST)</div>
          </div>
          
          <div className="flex flex-col">
            <label className="text-gray-400 text-sm">Matchdauer</label>
            <div className="bg-[#131320] mt-1 px-3 py-2 rounded">30 MINUTEN</div>
          </div>
          
          <div className="flex flex-col">
            <label className="text-gray-400 text-sm">Pause</label>
            <div className="bg-[#131320] mt-1 px-3 py-2 rounded">15 MINUTEN</div>
          </div>
          
          <div className="flex flex-col">
            <label className="text-gray-400 text-sm">Rundenzeitplan</label>
            <div className="bg-[#131320] mt-1 px-3 py-2 rounded">.......</div>
          </div>
          
          <div className="flex flex-col">
            <label className="text-gray-400 text-sm">Turnierbracket</label>
            <div className="bg-[#131320] mt-1 px-3 py-2 rounded">.......</div>
          </div>
        </div>
      </div>
      
      {/* Prize Details */}
      <div className="mb-8">
        <h3 className="mb-4 font-medium text-lg uppercase">Preise</h3>
        
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="mr-3 font-bold text-purple-500">1. PREIS:</span>
            <span>Gaming Headset XYZ Pro</span>
          </div>
          
          <div className="flex items-center">
            <span className="mr-3 font-bold text-purple-500">2. PREIS:</span>
            <span>Gaming Maus Ultra</span>
          </div>
          
          <div className="flex items-center">
            <span className="mr-3 font-bold text-purple-500">3. PREIS:</span>
            <span>T-Shirt + Mousepad</span>
          </div>
        </div>
      </div>
      
      {/* Agreement & Submit */}
      <div className="mb-6 text-gray-400 text-sm">
        <p>Mit dem Erstellen des Turniers stimmst du den Nutzungsbedingungen von GamerLink zu. Bitte stelle sicher, dass alle Angaben korrekt sind, da nachträgliche Änderungen nur eingeschränkt möglich sind.</p>
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
          onClick={onSubmit}
          className="bg-purple-600 hover:bg-purple-700 px-10 py-2 rounded-lg font-medium text-white"
        >
          TURNIER ERSTELLEN
        </button>
      </div>
    </div>
  );
};

export default Step4Confirmation;