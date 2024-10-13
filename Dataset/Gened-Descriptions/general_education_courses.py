import requests
from bs4 import BeautifulSoup
import json

# Base URL
base_url = 'https://bulletins.psu.edu'

# URL of the General Education Course Lists page
main_url = f'{base_url}/undergraduate/general-education/course-lists/'

# Send request to fetch HTML content of the main page
response = requests.get(main_url)
soup = BeautifulSoup(response.text, 'html.parser')

# Categories we care about
categories = [
    'Arts Courses',
    'Health and Wellness Courses',
    'Humanities Courses',
    'Natural Sciences Courses',
    'Quantification Courses',
    'Social and Behavioral Sciences Courses',
    'Writing and Speaking Courses',
    'Inter-Domain Courses',
    'First-Year Seminar',
    'International Cultures (IL)',
    'United States Cultures (US)',
    'Writing Across the Curriculum'
]

# Create a dictionary to store courses by category
course_data = {}

# Function to scrape courses from a specific category page
def scrape_courses(category_url):
    response = requests.get(category_url)
    category_soup = BeautifulSoup(response.text, 'html.parser')
    
    # Find all courses listed on the page
    course_list = []
    
    # In this case, courses are in tables, so we search for table rows
    course_table = category_soup.find('table', class_='sc_courselist')
    
    if course_table:
        for row in course_table.find_all('tr')[1:]:  # Skip header row
            columns = row.find_all('td')
            if len(columns) > 1:
                course_code = columns[0].get_text(strip=True)
                course_name = columns[1].get_text(strip=True)
                course_list.append({
                    "course_name": course_code,
                    "course_title": course_name
                })
    
    return course_list

# Iterate through the links in the main page to get each category's link
scraped_categories = set()  # Track which categories have been scraped

for link in soup.find_all('a', href=True):
    if any(category in link.text for category in categories) and not link.text.startswith("B.A. Degree Requirements"):
        category_name = link.text.strip()
        if category_name not in scraped_categories:  # Check if already scraped
            category_url = base_url + link['href']
            print(f'Scraping {category_name} from {category_url}')
            
            # Scrape the courses from the category page
            courses = scrape_courses(category_url)
            
            # Add to the dictionary
            course_data[category_name] = courses
            scraped_categories.add(category_name)  # Mark as scraped

# Save the scraped data to a JSON file
with open('general_education_courses.json', 'w') as json_file:
    json.dump(course_data, json_file, indent=4)

print("Course lists have been saved to 'general_education_courses.json'.")
