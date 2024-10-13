// components/Navbar.tsx
"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

const Navbar: React.FC = () => {
  const handleLogout = async () => {
    const { user, logout, loading } = useAuth();
    const router = useRouter();
    await logout();
    router.push("/login");
  };
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between bg-white bg-opacity-80 backdrop-blur-lg shadow-lg p-4 z-50">
      {/* Logo and Website Name */}
      <div className="flex items-center space-x-3 ml-4">
        {/* Replace with your logo */}
        <div className="bg-bright-pink-crayola w-10 h-10 rounded-full flex items-center justify-center text-alice-blue font-bold text-lg">
          L
        </div>
        <span
          className="text-polynesian-blue font-semibold text-xl"
          style={{ fontFamily: "Marcellus, sans-serif" }}
        >
          COURSE P<span className="text-bright-pink-crayola">AI</span>LOT
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-6 mr-4">
        <Link href="/profile">
          <button className="text-polynesian-blue font-semibold px-4 py-2 rounded-md hover:bg-alice-blue transition">
            Profile
          </button>
        </Link>

        <Link href="/schedule">
          <button className="text-polynesian-blue font-semibold px-4 py-2 rounded-md hover:bg-alice-blue transition">
            Schedules
          </button>
        </Link>
        <Link href="/login">
          <button className="text-polynesian-blue font-semibold px-4 py-2 rounded-md hover:bg-alice-blue transition">
            Logout
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
