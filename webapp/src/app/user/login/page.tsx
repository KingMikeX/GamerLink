import Image from "next/image";

export default function Login() {
  return (
    <div className="flex justify-center min-h-screen bg-white">
      <ol>
        <li>
          <input type="email"></input>
        </li>
        <li>
          <input type="password"></input>
        </li>
        
      </ol>
    </div>
  );
}