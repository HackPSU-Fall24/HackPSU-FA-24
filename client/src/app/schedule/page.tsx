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
  const [schedules, setSchedules] = useState<Schedule[]>([]);

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
    return <div>Loading...</div>; // Show a loading state until responses are fetched
  }

  const majorsInfo = majorsData as { [key: string]: any };

  const questionResponsePairs = questions.map((question, index) => ({
    question: question.title,
    response: responses[index] ?? "No response",
  }));

  const navigateToDashboard = () => {
    router.push("/"); // Adjust the path according to your dashboard route
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
      apiKey: process.env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const openAIResponse = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `I need to create course schedules for an engineering student based on their interests and strengths in high school subjects, comfort level in calculus and linear algebra, preferred engineering fields, programming knowledge, and career goals. Please use the following data to generate at least three possible schedules for the whole 8 semesters in a JSON format with the structure { "semester 1": [], "semester 2": [], ... }. Ensure these schedules include general education (GenEd) courses number and description from Penn State and adhere to the entrance and degree requirements for the specified major and minor. Understand the program requirements and core requirements accurately. Keep in mind about the pre requisites of the courses given in the description.
    
    Here are the data points to consider:
    
    Interests and Struggles in High School Subjects: Identify any potential prerequisites needed based on subjects they struggled with.
    Engineering Interests: Tailor the core engineering courses towards fields like Mechanical, Civil, Electrical, etc.
    Comfort with Calculus and Linear Algebra: Adjust the course load and sequence accordingly, offering remedial courses if needed.
    Programming Knowledge: Include introductory or advanced programming courses, depending on their familiarity.
    Career Goals and Industry Interests: Choose electives and supporting courses that align with long-term goals (e.g., business electives for aspiring entrepreneurs).
    Interest in Extracurriculars: Suggest club participation and research opportunities as extracurricular activities that align with their fields of interest.
    Additional Data:
    
    Utilize the provided JSON structure to extract program descriptions, entrance requirements, and degree requirements, and include electives related to the major and minor.
    For each schedule, ensure to include general education courses in areas like Humanities, Social Sciences, Arts, Natural Sciences, etc., following Penn State’s GenEd requirements.
    Generate three schedules that are balanced and feasible and in perfect jsonf ormat to be used later on, offering various pathways for an engineering student.
    
    Format:
    Keep in mind i DO NOT WANT any text only this dictionary

    {"Schedule 1":
        {"semester 1": 
            [Courses], {"semester 2": [Courses]},
        },
     "Schedule 2": ...
    }

    `,
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
    <div className="bg-alice-blue min-h-screen p-4 relative">
      <button
        onClick={navigateToDashboard}
        className="absolute top-4 right-4 px-4 py-2 bg-polynesian-blue text-alice-blue rounded hover:bg-celestial-blue"
      >
        Home
      </button>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-bright-pink-crayola text-alice-blue rounded hover:bg-celestial-blue"
      >
        Generate Schedule
      </button>
      {schedules && (
        <div>
          {Object.entries(schedules).map(([Schedule, semesterData]) => (
            <div key={Schedule} className="mt-8">
              <h2 className="text-polynesian-blue font-bold text-3xl mb-4 text-center">
                {Schedule}
              </h2>

              <table className="w-full border-collapse mb-6">
                <thead className="bg-white">
                  <tr>
                    <th className="border px-4 py-2 bg-polynesian-blue text-white">
                      Semester
                    </th>
                    <th className="border px-4 py-2 bg-polynesian-blue text-white">
                      Courses
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(semesterData).map(([semester, courses]) => (
                    <tr key={semester}>
                      <td className="border px-4 py-2 text-smoky-black bg-alice-blue">
                        {semester}
                      </td>
                      <td className="border px-4 py-2 text-smoky-black bg-alice-blue">
                        <ul>
                          {courses.map((course: string, idx: number) => (
                            <li key={idx} className="list-disc ml-4">
                              {course}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
