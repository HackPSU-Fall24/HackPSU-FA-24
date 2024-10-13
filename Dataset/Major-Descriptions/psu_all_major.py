import requests
from bs4 import BeautifulSoup
import json
import re

# Base URL for Penn State programs
base_url = 'https://bulletins.psu.edu'

# Fetch the program URLs
def fetch_program_urls():
    url = 'https://bulletins.psu.edu/programs/#filter=.filter_87'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Extract links to all majors/minors (avoid the 'Colleges' entry)
    program_links = soup.find_all('a', href=True)
    program_urls = [base_url + link['href'] for link in program_links if '/undergraduate/colleges/' in link['href']]

    return program_urls

# Function to clean text
def clean_text(text):
    return re.sub(r'\s+', ' ', text).strip()

# Function to extract electives and department options
def extract_electives_supporting(major_soup):
    electives = "Not found"
    supporting_courses = "Not found"

    # Look for text related to electives and department options
    electives_section = major_soup.find_all(text=re.compile(r'Elective|Supporting Course', re.I))
    if electives_section:
        electives = " ".join([clean_text(section) for section in electives_section if re.search(r'Elective', section, re.I)])
        supporting_courses = " ".join([clean_text(section) for section in electives_section if "Supporting Course" in section])

    return electives, supporting_courses

# Function to extract core requirements, nested under 'option' if available
def extract_core_requirements(major_soup):
    degree_requirements = major_soup.find('div', id='programrequirementstextcontainer')
    
    core_requirements = {}
    option = "Not found"
    if degree_requirements:
        options_section = degree_requirements.find_all('h5')
        if options_section:
            # If there are options, store core requirements under the option
            option = {}
            for option_name in options_section:
                option_text = option_name.get_text()
                option_table = option_name.find_next('table')
                if option_table:
                    core_requirements[option_text] = "\n".join([
                        clean_text(row.get_text()) for row in option_table.find_all('tr')
                        if not re.search(r'elective|supporting course', row.get_text(), re.I)
                    ])
        else:
            # If no options are found, store core requirements directly
            core_requirements = " ".join([
                clean_text(row.get_text()) for row in degree_requirements.find_all('tr')
                if not re.search(r'elective|supporting course', row.get_text(), re.I)
            ])

    return core_requirements, option

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
    core_requirements, option = extract_core_requirements(major_soup)

    # Extract electives and supporting courses separately
    electives, supporting_courses = extract_electives_supporting(major_soup)

    return {
        'program_description': program_desc_text,
        'entrance_to_major': entrance_to_major_text,
        'degree_requirements': {
            'option': option if option != "Not found" else None,  # Place 'core_requirements' under option if available
            'core_requirements': core_requirements if option == "Not found" else None  # Core reqs directly if no options
        },
        'electives': electives,
        'supporting_courses': supporting_courses
    }

# Main execution
program_urls = fetch_program_urls()

# Iterate through the program URLs and scrape details
program_data = {}
for program_url in program_urls:
    program_name = program_url.split('/')[-2].replace('-', ' ').capitalize()

    # Skip the 'Colleges' entry and handle valid program names
    if program_name.lower() == "colleges":  # Exclude colleges
        continue

    try:
        program_data[program_name] = scrape_major_details(program_url)
    except Exception as e:
        print(f"Error scraping {program_name}: {e}")

# Save the data to a JSON file
with open('psu_programs.json', 'w') as json_file:
    json.dump(program_data, json_file, indent=4)

print("Data has been saved to psu_programs.json.")
