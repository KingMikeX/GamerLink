import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { usePathname } from "next/navigation";
import Sidebar, { SidebarItem } from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GamerLink",
  description: "Created By DHBW Wi22a3 GamerLink Group",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Dynamisch prüfen, ob wir auf Login oder Register sind
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  const hideNavbar = pathname.startsWith("/user/login") || pathname.startsWith("/user/register");

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {!hideNavbar && (
          <nav className="bg-[#252641] text-white p-3 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gray-300 rounded">
                {/* Logo hier - ersetze mit deinem tatsächlichen Logo */}
                <div className="h-full w-full bg-gray-300"></div>
              </div>
              <span className="text-lg font-bold">GamerLink</span>
            </div>

            <div className="flex-1 max-w-md mx-auto justify-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="SUCHE NACH SPIELEN, SPIELER ODER TURNIEREN..."
                  className="w-full bg-[#2a2a4a] text-white px-10 py-2 rounded-full text-sm"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-5 sm:hidden">
              {/* Hamburger Menü für mobile Ansicht */}
              <button className="sm:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </nav>
        )}

        {children}
      </body>
    </html>
  );
}