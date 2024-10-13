// src/app/pages/Quiz.tsx
"use client";
import { useState, useEffect } from "react";
import questions from "../data/questions";
import Question from "../components/Question";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Quiz() {
  const [responses, setResponses] = useState<any[] | null>(null);
  const [isRetake, setIsRetake] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const labels = [
    "enjoyed_subjects",
    "struggled_subjects",
    "engineering_interests",
    "engineering_projects",
    "math_comfort_level_Calculus",
    "math_comfort_level_Linear_Algebra",
    "programming_languages",
    "programming_interest",
    "career_goals",
    "industry_interest",
    "extracurricular_interest",
    "study_hours_per_week",
    "elective_interests",
    "minor_interests",
    "minor_pursuing",
  ];

  // Fetch previous responses using labels
  useEffect(() => {
    const fetchResponses = async () => {
      if (!user) return;
      const userDocRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const previousResponses = labels.map((label) => data[label] || []);
        setResponses(previousResponses);
      }
    };

    fetchResponses();
  }, [user]);

  const handleOptionChange = (index: number, response: any) => {
    const updatedResponses = [...(responses || [])];
    updatedResponses[index] = response;
    setResponses(updatedResponses);
  };

  const submitQuiz = async () => {
    if (!user || !responses) return;

    const labeledResponses: { [key: string]: any } = {};
    responses.forEach((value, index) => {
      const label = labels[index] || `unknown_field_${index}`;
      labeledResponses[label] = value;
    });

    try {
      const userDocRef = doc(db, "Users", user.uid);
      await setDoc(userDocRef, labeledResponses, { merge: true });
      await setDoc(userDocRef, { quiz_status: true }, { merge: true });
      router.push("/");
    } catch (error) {
      console.error("Error saving quiz responses:", error);
    }
  };

  const retakeQuiz = () => {
    setResponses(Array(questions.length).fill([]));
    setIsRetake(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-polynesian-blue text-alice-blue p-8">
      <div className="relative w-full max-w-4xl mx-auto p-6 bg-gradient-to-b from-white/80 to-white/80 text-polynesian-blue rounded-xl shadow-lg">
        <div className="text-center mb-4 text-xl font-semibold">
          Quiz Responses
        </div>

        {!isRetake && responses ? (
          <div className="overflow-y-auto max-h-[80vh] px-4 space-y-8">
            {questions.map((question, index) => (
              <div key={index} className="mb-4">
                <div className="font-semibold">{question.title}</div>
                <div className="mt-2">
                  {Array.isArray(responses[index])
                    ? responses[index].join(", ")
                    : responses[index]}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-y-auto max-h-[80vh] px-4 space-y-8">
            {questions.map((question, index) => (
              <div key={index} className="flex-grow flex flex-col mb-4">
                <Question
                  question={question}
                  response={responses ? responses[index] : []}
                  onOptionChange={(response) =>
                    handleOptionChange(index, response)
                  }
                />
              </div>
            ))}
          </div>
        )}

        <button
          onClick={isRetake ? submitQuiz : retakeQuiz}
          className="w-full mt-4 px-4 py-2 bg-bright-pink-crayola text-white rounded hover:bg-polynesian-blue transition-all"
        >
          {isRetake ? "Submit Quiz" : "Retake Quiz"}
        </button>
      </div>
    </div>
  );
}
