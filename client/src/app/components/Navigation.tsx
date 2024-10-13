// src/app/components/Navigation.tsx

interface NavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  onNext: () => void;
  onPrev: () => void;
  isNextDisabled: boolean;
}

export default function Navigation({
  currentQuestion,
  totalQuestions,
  onNext,
  onPrev,
  isNextDisabled,
}: NavigationProps) {
  return (
    <div className="mt-6 flex justify-between">
      <button
        onClick={onPrev}
        disabled={currentQuestion === 0}
        className="px-6 py-3 bg-celestial-blue text-white rounded disabled:bg-gray-400 hover:bg-smoky-black hover:text-alice-blue transform transition-transform duration-300 ease-in-out hover:scale-110"
      >
        Previous
      </button>

      {currentQuestion < totalQuestions - 1 && (
        <button
          onClick={onNext}
          disabled={isNextDisabled}
          className="px-6 py-3 bg-celestial-blue text-white rounded disabled:bg-gray-400 hover:bg-smoky-black hover:text-alice-blue transform transition-transform duration-300 ease-in-out hover:scale-110"
        >
          Next
        </button>
      )}
    </div>
  );
}
