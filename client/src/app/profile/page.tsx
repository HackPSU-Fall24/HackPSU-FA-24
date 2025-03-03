"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar"; // ✅ Use the correct Navbar
import ThemeContainer from "../contexts/theme/ThemeContainer";

function ProfileContent() {
  const { user, loading } = useAuth();
  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [minor, setMinor] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    if (user) {
      const fetchProfileData = async () => {
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setName(data.name || "");
            if (data.suggested_major_minor) {
              const suggestion = JSON.parse(data.suggested_major_minor);
              setMajor(suggestion.Major || "");
              setMinor(suggestion.Minor || "");
            }
          } else {
            console.error("No such document");
          }
          setIsLoaded(true);
        } catch (error) {
          console.error("Error fetching profile data:", error);
          setIsLoaded(true);
        }
      };

      fetchProfileData();
    }
  }, [user, loading, router]);

  if (loading || !isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <>
      {/* ✅ Use fixed Navbar */}
      <Navbar />

      {/* Profile Page Container */}
      <div className="pt-28 min-h-screen bg-gradient-to-br from-polynesian-blue via-celestial-blue to-bright-pink-crayola text-white">
        
        {/* Profile Banner */}
        {/* Profile Header - Matches "Generate Schedule" UI */}
        <header className="relative z-10 py-20 text-center mt-15">
          <h1 className="text-5xl font-extrabold mb-4 animate-bounce">
            Your Profile
          </h1>
          <p className="text-2xl mb-2">
            View and manage your academic details.
          </p>
        </header>
        {/* Profile Content Section */}
        <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left: Profile Picture & Upload Button */}
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 rounded-full bg-gray-300 flex items-center justify-center shadow-md mb-4">
              <svg
                className="w-16 h-16 text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 12c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4zm0 2c-2.66 0-8 1.34-8 4v2h16v-2c0-2.66-5.34-4-8-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <button
              className="bg-white text-gray-700 py-2 px-4 rounded-lg shadow-md hover:bg-gray-200 transition"
              onClick={() => alert("Upload profile picture logic goes here.")}
            >
              Upload Picture
            </button>
          </div>

          {/* Right: User Details */}
          {/* Right: User Details + Retake Quiz Button */}
          <div className="flex flex-col justify-center bg-white p-6 rounded-lg shadow-lg text-gray-800 space-y-2">
          <div className="border-b pb-1">
            <p className="text-xl font-semibold">
              <span className="text-gray-500">Name:</span> <span className="text-black">{name || "N/A"}</span>
            </p>
          </div>
          <div className="border-b pb-1">
            <p className="text-xl font-semibold">
              <span className="text-gray-500">Major:</span> <span className="text-black">{major || "Not specified"}</span>
            </p>
          </div>
          <div>
            <p className="text-xl font-semibold">
              <span className="text-gray-500">Minor:</span> <span className="text-black">{minor || "Not specified"}</span>
            </p>
          </div>

          {/* Retake Quiz Button - Reduced Space Above */}
          <button
            onClick={() => router.push("/quiz")}
            className="mt-4 self-center px-4 py-2 text-sm bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-all"
          >
            Retake Quiz
          </button>
        </div>


        </div>
      </div>
    </>
  );
}

export default function ProfilePage() {
  return (
    <ThemeContainer>
      <ProfileContent />
    </ThemeContainer>
  );
}
