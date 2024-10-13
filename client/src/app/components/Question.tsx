// src/app/components/Question.tsx

import { Question as QuestionType } from '../data/questions';

interface QuestionProps {
  question: QuestionType;
  response: any;
  onOptionChange: (response: any) => void;
}

export default function Question({ question, response, onOptionChange }: QuestionProps) {
  const handleMultiSelectChange = (option: string) => {
    const updatedResponse = response.includes(option)
      ? response.filter((o: string) => o !== option)
      : [...response, option];
    onOptionChange(updatedResponse);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{question.title}</h2>
      {question.type === 'multi-select' && question.options?.map((option, index) => (
        <label key={index} className="block mb-2 text-smoky-black">
          <input
            type="checkbox"
            checked={response.includes(option)}
            onChange={() => handleMultiSelectChange(option)}
            className="mr-2 accent-celestial-blue"
          />
          {option}
        </label>
      ))}
      {question.type === 'single-select' && question.options?.map((option, index) => (
        <label key={index} className="block mb-2 text-smoky-black">
          <input
            type="radio"
            name={`question-${question.title}`}
            checked={response === option}
            onChange={() => onOptionChange(option)}
            className="mr-2 accent-celestial-blue"
          />
          {option}
        </label>
      ))}
      {question.type === 'scale' && (
        <div className="flex justify-between mt-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <label key={num} className="text-smoky-black">
              <input
                type="radio"
                name={`scale-${question.title}`}
                checked={response === num}
                onChange={() => onOptionChange(num)}
                className="mr-1 accent-celestial-blue"
              />
              {num}
            </label>
          ))}
        </div>
      )}
      {question.type === 'text' && (
        <textarea
          value={response || ''}
          onChange={(e) => onOptionChange(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full mt-2 p-2 bg-alice-blue text-smoky-black rounded"
        />
      )}
    </div>
  );
}
