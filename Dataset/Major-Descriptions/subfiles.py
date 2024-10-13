import json

# Load the existing JSON file with all programs
with open('Dataset/Major-Descriptions/psu_programs.json', 'r') as file:
    programs = json.load(file)

# Initialize dictionaries for majors, minors, and certificates
majors = {}
minors = {}
certificates = {}

# Keywords to identify the minors and certificates
minor_keywords = ['minor']
certificate_keywords = ['certificate']

# Function to classify the programs into majors, minors, and certificates
def classify_program(program_name):
    # Convert program name to lowercase for case-insensitive matching
    program_name_lower = program_name.lower()

    # Check if it's a minor
    if any(keyword in program_name_lower for keyword in minor_keywords):
        return 'minor'

    # Check if it's a certificate
    if any(keyword in program_name_lower for keyword in certificate_keywords):
        return 'certificate'

    # Otherwise, it's a major
    return 'major'

# Iterate over all programs in the JSON file and classify them
for program_name, program_details in programs.items():
    classification = classify_program(program_name)

    if classification == 'major':
        majors[program_name] = program_details
    elif classification == 'minor':
        minors[program_name] = program_details
    elif classification == 'certificate':
        certificates[program_name] = program_details

# Save the filtered majors, minors, and certificates to separate JSON files
with open('psu_majors.json', 'w') as majors_file:
    json.dump(majors, majors_file, indent=4)

with open('psu_minors.json', 'w') as minors_file:
    json.dump(minors, minors_file, indent=4)

with open('psu_certificates.json', 'w') as certificates_file:
    json.dump(certificates, certificates_file, indent=4)

print("Data has been saved to psu_majors.json, psu_minors.json, and psu_certificates.json.")
