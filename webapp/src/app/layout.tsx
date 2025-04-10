import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        
        {/* Nav Bar */}
        <nav className="bg-[#121428] text-white p-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <img src="/logo.webp" alt="GamerLink Logo" className="w-52 " />
            </div>
          </div>

          {/* Search Bar */}
          <div className="justify-center flex-1 hidden lg:flex ">
            <div className="flex w-xl max-w-[400px] align-middle relative">
              <input type="text" placeholder="SUCHE NACH SPIELEN, SPIELER ODER TURNIEREN..." className="w-full bg-[#2a2a4a] text-white px-10 py-2 rounded-full text-sm"/>
              <div className="absolute transform -translate-y-1/2 left-3 top-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400"
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

          {/* Drei Balken mobile Ansicht */}
          <div className="flex items-center gap-5 lg:hidden">
            
            {/* Hamburger Menü für mobile Ansicht */}
            <button className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
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
      {children}
    </body>
  </html>
  );
}
