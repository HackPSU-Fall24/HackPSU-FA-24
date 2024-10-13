// src/app/data/questions.ts

import { option } from "framer-motion/client";

export interface Question {
  title: string;
  options?: string[];
  type: 'multi-select' | 'single-select' | 'text' | 'scale';
  required?: boolean;
}

const questions: Question[] = [
  {
    title: "What subjects did you enjoy the most in high school? (Select all that apply)",
    options: ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Other"],
    type: "multi-select",
    required: true,
  },
  {
    title: "What subjects did you struggle with the most in high school? (Select all that apply)",
    options: ["Mathematics", "Physics", "Chemistry", "Computer Science", "Other"],
    type: "multi-select",
    required: true,
  },
  {
    title: "Which engineering fields are you most interested in? (Select up to three)",
    options: ["Mechanical Engineering", "Civil Engineering", "Electrical Engineering", "Computer Engineering", "Chemical Engineering", "Biomedical Engineering", "Aerospace Engineering", "Industrial Engineering", "Environmental Engineering", "Undecided"],
    type: "multi-select",
    required: true,
  },
  {
    title: "Have you participated in any projects or extracurricular activities related to engineering?",
    type: "text",
  },
  {
    title: "On a scale of 1-5, how comfortable are you with Calculus?",
    type: "scale",
  },
  {
    title: "On a scale of 1-5, how comfortable are you with Linear Algebra?",
    type: "scale",
  },
  {
    title: "Which programming languages are you familiar with? (Select all that apply)",
    options: ["C/C++", "Python", "Java", "MATLAB", "R", "JavaScript", "None"],
    type: "multi-select",
  },
  {
    title: "What is your long-term career goal in engineering? (Select all that apply)",
    options: ["Work in industry", "Work in academia or research", "Start my own business (entrepreneurship)", "Government/Policy", "Unsure"],
    type: "multi-select",
  },
  {
    title: "Which industries or sectors interest you the most? (Select up to three)",
    options: [ "Aerospace", "Automotive", "Biotechnology", "Energy", "Environmental", "Information Technology", "Manufacturing", "Robotics/AI", "Telecommunications", "Other (Please specify)"],
    type: "multi-select"
  },
  {
    title: "Are you interested in joining engineering clubs, competitions, or research groups?",
    options: ["Yes", "No", "Maybe"],
    type: "single-select",
  },
  {
    title: "How many hours per week do you dedicate to studying outside of class?",
    options: ["0-5 hours", "5-10 hours", "10-15 hours", "15+ hours"],
    type: "single-select",
  },
  {
    title: "What kind of elective courses would you like to explore outside of core engineering subjects? (Select all that apply)",
    options: ["Business and Management", "Design and Innovation", "Data Science and AI", "Environmental Studies", "Humanities and Social Sciences", "Other"],
    type: "multi-select",
  },
  {
    title: "Are you interested in interdisciplinary studies, combining engineering with fields like biology, business, or the arts?",
    options: ["Yes", "No", "Maybe"],
    type: "single-select",
  },
];

export default questions;
