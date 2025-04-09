"use client";
import { useState } from "react";

// Login-Request-Funktion (mit deinem Backend-Endpunkt ersetzen)
async function loginUser(email: string, password: string) {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login fehlgeschlagen");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const userData = await loginUser(email, password);
      console.log("Erfolgreich eingeloggt:", userData);
      localStorage.setItem("token", userData.token);
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Linke Seite */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <div className="max-w-sm w-full">
          {/* Logo + Titel */}
          <div className="mb-6 text-center">
            <img src="/logo.png" alt="GamerLink Logo" className="mx-auto mb-4 h-12" />
            <h2 className="text-3xl font-bold">Login</h2>
          </div>

          {/* Google Login */}
          <button className="flex items-center justify-center w-full py-2 mb-4 border rounded-md shadow-sm hover:shadow-md">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 533.5 544.3">
              <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4" />
              <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853" />
              <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04" />
              <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335" />
            </svg>
            <span className="text-sm font-medium">Sign in with Google</span>
          </button>

          {/* GitHub Login */}
          <button className="flex items-center justify-center w-full py-2 mb-4 border rounded-md shadow-sm hover:shadow-md">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.799 8.207 11.387.6.111.793-.261.793-.58
                0-.287-.01-1.044-.016-2.049-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.729.082-.729
                1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.3-5.467-1.332-5.467-5.931
                0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.403
                c1.018.005 2.043.138 3.003.403 2.289-1.552 3.295-1.23 3.295-1.23.654 1.653.243 2.873.12 3.176.77.84
                1.235 1.911 1.235 3.221 0 4.61-2.807 5.628-5.479 5.921.43.372.814 1.104.814 2.222 0 1.606-.015 2.903-.015
                3.293 0 .322.19.697.8.578C20.565 21.796 24 17.297 24 12c0-6.63-5.373-12-12-12z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium">Sign in with GitHub</span>
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-sm text-gray-500">Oder mit E-Mail einloggen</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Email/Password Login */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="password"
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              onClick={handleLogin}
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {loading ? "Lade..." : "Login"}
            </button>
          </form>

          <p className="text-xs text-center mt-4 text-gray-500">
            I agree to abide by templatana’s{" "}
            <a href="#" className="underline">Terms of Service</a> and{" "}
            <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </div>
      </div>

      {/* Rechte Seite */}
      <div className="hidden md:block md:w-1/2 bg-indigo-100" />
    </div>
  );
}
