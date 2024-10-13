"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [quizData, setQuizData] = useState<any>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    if (user) {
      const fetchQuizData = async () => {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setQuizData(docSnap.data().quizResponses);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching quiz data:", error);
        }
      };

      fetchQuizData();
    }
  }, [user, loading, router]);

  if (loading || !quizData) return <div>Loading...</div>;

  return (
    <div className="p-6 text-polynesian-blue bg-alice-blue min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <h2 className="text-xl mb-4">Quiz Responses</h2>
      <ul className="list-disc list-inside">
        {quizData.map((response: any, index: number) => (
          <li key={index}>
            <strong>Question {index + 1}:</strong> {response.toString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
