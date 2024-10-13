import openai
import Quiz
#from dotenv import load_dotenv
import os

import json


#load_dotenv()
#load dataset of the engineering




# Set your OpenAI API key
openai.api_key = "sk-8Le14Fc1yiLKp5_bQIH6rNxc9GEn6tzH6S1aExgH6IT3BlbkFJA4gEln9XSpGiWVcO6-MR5Vl1970oyQBHk-GQ_c1OAA"

def suggest_major(responses,data):    
    # Call OpenAI's API to analyze the responses and suggest a major
    response = openai.chat.completions.create(
      model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": f"You are a helpful assistant that suggests majors and minors and ranks them based on quiz responses. Make sure the majors that you give are strictly based on the majors in {data}. Also do not deviate from {minor_data} for finding the appropriate minors"},
            {"role": "user", "content": f"Here are the quiz responses: {responses}. Suggest a major for this person. Make sure that you answer in second person prespective."}
        ],
      #max_tokens=100,
      temperature=0.7
    )

    # Return the model's response
    suggested_major = response.choices[0].message.content
    
    return suggested_major
 
def read_json_file(filepath):
    # Open and read the file
    minor_data={}
    with open(filepath, "r") as f:
        data = json.load(f)  # Load the JSON data into a Python object (usually a dictionary or list)

    for elem in data:
        if 'minor' in elem or 'certificate' in elem:
            minor_data[elem]=data[elem]
            
    return data, minor_data



#function to make the quiz responses normalised
def normalize_quiz_responses(quiz_responses):
    normalized_responses = {}

    # Normalizing each question
    normalized_responses['enjoyed_subjects'] = quiz_responses.get("What subjects did you enjoy the most in high school? (Select all that apply)", [])
    normalized_responses['struggled_subjects'] = quiz_responses.get("What subjects did you struggle with the most in high school? (Select all that apply)", [])
    normalized_responses['engineering_interests'] = quiz_responses.get("Which engineering fields are you most interested in? (Select up to three)", [])
    normalized_responses['engineering_projects'] = quiz_responses.get("Have you participated in any projects or extracurricular activities related to engineering? If yes, please describe.", "")
    normalized_responses['math_comfort_level'] = quiz_responses.get("On a scale of 1-5, how comfortable are you with the following areas of mathematics?", "")
    normalized_responses['math_interest'] = quiz_responses.get("Are you interested in applying mathematics in areas such as data analysis, simulations, or optimization in engineering?", "")
    normalized_responses['programming_languages'] = quiz_responses.get("Which programming languages are you familiar with? (Select all that apply)", [])
    normalized_responses['programming_interest'] = quiz_responses.get("Are you interested in learning more about programming and software development in your engineering career?", "")
    normalized_responses['career_goals'] = quiz_responses.get("What is your long-term career goal in engineering? (Select all that apply)", [])
    normalized_responses['industry_interest'] = quiz_responses.get("Which industries or sectors interest you the most? (Select up to three)", [])
    normalized_responses['extracurricular_interest'] = quiz_responses.get("Are you interested in joining engineering clubs, competitions, or research groups during your time in college?", "")
    normalized_responses['study_hours_per_week'] = quiz_responses.get("How many hours per week do you typically dedicate to studying outside of class?", "")
    normalized_responses['elective_interests'] = quiz_responses.get("What kind of elective courses would you like to explore outside of core engineering subjects? (Select all that apply)", [])

    return normalized_responses


# Function to save quiz responses and suggestions into a JSON file
def save_to_json(normalized_responses, suggested_major, filename="quiz_responses.json"):
    # Prepare the data for saving
    data = {
        "quiz_responses": normalized_responses,
        "suggested_major": suggested_major
    }
    
    # Write data to JSON file
    with open(filename, "w") as json_file:
        json.dump(data, json_file, indent=4)
    
    #print(f"Data saved to {filename}.")


# Run the quiz suggestion process
if __name__ == "__main__":
    datapath='Dataset/Major-Descriptions/college_of_engineering_majors_with_electives_and_supporting.json'
    data, minor_data = read_json_file(datapath)
     
    quiz_responses= Quiz.engineering_quiz()
    normalized_responses=normalize_quiz_responses(quiz_responses)
    print(quiz_responses)  # For debugging, you can remove this later
    major_suggestion = suggest_major(quiz_responses, data)
    save_to_json(normalized_responses, major_suggestion)


