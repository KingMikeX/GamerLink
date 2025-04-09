import Image from "next/image";
//bg-[#1d1b20] geiles Schwarz
//bg-[#2b2047] kacheln farbe

export default function Home() {
  return (
    <div>
      <div className="container bg-black mx-auto shadow-2xl flex items-center h-24 w-screen">
        <a href="" className="flex items-center justify-center">
          <span className="ml-4 uppercase font-black">GAMERLINK</span>
        </a>

        <nav className="shadow-2xl contents font-semibold text-base lg:text-lg">
          <ul className="mx-auto flex items-center">
            <li className="p-5 xl:p-8 active">
              <a href="">
                <span>Home</span>
              </a>
            </li>
            <li className="p-5 xl:p-8 active">
              <a href="">
                <span>play</span>
              </a>
            </li>
            <li className="p-5 xl:p-8 active">
              <a href="">
                <span>Tournement</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
