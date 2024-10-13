# Importing necessary library
from typing import List

# Function to display the quiz questions
def engineering_quiz():
    questions = {
        "General Academic Background": [
            {
                "question": "What subjects did you enjoy the most in high school? (Select all that apply)",
                "options": [
                    "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Other"
                ],
                "type": "multiple"
            },
            {
                "question": "What subjects did you struggle with the most in high school? (Select all that apply)",
                "options": [
                    "Mathematics", "Physics", "Chemistry", "Computer Science", "Other"
                ],
                "type": "multiple"
            }
        ],
        "Engineering Discipline Interests": [
            {
                "question": "Which engineering fields are you most interested in? (Select up to three)",
                "options": [
                    "Mechanical Engineering", "Civil Engineering", "Electrical Engineering", 
                    "Computer Engineering", "Chemical Engineering", "Biomedical Engineering", 
                    "Aerospace Engineering", "Industrial Engineering", "Environmental Engineering", "Undecided"
                ],
                "type": "multiple"
            },
            {
                "question": "Have you participated in any projects or extracurricular activities related to engineering? If yes, please describe.",
                "type": "open-ended"
            }
        ],
        "Mathematics & Analytical Skills": [
            {
                "question": "On a scale of 1-5, how comfortable are you with the following areas of mathematics?",
                "options": [
                    "Calculus", "Linear Algebra", "Probability and Statistics", 
                    "Differential Equations", "Discrete Mathematics"
                ],
                "type": "scale"
            },
            {
                "question": "Are you interested in applying mathematics in areas such as data analysis, simulations, or optimization in engineering?",
                "type": "yes/no"
            }
        ],
        "Programming & Computational Skills": [
            {
                "question": "Which programming languages are you familiar with? (Select all that apply)",
                "options": ["C/C++", "Python", "Java", "MATLAB", "R", "JavaScript", "None"],
                "type": "multiple"
            },
            {
                "question": "Are you interested in learning more about programming and software development in your engineering career?",
                "options": ["Yes", "No", "Maybe"],
                "type": "single"
            }
        ],
        "Career Aspirations": [
            {
                "question": "What is your long-term career goal in engineering? (Select all that apply)",
                "options": [
                    "Work in industry", "Work in academia or research", 
                    "Start my own business (entrepreneurship)", "Government/Policy", "Unsure"
                ],
                "type": "multiple"
            },
            {
                "question": "Which industries or sectors interest you the most? (Select up to three)",
                "options": [
                    "Aerospace", "Automotive", "Biotechnology", "Energy" ,"Environmental"
                    "Infromational Technology", "Manufacturing", "Robotics/AI","Telecommunications","Other(Please Specify)"
                ],
                "type": "multiple"
            }
        ],
        "Extracurricular & Leadership": [
            {
                "question": "Are you interested in joining engineering clubs, competitions, or research groups during your time in college?",
                "options": ["Yes", "No", "Maybe"],
                "type": "single"
            }
        ],
        "Time Management & Study Habits": [
            {
                "question": "How many hours per week do you typically dedicate to studying outside of class?",
                "options": ["0-5 hours", "5-10 hours", "10-15 hours", "15+ hours"],
                "type": "single"
            }
        ],
        "Elective Interests": [
            {
                "question": "What kind of elective courses would you like to explore outside of core engineering subjects? (Select all that apply)",
                "options": [
                    "Business and Management", "Design and Innovation", "Data Science and AI", 
                    "Environmental Studies", "Humanities and Social Sciences", "Other"
                ],
                "type": "multiple"
            }
        ]
    }



    responses = {}  # Dictionary to store the user's responses

    # Iterate through each section and question
    for section, qs in questions.items():
        print(f"\n--- {section} ---")
        for q in qs:
            print(q["question"])
            
            if q["type"] == "multiple":
                print("Options:", ', '.join(q["options"]))
                answer = input("Your answer (comma separated): ")
                responses[q["question"]] = answer.split(", ")

            elif q["type"] == "scale":
                print("Options: 1 - 5 (1 being least comfortable, 5 being most comfortable)")
                answer = input("Your answer (1-5): ")
                responses[q["question"]] = answer

            elif q["type"] == "yes/no":
                print("Options: Yes, No")
                answer = input("Your answer: ")
                responses[q["question"]] = answer

            elif q["type"] == "single":
                print("Options:", ', '.join(q["options"]))
                answer = input("Your answer: ")
                responses[q["question"]] = answer

            else:
                answer = input("Please describe: ")
                responses[q["question"]] = answer

            print()  # Print a blank line for better formatting

    return responses

# Run the quiz and get responses
#user_responses = engineering_quiz()

# Display the collected responses
#print("\n--- User Responses ---")
#for question, answer in user_responses.items():
#    print(f"{question}: {answer}")
# Run the quiz

