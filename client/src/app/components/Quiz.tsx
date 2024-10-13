// src/app/components/Quiz.tsx

"use client";

import { useState, useEffect } from 'react';
import questions from '../data/questions';
import Question from './Question';
import Navigation from './Navigation';
import TopBar from './TopBar';
import Footer from './Footer';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<any[]>(Array(questions.length).fill([]));
  const [offsetY, setOffsetY] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // State to manage animation timing
  const [direction, setDirection] = useState<'slide-up' | 'slide-down'>('slide-up');

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOptionChange = (response: any) => {
    const updatedResponses = [...responses];
    updatedResponses[currentQuestion] = response;
    setResponses(updatedResponses);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1 && !isAnimating) {
      setDirection('slide-up'); // Set direction for slide-up
      setIsAnimating(true); // Start animation
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setIsAnimating(false); // End animation
      }, 500); // Duration matches animation time
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0 && !isAnimating) {
      setDirection('slide-down'); // Set direction for slide-down
      setIsAnimating(true); // Start animation
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setIsAnimating(false); // End animation
      }, 500); // Duration matches animation time
    }
  };

  const isNextDisabled = questions[currentQuestion].required ? (responses[currentQuestion]?.length ?? 0) === 0 : false;

  return (
    <div className="flex flex-col min-h-screen text-alice-blue bg-polynesian-blue overflow-x-hidden">
      <TopBar />
      <div
        className="flex flex-col items-center justify-center h-screen p-8"
        style={{
          backgroundPositionY: offsetY * 0.5,
          transition: 'background-position 0.5s ease-in-out',
        }}
      >
        <div
          className={`w-full max-w-2xl p-8 bg-alice-blue text-polynesian-blue rounded shadow-lg transform transition-all duration-700 ease-in-out hover:scale-105 ${
            isAnimating ? (direction === 'slide-up' ? 'animate-slide-up' : 'animate-slide-down') : ''
          }`}
        >
          <Question question={questions[currentQuestion]} response={responses[currentQuestion]} onOptionChange={handleOptionChange} />
          <Navigation 
            currentQuestion={currentQuestion} 
            totalQuestions={questions.length} 
            onNext={nextQuestion} 
            onPrev={prevQuestion} 
            isNextDisabled={isNextDisabled} 
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
