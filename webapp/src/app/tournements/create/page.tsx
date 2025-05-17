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
    title: '',
    game: '',
    teamSize: '',
    maxTeams: 2,
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
      { id: 1, place: 1, name: '', description: '' },
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
  
 const handleSubmit = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Nicht eingeloggt.");
      return;
    }

    // Datum & Zeit kombinieren
    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
    const teamSizeNumber = parseInt(formData.teamSize.split("v")[0]);

    const payload = {
      name: formData.title,
      game: formData.game,
      niveau: formData.scoringSystem,
      start_time: startDateTime.toISOString(),
      duration_minutes: parseInt(formData.matchDuration),
      description: "Automatisch generiertes Turnier",
      teamanzahl: formData.maxTeams,
      teamgroeße: teamSizeNumber
    };

    const res = await fetch("http://localhost:8000/tournaments/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      alert("Fehler: " + (errorData.detail || "Unbekannter Fehler"));
      return;
    }

    const result = await res.json();
    alert("Turnier erfolgreich erstellt!");
    router.push("/tournaments");
  } catch (err) {
    console.error("Fehler beim Senden:", err);
    alert("Beim Erstellen des Turniers ist ein Fehler aufgetreten.");
  }
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