// 4. /components/TournamentCreation/Step2Schedule.jsx - Schritt 2: Zeitplan
import React, { useState } from 'react';

const Step2Schedule = ({ formData, updateFormData, onBack, onNext }) => {
  const [showAddRound, setShowAddRound] = useState(false);
  
  return (
    <div className="bg-[#121428] mx-auto p-6 rounded-lg max-w-3xl">
      <h2 className="mb-6 font-semibold text-xl uppercase">Zeitplan</h2>
      
      {/* Main Tournament */}
      <div className="mb-8">
        <h3 className="mb-4 font-medium text-sm uppercase">Turnier-Zeitplan <span className="text-gray-400">(Hauptturnier)</span></h3>
        
        <div className="gap-6 grid grid-cols-2 mb-6">
          {/* Start Date */}
          <div>
            <h4 className="mb-2 font-medium text-gray-400 text-xs uppercase">Startdatum</h4>
            <div className="flex items-center">
              <div className="flex-1 bg-[#131320] mr-2 p-3 rounded-lg">
                <input
                  type="text"
                  className="bg-transparent outline-none w-full"
                  placeholder="20.04.2025"
                  value={formData.startDate || ''}
                  onChange={(e) => updateFormData({
                    ...formData,
                    startDate: e.target.value
                  })}
                />
              </div>
              <button className="bg-[#131320] p-3 rounded-lg text-gray-400">
                📅
              </button>
            </div>
          </div>
          
          {/* Start Time */}
          <div>
            <h4 className="mb-2 font-medium text-gray-400 text-xs uppercase">Startzeit</h4>
            <div className="flex items-center">
              <div className="flex-1 bg-[#131320] mr-2 p-3 rounded-lg">
                <input
                  type="text"
                  className="bg-transparent outline-none w-full"
                  placeholder="18:00"
                  value={formData.startTime || ''}
                  onChange={(e) => updateFormData({
                    ...formData,
                    startTime: e.target.value
                  })}
                />
              </div>
              <button className="bg-[#131320] p-3 rounded-lg text-gray-400">
                🕒
              </button>
            </div>
          </div>
        </div>
        
        {/* Time Zone */}
        <div className="mb-6">
          <h4 className="mb-2 font-medium text-gray-400 text-xs uppercase">Zeitzone</h4>
          <div className="flex items-center">
            <div className="flex flex-1 justify-between items-center bg-[#131320] p-3 rounded-lg">
              <span>MITTELEUROPÄISCHE ZEIT (CET/CEST)</span>
              <button className="text-gray-400">▼</button>
            </div>
          </div>
        </div>
        
        {/* Auto Round Creation */}
        <div className="mb-6">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="autoRounds" 
              className="hidden" 
              checked={formData.autoRounds}
              onChange={() => updateFormData({
                ...formData,
                autoRounds: !formData.autoRounds
              })}
            />
            <label htmlFor="autoRounds" className="flex items-center cursor-pointer">
              <div className={`w-10 h-5 flex items-center rounded-full p-1 ${formData.autoRounds ? 'bg-purple-600' : 'bg-gray-700'}`}>
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${formData.autoRounds ? 'translate-x-5' : ''}`}></div>
              </div>
              <span className="ml-3 text-sm">AUTOMATISCHE RUNDENERSTELLUNG</span>
            </label>
          </div>
        </div>
        
        {/* Match Duration */}
        <div className="mb-6">
          <h4 className="mb-2 font-medium text-gray-400 text-xs uppercase">Durchschnittliche Match-Dauer (Minuten)</h4>
          <div className="flex items-center">
            <div className="flex flex-1 justify-between items-center bg-[#131320] p-3 rounded-lg">
              <input
                type="text"
                className="bg-transparent outline-none w-full"
                placeholder="30"
                value={formData.matchDuration || ''}
                onChange={(e) => updateFormData({
                  ...formData,
                  matchDuration: e.target.value
                })}
              />
              <div className="flex">
                <button className="px-2 text-gray-400">▲</button>
                <button className="px-2 text-gray-400">▼</button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Break Between Rounds */}
        <div className="mb-6">
          <h4 className="mb-2 font-medium text-gray-400 text-xs uppercase">Pause zwischen Runden (Minuten)</h4>
          <div className="flex items-center">
            <div className="flex flex-1 justify-between items-center bg-[#131320] p-3 rounded-lg">
              <input
                type="text"
                className="bg-transparent outline-none w-full"
                placeholder="15"
                value={formData.breakDuration || ''}
                onChange={(e) => updateFormData({
                  ...formData,
                  breakDuration: e.target.value
                })}
              />
              <div className="flex">
                <button className="px-2 text-gray-400">▲</button>
                <button className="px-2 text-gray-400">▼</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Round Schedule */}
      <div className="mb-8">
        <h3 className="mb-4 font-medium text-sm uppercase">Runden-Zeitplan</h3>
        
        {/* Round List */}
        <div className="space-y-3 mb-4">
          {/* Round 1 */}
          <div className="bg-[#131320] rounded-lg overflow-hidden">
            <div className="flex justify-between items-center bg-purple-600 px-4 py-2">
              <h4 className="font-medium">RUNDE 1: QUALIFIKATION</h4>
              <div className="text-sm">{formData.startDate}, {formData.startTime}</div>
            </div>
            <div className="flex justify-between items-center px-4 py-3">
              <div>Matches: 8</div>
              <div>Format: Best-of-1</div>
            </div>
          </div>
          
          {/* Round 2 */}
          <div className="bg-[#131320] rounded-lg overflow-hidden">
            <div className="flex justify-between items-center bg-purple-600 px-4 py-2">
              <h4 className="font-medium">RUNDE 2: VIERTELFINALE</h4>
              <div className="text-sm">{formData.startDate}, 19:30</div>
            </div>
            <div className="flex justify-between items-center px-4 py-3">
              <div>Matches: 4</div>
              <div>Format: Best-of-1</div>
            </div>
          </div>
          
          {/* Round 3 */}
          <div className="bg-[#131320] rounded-lg overflow-hidden">
            <div className="flex justify-between items-center bg-purple-600 px-4 py-2">
              <h4 className="font-medium">RUNDE 3: HALBFINALE</h4>
              <div className="text-sm">{formData.startDate}, 20:15</div>
            </div>
            <div className="flex justify-between items-center px-4 py-3">
              <div>Matches: 2</div>
              <div>Format: Best-of-3</div>
            </div>
          </div>
          
          {/* Round 4 */}
          <div className="bg-[#131320] rounded-lg overflow-hidden">
            <div className="flex justify-between items-center bg-purple-600 px-4 py-2">
              <h4 className="font-medium">RUNDE 4: FINALE</h4>
              <div className="text-sm">{formData.startDate}, 21:30</div>
            </div>
            <div className="flex justify-between items-center px-4 py-3">
              <div>Matches: 1</div>
              <div>Format: Best-of-3</div>
            </div>
          </div>
        </div>
        
        {/* Add Round Button */}
        <button 
          className="bg-[#131320] hover:bg-[#1A1A2E] py-2 border border-gray-600 border-dashed rounded-lg w-full text-gray-300 text-center"
          onClick={() => setShowAddRound(!showAddRound)}
        >
          + RUNDE HINZUFÜGEN
        </button>
      </div>
      
      {/* Tournament Bracket Preview */}
      <div className="mb-8">
        <h3 className="mb-4 font-medium text-sm uppercase">Turnier-Bracket Vorschau</h3>
        
        <div className="bg-[#131320] p-4 rounded-lg">
          <div className="flex">
            {/* Round 1 */}
            <div className="flex-1">
              <div className="mb-3 font-medium text-gray-400 text-sm text-center">RUNDE 1</div>
              
              <div className="space-y-6">
                {/* Match 1 */}
                <div className="relative">
                  <div className="bg-[#1E1E2D] mb-1 border border-gray-700 rounded">
                    <div className="p-2 border-gray-700 border-b">TEAM 1</div>
                  </div>
                  <div className="bg-[#1E1E2D] border border-gray-700 rounded">
                    <div className="p-2">TEAM 2</div>
                  </div>
                  {/* Connector */}
                  <div className="right-0 absolute flex justify-end items-center w-4 h-full">
                    <div className="border-gray-600 border-t border-r w-full h-1/2"></div>
                  </div>
                </div>
                
                {/* Match 2 */}
                <div className="relative">
                  <div className="bg-[#1E1E2D] mb-1 border border-gray-700 rounded">
                    <div className="p-2 border-gray-700 border-b">TEAM 3</div>
                  </div>
                  <div className="bg-[#1E1E2D] border border-gray-700 rounded">
                    <div className="p-2">TEAM 4</div>
                  </div>
                  {/* Connector */}
                  <div className="right-0 absolute flex justify-end items-center w-4 h-full">
                    <div className="border-gray-600 border-r border-b w-full h-1/2"></div>
                  </div>
                </div>
                
                {/* Match 3 */}
                <div className="relative">
                  <div className="bg-[#1E1E2D] mb-1 border border-gray-700 rounded">
                    <div className="p-2 border-gray-700 border-b">TEAM 5</div>
                  </div>
                  <div className="bg-[#1E1E2D] border border-gray-700 rounded">
                    <div className="p-2">TEAM 6</div>
                  </div>
                  {/* Connector */}
                  <div className="right-0 absolute flex justify-end items-center w-4 h-full">
                    <div className="border-gray-600 border-t border-r w-full h-1/2"></div>
                  </div>
                </div>
                
                {/* Match 4 */}
                <div className="relative">
                  <div className="bg-[#1E1E2D] mb-1 border border-gray-700 rounded">
                    <div className="p-2 border-gray-700 border-b">TEAM 7</div>
                  </div>
                  <div className="bg-[#1E1E2D] border border-gray-700 rounded">
                    <div className="p-2">TEAM 8</div>
                  </div>
                  {/* Connector */}
                  <div className="right-0 absolute flex justify-end items-center w-4 h-full">
                    <div className="border-gray-600 border-r border-b w-full h-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Round 2 */}
            <div className="flex-1">
              <div className="mb-3 font-medium text-gray-400 text-sm text-center">RUNDE 2</div>
              
              <div className="space-y-12 pt-12">
                {/* Match 1 */}
                <div className="relative">
                  <div className="bg-purple-600 mb-2 p-2 rounded">
                    SIEGER 1/2
                  </div>
                  <div className="bg-purple-600 mb-2 p-2 rounded">
                    SIEGER 3/4
                  </div>
                  {/* Connector */}
                  <div className="right-0 absolute flex justify-end items-center w-4 h-full">
                    <div className="border-gray-600 border-t border-r w-full h-1/2"></div>
                  </div>
                </div>
                
                {/* Match 2 */}
                <div className="relative mt-16">
                  <div className="bg-purple-600 mb-2 p-2 rounded">
                    SIEGER 5/6
                  </div>
                  <div className="bg-purple-600 mb-2 p-2 rounded">
                    SIEGER 7/8
                  </div>
                  {/* Connector */}
                  <div className="right-0 absolute flex justify-end items-center w-4 h-full">
                    <div className="border-gray-600 border-r border-b w-full h-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Final */}
            <div className="flex-1">
              <div className="mb-3 font-medium text-gray-400 text-sm text-center">FINALE</div>
              
              <div className="space-y-4 pt-20">
                <div className="bg-purple-700 mb-2 p-2 rounded">
                  FINALIST 1
                </div>
                <div className="bg-purple-700 p-2 rounded">
                  FINALIST 2
                </div>
              </div>
            </div>
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

export default Step2Schedule;