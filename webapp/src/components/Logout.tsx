"use client";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    router.push("/user/login");
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleLogout}
        className="bg-[#4F46E5] hover:bg-[#4338CA] transition-colors text-white font-medium px-5 py-2 rounded-full text-sm"
      >
        Logout
      </button>
    </div>
  );
}
