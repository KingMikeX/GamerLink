import React from 'react'; // Importiere React
import ScrollToTopButton from "@/components/ScrollToTopButton"; // Importiere deine ScrollToTopButton Komponente

export const dynamicParams = true;

export default function TournementsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ScrollToTopButton />
    </>
  );
}