"use client"; // Dies ist eine Client Component, da sie Browser-APIs verwendet

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react'; // Icon für den Button (installiere 'lucide-react' wenn noch nicht geschehen)

// npm install lucide-react

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Funktion zum Scrollen nach oben
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Für sanftes Scrollen
    });
  };

  // Event-Listener hinzufügen, um die Sichtbarkeit des Buttons zu steuern
  useEffect(() => {
    // Funktion, die bei jedem Scroll-Event aufgerufen wird
    const toggleVisibility = () => {
      // Wenn die Seite mehr als 300px gescrollt wurde, zeige den Button an
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Event-Listener registrieren, wenn die Komponente gemountet wird
    window.addEventListener('scroll', toggleVisibility);

    // Event-Listener aufräumen, wenn die Komponente unmounted wird
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []); // Leeres Array bedeutet, der Effekt läuft nur einmal beim Mounten und Unmounten

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 // Positioniert den Button rechts unten
        bg-[#da4ecc] // Hintergrundfarbe (deine Akzentfarbe)
        text-white // Textfarbe
        p-3 // Innenabstand
        rounded-full // Macht den Button rund
        shadow-lg // Fügt einen Schatten hinzu
        transition-opacity duration-300 // Sanfter Übergang beim Ein-/Ausblenden
        focus:outline-none focus:ring-2 focus:ring-[#da4ecc] focus:ring-opacity-75 // Fokus-Stil
        ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'} // Sichtbarkeit basierend auf 'isVisible' State
      `}
      aria-label="Scroll to top" // Zugänglichkeit
    >
      <ChevronUp size={24} /> {/* Pfeil-nach-oben-Icon */}
    </button>
  );
}