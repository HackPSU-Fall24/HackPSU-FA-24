// src/pages/ButtonPage.tsx
"use client";
import { useRouter } from "next/navigation";
import OpenAI from "openai";
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import majorsData from "../public/psu_majors.json";
import questions from "../data/questions";

interface SemesterSchedule {
  [semester: string]: string[];
}

interface Question {
  title: string;
  options?: string[];
  type: string;
  required?: boolean;
}

// Define your response structure
interface Response {
  [key: string]: string | string[] | number | null;
}

interface Schedule {
  title: string;
  data: SemesterSchedule;
}

// Define the type for your JSON structure
interface ProgramData {
  [key: string]: {
    program_description: string;
    entrance_to_major: string;
    degree_requirements: {
      option: string | null;
      core_requirements: string;
    };
    electives: string;
    supporting_courses: string;
  };
}

export default function ScheduleTable() {
  const [responses, setResponses] = useState<any[] | null>(null);
  const [major, setMajor] = useState("");
  const [minor, setMinor] = useState("");
  const { user } = useAuth();
  const router = useRouter();
  const [schedules, setSchedules] = useState<Record<
    string,
    SemesterSchedule
  > | null>(null);

  const labels = [
    "enjoyed_subjects",
    "struggled_subjects",
    "interests",
    "projects_activities",
    "analytical_comfort",
    "creative_comfort",
    "skills_to_develop",
    "career_goals",
    "extracurricular_hours",
    "minor_interest",
    "minor_pursuing",
  ];

  useEffect(() => {
    const fetchResponses = async () => {
      if (!user) return;
      const userDocRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const previousResponses = labels.map((label) => data[label] || []);
        setResponses(previousResponses);
        setMajor(JSON.parse(data.suggested_major_minor)["Major"] || "");
        setMinor(JSON.parse(data.suggested_major_minor)["Minor"] || "");
      }
    };

    fetchResponses();
  }, [user]);

  if (!responses) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 to-blue-100">
        <div className="text-2xl text-blue-900">Loading...</div>
      </div>
    );
  }

  const majorsInfo = majorsData as { [key: string]: any };

  const questionResponsePairs = questions.map((question, index) => ({
    question: question.title,
    response: responses[index] ?? "No response",
  }));

  const navigateToDashboard = () => {
    router.push("/");
  };

  const handleClick = async () => {
    console.log(
      `Here is the data: {Profile: ${JSON.stringify(
        questionResponsePairs
      )},Major: ${major}, Minor: ${minor} bs, Requirements: ${JSON.stringify(
        majorsInfo[major]
      )}`
    );
    const client = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const openAIResponse = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `I need to create course schedules for an engineering student based on their interests and strengths in high school subjects, comfort level in calculus and linear algebra, preferred engineering fields, programming knowledge, and career goals. Please use the following data to generate at least three possible schedules for the whole 8 semesters in a JSON format with the structure { "semester 1": [], "semester 2": [], ... }. Ensure these schedules include general education (GenEd) courses (number and description) from Penn State and adhere to the entrance and degree requirements for any specified major and minor (e.g., Mechanical Engineering major with a Business minor, Electrical Engineering major with a Computer Science minor, etc.). Understand the program requirements and core requirements accurately, ensuring prerequisites are properly accounted for.
          
          Here are the data points to consider:
          1) enjoyed_subjects & struggled_subjects - Identify relevant majors/minors (from enjoyed subjects) and potential prerequisites or remedial courses (from struggled subjects).
          2) interests - Match broader field preferences (e.g., Technology/Engineering, Business, Health, Arts) to core courses and specialized electives.
          3) projects_activities - Leverage prior club or project experiences to suggest advanced/specialized courses or research/internship opportunities.
          4) analytical_comfort & creative_comfort - Adjust curriculum rigor and focus based on comfort with analytical or creative tasks.
          5) skills_to_develop - Incorporate courses/extracurriculars fostering leadership, communication, technical skills, creativity, and targeted proficiencies.
          6) career_goals - Select electives/internships supporting career trajectories.
          7) extracurricular_hours - Propose clubs, volunteering, or research roles aligned with available time.
          8) minor_interest & minor_pursuing - Include required and elective courses for the chosen minor, ensuring prerequisites.
          
          Additional Data:
          - Utilize the JSON structure to extract program descriptions, entrance requirements, and degree requirements, and include electives for each major and minor.
          - For each schedule, include general education courses (course numbers and descriptions) per Penn State's GenEd requirements.

          Must include the following details:
          - Course number and description for each course, elective and gened
          - Keep in mind the student's career goals and extracurricular hours
          - Keep in mind the student's major and minor course requirements and pre requisites
          - Along with gened and electives mention which requirement it fulfils (eg. COMM 100 for GA)
          
          Generate three balanced and feasible schedules (for all 8 semesters each) in perfect JSON format with the structure:
          {
            "Schedule 1": {
              "semester 1": ["Courses"],
              "semester 2": ["Courses"],
              ...
            },
            "Schedule 2": {
              "semester 1": [...],
              "semester 2": [...],
              ...
            },
            "Schedule 3": {...}
          }
          Ensure prerequisites are met and course selections align with both the major and minor requirements, reflecting the student's interests, strengths, and career objectives.`,
        },
        {
          role: "user",
          content: `Here is the data: {Profile: ${JSON.stringify(
            questionResponsePairs
          )},Major: ${major}, Minor: ${minor} bs, Requirements: ${JSON.stringify(
            majorsInfo[major]
          )}`,
        },
      ],
    });

    const suggestion = openAIResponse.choices[0].message?.content || "";
    const jsonMatch = suggestion.match(/{[\s\S]*}/);

    console.log(suggestion);

    if (jsonMatch) {
      const jsonString = jsonMatch[0];
      // Attempt to parse the JSON string
      const parsedSchedules = JSON.parse(jsonString);
      setSchedules(parsedSchedules);
    } else {
      throw new Error("No JSON structure found in the response.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 p-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Course Schedule Generator
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Get personalized course schedules tailored to your interests and
          goals.
        </p>
      </header>
      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={navigateToDashboard}
          className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition-all"
        >
          Home
        </button>
        <button
          onClick={handleClick}
          className="px-6 py-3 bg-green-600 text-white rounded shadow hover:bg-green-700 transition-all"
        >
          Generate Schedule
        </button>
      </div>
      {schedules && (
        <div className="space-y-12">
          {Object.entries(schedules).map(([scheduleTitle, semesterData]) => (
            <div
              key={scheduleTitle}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h2 className="text-3xl font-semibold text-center text-blue-600 mb-4">
                {scheduleTitle}
              </h2>
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 bg-blue-600 text-white">
                      Semester
                    </th>
                    <th className="border px-4 py-2 bg-blue-600 text-white">
                      Courses
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(semesterData as SemesterSchedule).map(
                    ([semester, courses]) => (
                      <tr key={semester}>
                        <td className="border px-4 py-2 text-gray-800">
                          {semester}
                        </td>
                        <td className="border px-4 py-2">
                          <ul className="list-disc ml-4 text-gray-700">
                            {(courses as string[]).map((course, idx) => (
                              <li key={idx}>{course}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
