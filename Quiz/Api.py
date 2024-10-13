import openai
import Quiz
from dotenv import load_dotenv
import os

load_dotenv()

quiz_responses= Quiz.engineering_quiz()

# Set your OpenAI API key
openai.api_key = os.getenv("API_KEY")

def suggest_major(responses):
    # Create a prompt based on the quiz responses
    prompt = f"""
    Based on the following quiz responses, suggest the most suitable engineering major:
    
    1. Enjoyed Subjects: {', '.join(responses["What subjects did you enjoy the most in high school? (Select all that apply)"])}
    2. Struggled Subjects: {', '.join(responses["What subjects did you struggle with the most in high school? (Select all that apply)"])}
    3. Engineering Interests: {', '.join(responses["Which engineering fields are you most interested in? (Select up to three)"])}
    4. Engineering Extracurricular:{', '.join(responses["Have you participated in any projects or extracurricular activities related to engineering? If yes, please describe."])}
    5. Mathematics Comfort Level: {', '.join(responses["On a scale of 1-5, how comfortable are you with the following areas of mathematics?"])}
    6. Mathematics Interest: {', '.join(responses["Are you interested in applying mathematics in areas such as data analysis, simulations, or optimization in engineering?"])}
    7. Programming Languages: {', '.join(responses["Which programming languages are you familiar with? (Select all that apply)"])}
    8. Programming Languages Interest: {', '.join(responses["Are you interested in learning more about programming and software development in your engineering career?"])}
    9. Career Goals: {', '.join(responses["What is your long-term career goal in engineering? (Select all that apply)"])}
    10. Career interest: {', '.join(responses["Which industries or sectors interest you the most? (Select up to three)"])}
    11. Extracurricular Activities: {responses["Are you interested in joining engineering clubs, competitions, or research groups during your time in college?"]}
    12. Study Hours Per Week: {responses["How many hours per week do you typically dedicate to studying outside of class?"]}
    13. Elective Interests: {responses["What kind of elective courses would you like to explore outside of core engineering subjects? (Select all that apply)"]}
    
    Suggest a suitable engineering major.
    """
    
    # Call OpenAI's API to analyze the responses and suggest a major
    response = openai.chat.completions.create(
      model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that suggests majors and ranks them based on quiz responses."},
            {"role": "user", "content": f"Here are the quiz responses: {quiz_responses}. Suggest a major for this student."}
        ],
      #max_tokens=100,
      temperature=0.7
    )

    # Return the model's response
    return response.choices[0].message.content

# Example use of the function
major_suggestion = suggest_major(quiz_responses)
print(f"Suggested Engineering Major: {major_suggestion}")



