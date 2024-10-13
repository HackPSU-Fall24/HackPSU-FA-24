import { Question as QuestionType } from "../data/questions";

interface QuestionProps {
  question: QuestionType;
  response: any;
  onOptionChange: (response: any) => void;
}

export default function Question({
  question,
  response,
  onOptionChange,
}: QuestionProps) {
  const handleMultiSelectChange = (option: string) => {
    console.log("Option clicked:", option);
    const updatedResponse = response.includes(option)
      ? response.filter((o: string) => o !== option)
      : [...response, option];
    console.log("Updated Response:", updatedResponse);
    onOptionChange(updatedResponse);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{question.title}</h2>
      {question.type === "multi-select" &&
        question.options?.map((option, index) => (
          <label
            key={index}
            className={`cursor-pointer block mb-2 px-4 py-2 rounded-lg border-2 text-smoky-black transition-all 
        ${
          response.includes(option)
            ? "bg-bright-pink-crayola text-white border-bright-pink-crayola"
            : "bg-alice-blue border-gray-300"
        }`}
          >
            <input
              type="checkbox"
              checked={response.includes(option)}
              onChange={() => handleMultiSelectChange(option)} // Directly on input
              className="hidden"
            />
            {option}
          </label>
        ))}

      {question.type === "single-select" &&
        question.options?.map((option, index) => (
          <label
            key={index}
            onClick={() => onOptionChange(option)}
            className={`cursor-pointer block mb-2 px-4 py-2 rounded-lg border-2 text-center transition-all 
        ${
          response === option
            ? "bg-bright-pink-crayola text-white border-bright-pink-crayola"
            : "bg-alice-blue text-smoky-black border-gray-300"
        }`}
            style={{
              backgroundColor: response === option ? "#ea526fff" : "#f6fbff",
              color: response === option ? "#ffffff" : "#070600", // White for selected text, Smoky Black for default
            }}
          >
            {option}
          </label>
        ))}

      {question.type === "scale" && (
        <div className="mt-2">
          <input
            type="range"
            min="1"
            max="5"
            value={response || 3} // Default to the middle value if not set
            onChange={(e) => onOptionChange(Number(e.target.value))}
            className="w-full accent-bright-pink-crayola"
          />
          <div className="flex justify-between text-sm mt-1">
            {[1, 2, 3, 4, 5].map((num) => (
              <span key={num} className="text-smoky-black">
                {num}
              </span>
            ))}
          </div>
        </div>
      )}

      {question.type === "text" && (
        <textarea
          value={response || ""}
          onChange={(e) => onOptionChange(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full mt-2 p-2 bg-alice-blue text-smoky-black rounded"
        />
      )}
    </div>
  );
}
