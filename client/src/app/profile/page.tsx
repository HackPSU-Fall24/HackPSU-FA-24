"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import NavBar from "../components/NavBar";
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
      <NavBar />

      {/* Container with top padding in case NavBar is fixed */}
      <div className="pt-[80px] min-h-screen bg-white">
        {/* Straight pink banner */}
        <div className="w-full h-32 bg-pink-600 flex items-center justify-center">
          <h2 className="text-white text-3xl font-bold">Your Profile</h2>
        </div>

        {/* Two-column layout */}
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Bigger rectangle image holder + Upload button */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-64 h-48 bg-gray-200 flex items-center justify-center mb-4">
              {/* Replace with <img> if you have an actual image */}
              <svg
                className="w-12 h-12 text-gray-400"
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
              className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400 transition"
              onClick={() => alert("Upload profile picture logic goes here.")}
            >
              Upload Picture
            </button>
          </div>

          {/* Right: Larger Name, Major, Minor */}
          <div className="flex flex-col justify-center text-gray-800">
            <p className="mb-6 text-2xl">
              <strong>Name:</strong> {name || "N/A"}
            </p>
            <p className="mb-6 text-2xl">
              <strong>Major:</strong> {major || "Not specified"}
            </p>
            <p className="mb-6 text-2xl">
              <strong>Minor:</strong> {minor || "Not specified"}
            </p>
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
