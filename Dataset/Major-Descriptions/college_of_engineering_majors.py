import requests
from bs4 import BeautifulSoup
import json
import re

# Base URL for College of Engineering programs
base_url = 'https://bulletins.psu.edu'
url = 'https://bulletins.psu.edu/programs/#filter=.filter_22&.filter_24&.filter_87&.filter_32'

# Send request to fetch HTML content
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Find all links to College of Engineering majors
majors = soup.find_all('a', href=True)

# Filter links that are part of the College of Engineering
engineering_majors = []
for link in majors:
    href = link['href']
    if '/undergraduate/colleges/engineering/' in href:
        engineering_majors.append(base_url + href)

# General Education section
general_education = {
    "GQ": "6 credits (Quantification)",
    "GWS": "9 credits (Writing and Speaking)",
    "GA": "3 credits (Arts)",
    "GH": "3 credits (Humanities)",
    "GS": "3 credits (Social and Behavioral Sciences)",
    "GN": "3 credits (Natural Sciences)",
    "Inter-Domain": "6 credits (Integrative Studies)"
}

# University Requirements section
university_requirements = {
    "FYS": "1-3 credits (First Year Seminar)",
    "US Cultures": "3 credits (United States Cultures)",
    "IL Cultures": "3 credits (International Cultures)",
    "WAC": "3 credits (Writing Across the Curriculum)"
}

# Function to clean text
def clean_text(text):
    return re.sub(r'\s+', ' ', text).strip()

# Function to extract electives and department options
def extract_electives_supporting(major_soup):
    electives = "Not found"
    supporting_courses = "Not found"
    
    # Look for text related to electives and department options
    electives_section = major_soup.find_all(text=re.compile(r'Elective|Technical Elective|Supporting Course|Department List|Department Option', re.I))
    if electives_section:
        electives = " ".join([clean_text(section) for section in electives_section if re.search(r'Elective|Department Option', section, re.I)])
        supporting_courses = " ".join([clean_text(section) for section in electives_section if "Supporting Course" in section])
    
    return electives, supporting_courses

# Function to scrape core requirements excluding electives and department options
def extract_core_requirements(major_soup):
    degree_requirements = major_soup.find('div', id='programrequirementstextcontainer')
    
    # Extract the core requirements without electives, supporting courses, or department options
    core_requirements = {}
    if degree_requirements:
        options_section = degree_requirements.find_all('h5')
        for option in options_section:
            option_name = option.get_text()
            option_table = option.find_next('table')
            if option_table:
                # Extract only the rows that do not mention 'electives', 'supporting courses', or 'department options'
                core_requirements[option_name] = "\n".join([
                    clean_text(row.get_text()) for row in option_table.find_all('tr') 
                    if not re.search(r'elective|supporting course|department option|department list', row.get_text(), re.I)
                ])
    
    return core_requirements

# Function to scrape program details
def scrape_major_details(major_url):
    response = requests.get(major_url)
    major_soup = BeautifulSoup(response.text, 'html.parser')
    
    # Scrape relevant sections
    program_desc = major_soup.find('div', id='textcontainer')
    entrance_to_major = major_soup.find('div', id='howtogetintextcontainer')
    
    # Extract text content
    program_desc_text = program_desc.get_text(separator="\n").strip() if program_desc else "Not found"
    entrance_to_major_text = entrance_to_major.get_text(separator="\n").strip() if entrance_to_major else "Not found"
    
    # Extract core requirements excluding electives and department options
    core_requirements = extract_core_requirements(major_soup)
    
    # Extract electives and supporting courses separately
    electives, supporting_courses = extract_electives_supporting(major_soup)
    
    return {
        'program_description': program_desc_text,
        'entrance_to_major': entrance_to_major_text,
        'degree_requirements': {
            'core_requirements': core_requirements
        },
        'general_education': general_education,  # Include General Education requirements
        'university_requirements': university_requirements,  # Include University Requirements
        'electives': electives,  # Include electives and department options here
        'supporting_courses': supporting_courses  # Include supporting courses here
    }

# Iterate through all engineering majors and scrape details
engineering_data = {}
for major_url in engineering_majors:
    major_name = major_url.split('/')[-2].replace('-', ' ').capitalize()
    try:
        engineering_data[major_name] = scrape_major_details(major_url)
    except Exception as e:
        print(f"Error scraping {major_name}: {e}")

# Save the data to a JSON file
with open('college_of_engineering_majors_with_electives_and_supporting.json', 'w') as json_file:
    json.dump(engineering_data, json_file, indent=4)

print("Data has been saved to college_of_engineering_majors_with_electives_and_supporting.json.")
