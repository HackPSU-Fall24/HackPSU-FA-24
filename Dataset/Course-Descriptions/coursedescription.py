import requests
from bs4 import BeautifulSoup
import csv
import re

# Function to clean up text by fixing spaces before capital letters
def clean_text(text):
    # Fix missing spaces between words and capital letters
    text = re.sub(r'(\w)([A-Z])', r'\1 \2', text)
    return text.strip()

# Function to clean up prerequisite formatting and fix spaces
def clean_prerequisites(text):
    text = text.replace('Enforced Prerequisite at Enrollment:', '').replace('Concurrent:', '').strip()
    return clean_text(text)  # Apply the clean_text function to fix spaces

# Function to extract only the General Education part of attributes
def extract_gen_ed(attributes):
    gen_ed = ""
    for attr in attributes:
        if 'General Education:' in attr.get_text(strip=True):
            gen_ed = attr.get_text(strip=True).replace('General Education:', '').strip()
            break
    return gen_ed

# Function to split course name and title properly
def split_course_name_title(course_name):
    parts = course_name.split(": ")
    if len(parts) == 2:
        return parts[0].strip(), parts[1].strip()  # Returns course name and title separately
    return course_name.strip(), ""  # Fallback in case no colon is present

# Function to scrape courses from the Math page and save to CSV
def scrape_courses(url, output_file):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Finding all course blocks
    courses = soup.find_all('div', class_='courseblock')

    # Opening the CSV file to write
    with open(output_file, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        # Writing the header
        writer.writerow(['Course Name', 'Course Title', 'Credits', 'Description', 'Prerequisite', 'Concurrent', 'Attributes'])

        # Looping through each course block to extract data
        for course in courses:
            # Extracting course name and title (e.g., MATH 141)
            course_name_full = course.find('div', class_='course_codetitle').get_text(strip=True)
            course_name, course_title = split_course_name_title(course_name_full)

            # Extracting course credits
            credits = course.find('div', class_='course_credits').get_text(strip=True)
            credits = re.sub(r'\D', '', credits)  # Extract only numeric part for credits

            # Extracting course description
            description = course.find('div', class_='courseblockdesc')
            if description:
                description_text = clean_text(description.get_text(strip=True))  # Apply clean_text to fix spaces
            else:
                description_text = "No description available."

            # Extracting enforced prerequisites and concurrent
            prerequisites_block = course.find('p', class_='noindent')
            if prerequisites_block:
                prerequisites_text = clean_prerequisites(prerequisites_block.get_text(strip=True))
            else:
                prerequisites_text = "None"

            # Checking if the prerequisite text has "Concurrent:"
            concurrent_text = ""
            if "Concurrent:" in prerequisites_text:
                concurrent_text = prerequisites_text.split("Concurrent:")[1].strip()
                prerequisites_text = prerequisites_text.split("Concurrent:")[0].strip()

            # Extracting attributes (only General Education)
            attributes_block = course.find_all('p', class_='noindent')
            attributes_text = extract_gen_ed(attributes_block)

            # Writing the extracted data to CSV
            writer.writerow([course_name, course_title, credits, description_text, prerequisites_text, concurrent_text, attributes_text])

# URL of the Mathematics courses page
math_courses_url = 'https://bulletins.psu.edu/university-course-descriptions/undergraduate/math/'

# Calling the function to scrape courses and save to a CSV file
output_file = 'math_courses.csv'
scrape_courses(math_courses_url, output_file)

print(f"Data saved to {output_file} successfully.")
