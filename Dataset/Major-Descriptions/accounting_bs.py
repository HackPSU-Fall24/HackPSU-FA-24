import requests
from bs4 import BeautifulSoup
import json

# URL of the page
url = 'https://bulletins.psu.edu/undergraduate/colleges/smeal-business/accounting-bs/'

# Send a request to fetch the HTML content of the page
response = requests.get(url)

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(response.text, 'html.parser')

# Find the sections that contain the important information
program_desc = soup.find('div', id='textcontainer')
entrance_to_major = soup.find('div', id='howtogetintextcontainer')
degree_requirements = soup.find('div', id='programrequirementstextcontainer')
academic_plan = soup.find('div', id='suggestedacademicplancopytextcontainer')

# Extract text content from each section
program_desc_text = program_desc.get_text(separator="\n").strip() if program_desc else "Not found"
entrance_to_major_text = entrance_to_major.get_text(separator="\n").strip() if entrance_to_major else "Not found"
degree_requirements_text = degree_requirements.get_text(separator="\n").strip() if degree_requirements else "Not found"
academic_plan_text = academic_plan.get_text(separator="\n").strip() if academic_plan else "Not found"

# Create a dictionary with the extracted data
data = {
    "Program Description": program_desc_text,
    "Entrance to Major": entrance_to_major_text,
    "Degree Requirements": degree_requirements_text,
}

# Specify the file name and path for the JSON file
json_file_path = 'accounting_bs_info.json'

# Save the data to a JSON file
with open(json_file_path, 'w') as json_file:
    json.dump(data, json_file, indent=4)

# Print out the scraped information and confirm saving
print("Program Description:\n", program_desc_text)
print("\nEntrance to Major:\n", entrance_to_major_text)
print("\nDegree Requirements:\n", degree_requirements_text)
print(f"\nData has been saved to {json_file_path}")
