export interface Question {
  title: string;
  options?: string[];
  type: 'multi-select' | 'single-select' | 'text' | 'scale';
  required?: boolean;
}

const questions: Question[] = [
  {
    title: "What subjects did you enjoy the most in high school? (Select all that apply)",
    options: ["Mathematics", "Science", "History", "Literature", "Art", "Music", "Physical Education", "Other"],
    type: "multi-select",
    required: true,
  },
  {
    title: "What subjects did you struggle with the most in high school? (Select all that apply)",
    options: ["Mathematics", "Science", "History", "Literature", "Art", "Music", "Physical Education", "Other"],
    type: "multi-select",
    required: true,
  },
  {
    title: "Which of the following areas are you most interested in? (Select up to three)",
    options: ["Technology and Engineering", "Business and Entrepreneurship", "Health and Medicine", "Social Sciences and Humanities", "Arts and Design", "Education and Teaching", "Environment and Sustainability", "Undecided"],
    type: "multi-select",
    required: true,
  },
  {
    title: "Have you participated in any projects, clubs, or extracurricular activities related to your interests?",
    type: "text",
  },
  {
    title: "On a scale of 1-5, how comfortable are you with analytical and problem-solving tasks?",
    type: "scale",
  },
  {
    title: "On a scale of 1-5, how comfortable are you with creative and innovative tasks?",
    type: "scale",
  },
  {
    title: "Which skills would you like to develop further during your college years? (Select all that apply)",
    options: ["Leadership", "Communication", "Technical Skills", "Critical Thinking", "Creativity", "Other"],
    type: "multi-select",
  },
  {
    title: "What is your long-term career goal? (Select all that apply)",
    options: ["Work in a corporate setting", "Start my own business", "Pursue research or academia", "Work in a creative field", "Contribute to social causes", "Unsure"],
    type: "multi-select",
  },
  {
    title: "How many hours per week are you willing to dedicate to extracurricular activities or internships related to your major?",
    options: ["0-5 hours", "5-10 hours", "10-15 hours", "15+ hours"],
    type: "single-select",
  },
  {
    title: "Are you open to pursuing a minor to complement your major?",
    options: ["Yes", "No", "Maybe"],
    type: "single-select"
  },
  {
    title: "What types of minors are you interested in pursuing? (e.g., Business, Computer Science, Mathematics, etc.)",
    type: "text"
  }
];

export default questions;