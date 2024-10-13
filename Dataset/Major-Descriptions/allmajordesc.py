import requests
from bs4 import BeautifulSoup
import json

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

# Function to scrape program details
def scrape_major_details(major_url):
    response = requests.get(major_url)
    major_soup = BeautifulSoup(response.text, 'html.parser')
    
    # Scrape relevant sections
    program_desc = major_soup.find('div', id='textcontainer')
    entrance_to_major = major_soup.find('div', id='howtogetintextcontainer')
    degree_requirements = major_soup.find('div', id='programrequirementstextcontainer')
    
    # Extract text content
    program_desc_text = program_desc.get_text(separator="\n").strip() if program_desc else "Not found"
    entrance_to_major_text = entrance_to_major.get_text(separator="\n").strip() if entrance_to_major else "Not found"
    
    # Extract degree requirements (common and specific options)
    common_requirements_tag = degree_requirements.find('h4', string="Common Requirements for the Major (All Options)") if degree_requirements else None
    if common_requirements_tag:
        common_requirements = common_requirements_tag.find_next('table').get_text(separator="\n").strip()
    else:
        common_requirements = "Not found"
    
    # Extract specific options under "Requirements for the Option"
    specific_requirements = {}
    if degree_requirements:
        options_section = degree_requirements.find_all('h5')
        for option in options_section:
            option_name = option.get_text()
            option_table = option.find_next('table')
            if option_table:
                option_requirements = option_table.get_text(separator="\n").strip()
                specific_requirements[option_name] = option_requirements
    
    return {
        'program_description': program_desc_text,
        'entrance_to_major': entrance_to_major_text,
        'degree_requirements': {
            'common_requirements': common_requirements,
            'specific_requirements': specific_requirements
        }
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
with open('college_of_engineering_majors.json', 'w') as json_file:
    json.dump(engineering_data, json_file, indent=4)

print("Data has been saved to college_of_engineering_majors.json.")
