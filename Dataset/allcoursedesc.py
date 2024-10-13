import requests
from bs4 import BeautifulSoup
import csv
import re

# Function to clean text by removing extra spaces
def clean_text(text):
    return re.sub(r'\s+', ' ', text).strip()

# Function to split course name and title properly, handling edge cases
def split_course_name_title(course_name_full):
    # Check for the presence of a colon to split
    if ": " in course_name_full:
        # Split at the colon
        parts = course_name_full.split(": ", 1)
        return parts[0].strip(), parts[1].strip()  # Returns course name and title separately
    else:
        # Fallback: no colon found, just return the full text as course name
        return course_name_full.strip(), ""  # Title will be empty if no colon is present

# Function to clean and format prerequisites text
def clean_prerequisites(prerequisites_text):
    # Replace Enforced Prerequisite and any other unnecessary text
    prerequisites_text = re.sub(r'Enforced Prerequisite at Enrollment:', '', prerequisites_text)
    prerequisites_text = re.sub(r'\s+', ' ', prerequisites_text).strip()
    return prerequisites_text

# Function to extract General Education attributes from the attributes block
def extract_gen_ed(attributes_block):
    attributes_text = ""
    for attr in attributes_block:
        attr_text = attr.get_text(strip=True)
        if "General Education:" in attr_text:
            attributes_text = attr_text.replace("General Education:", "").strip()
    return attributes_text

# Function to scrape courses from each subject page
def scrape_courses(subject_url, writer):
    response = requests.get(subject_url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Finding all course blocks
    courses = soup.find_all('div', class_='courseblock')

    # Looping through each course block to extract data
    for course in courses:
        # Extracting course name and title (e.g., BRASS 474: Tuba: Primary VIII)
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

# Function to scrape all subjects from the main undergraduate page
def scrape_subjects(main_url, csv_filename):
    response = requests.get(main_url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Finding the list of subjects from the left panel (not buttons)
    subject_links = soup.select('ul.nav.leveltwo li a')

    # Open CSV file for writing
    with open(csv_filename, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        # Write CSV header
        writer.writerow(['Course Name', 'Course Title', 'Credits', 'Description', 'Prerequisites', 'Concurrent', 'Attributes'])

        # Loop through each subject and scrape courses
        for link in subject_links:
            subject_url = "https://bulletins.psu.edu" + link['href']
            print(f"Scraping subject: {link.get_text(strip=True)}")
            scrape_courses(subject_url, writer)

# Main function to start scraping
if __name__ == "__main__":
    main_url = 'https://bulletins.psu.edu/university-course-descriptions/undergraduate/'
    csv_filename = 'psu_courses.csv'
    scrape_subjects(main_url, csv_filename)
    print(f"Courses scraped and saved to {csv_filename}")
