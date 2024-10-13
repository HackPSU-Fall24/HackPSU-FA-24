"use client";

import { useState, useEffect } from "react";
import questions from "../data/questions";
import Question from "../components/Question";
import Navigation from "../components/Navigation";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<any[]>(
    Array(questions.length).fill([])
  );
  const [offsetY, setOffsetY] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [nextQuestionIndex, setNextQuestionIndex] = useState(currentQuestion);
  const [direction, setDirection] = useState<"up" | "down">("up");

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOptionChange = (response: any) => {
    const updatedResponses = [...responses];
    updatedResponses[currentQuestion] = response;
    setResponses(updatedResponses);
  };

  const triggerTransition = (
    nextIndex: number,
    slideDirection: "up" | "down"
  ) => {
    setDirection(slideDirection);
    setTransitioning(true);
    setNextQuestionIndex(nextIndex);

    setTimeout(() => {
      setCurrentQuestion(nextIndex);
      setTimeout(() => {
        setTransitioning(false);
      }, 250);
    }, 250);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1 && !transitioning) {
      triggerTransition(currentQuestion + 1, "up");
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0 && !transitioning) {
      triggerTransition(currentQuestion - 1, "down");
    }
  };

  const cancelQuiz = () => {
    router.push("/");
  };

  const submitQuiz = async () => {
    if (!user) return;

    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          quizResponses: responses,
          completedAt: new Date(),
        },
        { merge: true }
      );
      router.push("/");
    } catch (error) {
      console.error("Error saving quiz responses:", error);
    }
  };

  const isNextDisabled = questions[currentQuestion].required
    ? (responses[currentQuestion]?.length ?? 0) === 0
    : false;

  return (
    <div className="flex flex-col min-h-screen text-alice-blue bg-polynesian-blue overflow-x-hidden">
      <div
        className="flex flex-col items-center justify-center h-screen p-8"
        style={{
          backgroundPositionY: offsetY * 0.5,
          transition: "background-position 0.5s ease-in-out",
        }}
      >
        <div
          className={`relative w-full max-w-4xl p-6 bg-gradient-to-b from-white/80 to-white/80 text-polynesian-blue rounded-xl shadow-lg ${
            transitioning
              ? direction === "up"
                ? "animate-slide-out-up"
                : "animate-slide-out-down"
              : direction === "up"
              ? "animate-slide-in-up"
              : "animate-slide-in-down"
          }`}
        >
          <button
            onClick={cancelQuiz}
            className="absolute top-4 right-4 px-4 py-2 text-sm bg-smoky-black text-white rounded hover:bg-bright-pink-crayola transition-all"
          >
            Cancel Quiz
          </button>

          <div className="text-center mb-4 text-xl font-semibold">
            Question {currentQuestion + 1} of {questions.length}
          </div>

          <div className="flex-grow flex items-center w-full">
            <Question
              question={
                questions[transitioning ? currentQuestion : nextQuestionIndex]
              }
              response={
                responses[transitioning ? currentQuestion : nextQuestionIndex]
              }
              onOptionChange={handleOptionChange}
            />
          </div>

          <div className="w-full mt-4">
            <Navigation
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}
              onNext={nextQuestion}
              onPrev={prevQuestion}
              isNextDisabled={isNextDisabled}
            />
          </div>

          {currentQuestion === questions.length - 1 && (
            <button
              onClick={submitQuiz}
              className="w-full mt-4 px-4 py-2 bg-bright-pink-crayola text-white rounded hover:bg-polynesian-blue transition-all"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
