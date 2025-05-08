"use client";
// Dateistruktur für die Next.js-Anwendung:

// 10. /pages/tournaments/create.js - Turniererstellungsseite
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../../components/CreateTournementComponents/Layout';
import ProgressBar from '../../../components/CreateTournementComponents/ProgressBar'
import Step1BasicInfo from '../../../components/CreateTournementComponents/StepOneBasicInfo';
import Step2Schedule from '../../../components/CreateTournementComponents/StepTwoSchedule';
import Step3Prizes from '../../../components/CreateTournementComponents/StepThreePrizes';
import Step4Confirmation from '../../../components/CreateTournementComponents/StepFourConfirmation';

export default function CreateTournament() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info (Step 1)
    title: 'CSGO SUMMER CUP 2025',
    game: 'CS:GO',
    teamSize: '5v5',
    maxTeams: 16,
    scoringSystem: 'STANDARD',
    registrationStart: '15.04.2025, 08:00',
    registrationEnd: '30.04.2025, 23:59',
    entryFee: '0',
    isPublic: true,
    inviteOnly: false,
    checkInRequired: true,
    
    // Schedule (Step 2)
    startDate: '20.04.2025',
    startTime: '18:00',
    timezone: 'MITTELEUROPÄISCHE ZEIT (CET/CEST)',
    autoRounds: true,
    matchDuration: '30',
    breakDuration: '15',
    
    // Prizes (Step 3)
    prizes: [
      { id: 1, place: 1, name: 'Gaming Headset XYZ Pro', description: 'Professionelles Gaming-Headset mit 7.1 Surround Sound und RGB-Beleuchtung.' },
      { id: 2, place: 2, name: 'Gaming Maus Ultra', description: 'Ergonomische Gaming-Maus mit 18.000 DPI und programmierbaren Tasten.' },
      { id: 3, place: 3, name: 'T-Shirt + Mousepad', description: 'Limitiertes Gamertec T-Shirt und Premium Mousepad im Bundle.' },
    ]
  });
  
  const updateFormData = (newData: any) => {
    setFormData(newData);
  };
  
  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSubmit = () => {
    // Hier würde die API-Anfrage zur Erstellung des Turniers erfolgen
    alert('Turnier erfolgreich erstellt!');
    router.push('/tournaments');
  };
  
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="mb-4 font-bold text-2xl">Turnier erstellen</h1>
        <ProgressBar currentStep={currentStep} />
        
        {currentStep === 1 && (
          <Step1BasicInfo
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
          />
        )}
        
        {currentStep === 2 && (
          <Step2Schedule
            formData={formData}
            updateFormData={updateFormData}
            onBack={handleBack}
            onNext={handleNext}
          />
        )}
        
        {currentStep === 3 && (
          <Step3Prizes
            formData={formData}
            updateFormData={updateFormData}
            onBack={handleBack}
            onNext={handleNext}
          />
        )}
        
        {currentStep === 4 && (
          <Step4Confirmation
            formData={formData}
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </Layout>
  );
}