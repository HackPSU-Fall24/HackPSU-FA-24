// src/app/components/Quiz.tsx

"use client";

import { useState, useEffect } from "react";
import questions from "../data/questions";
import Question from "../components/Question";
import Navigation from "../components/Navigation";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<any[]>(
    Array(questions.length).fill([])
  );
  const [offsetY, setOffsetY] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [nextQuestionIndex, setNextQuestionIndex] = useState(currentQuestion);
  const [direction, setDirection] = useState<"up" | "down">("up");

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

    // Animate out first
    setTimeout(() => {
      // Now update to the next question after the first transition is done
      setCurrentQuestion(nextIndex);
      // Allow a bit of time before animating in the next question
      setTimeout(() => {
        setTransitioning(false);
      }, 250); // Match this with the incoming animation duration
    }, 250); // Match this with the outgoing animation duration
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

  const isNextDisabled = questions[currentQuestion].required
    ? (responses[currentQuestion]?.length ?? 0) === 0
    : false;

  return (
    <div className="flex flex-col min-h-screen text-alice-blue bg-polynesian-blue overflow-x-hidden">
      <TopBar />
      <div
        className="flex flex-col items-center justify-center h-screen p-8"
        style={{
          backgroundPositionY: offsetY * 0.5,
          transition: "background-position 0.5s ease-in-out",
        }}
      >
        {/* Entire Container with white box and animation */}
        <div
          className={`relative w-full max-w-2xl p-6 bg-alice-blue text-polynesian-blue rounded shadow-lg animation transition-all ${
            transitioning
              ? direction === "up"
                ? "animate-slide-out-up"
                : "animate-slide-out-down"
              : direction === "up"
              ? "animate-slide-in-up"
              : "animate-slide-in-down"
          }`}
        >
          {/* Adjust Question layout to remove space */}
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
          {/* Navigation without extra spacing */}
          <div className="w-full mt-4">
            <Navigation
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}
              onNext={nextQuestion}
              onPrev={prevQuestion}
              isNextDisabled={isNextDisabled}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
