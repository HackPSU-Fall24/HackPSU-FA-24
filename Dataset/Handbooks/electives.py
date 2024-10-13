import json

# Load the existing JSON file
with open('Dataset/Major-Descriptions/college_of_engineering_majors_with_electives_and_supporting.json', 'r') as file:
    data = json.load(file)

# Helper function to clean up empty or irrelevant sections
def clean_up_section(major_data):
    # Remove the supporting_courses section if it doesn't have any content
    if "supporting_courses" in major_data and not major_data["supporting_courses"]:
        del major_data["supporting_courses"]
    
    # Remove any other empty sections (if needed)
    for key in list(major_data):
        if not major_data[key]:  # If the section is empty, remove it
            del major_data[key]

# Update Aerospace Engineering section
data['Aerospace Engineering bs'] = {
    "program_description": data['Aerospace engineering bs'].get("program_description", ""),
    "entrance_to_major": data['Aerospace engineering bs'].get("entrance_to_major", ""),
    "electives": {
        "Aerospace Technical Electives": [
            "AERSP 204/404",
            "AERSP 494 and 496",
            "AERSP Technical Electives (400-level AERSP courses)"
        ],
        "General Technical Electives": [
            "ASTRO 291",
            "PHYS 237",
            "EMCH 407",
            "MATH 410",
            "E E 456"
        ]
    }
}
clean_up_section(data['Aerospace engineering bae'])

# Update Architectural Engineering section
data['Architectural engineering bs'] = {
    "program_description": data['Architectural engineering bae'].get("program_description", ""),
    "entrance_to_major": data['Architectural engineering bae'].get("entrance_to_major", ""),
    "electives": {
        "Structural Option": [
            "AE 430: Indeterminate Structures",
            "AE 431: Advanced Concrete Design",
            "AE 432: Masonry Structures"
        ],
        "Mechanical Option": [
            "AE 454: Advanced HVAC",
            "AE 455: HVAC Design",
            "AE 457: HVAC Controls"
        ],
        "Lighting/Electrical Option": [
            "AE 461: Architectural Illumination Systems",
            "AE 463: Daylighting Analysis",
            "AE 469: Photovoltaic Systems Design"
        ]
    }
}
clean_up_section(data['Architectural engineering bs'])

# Update Biological Engineering section
data['Biological engineering bs'] = {
    "program_description": data['Biological engineering bs'].get("program_description", ""),
    "electives": {
        "Engineering Science/Design Courses": [
            "BE 461: Design of Fluid Power Systems",
            "BE 464: Bioenergy Systems Engineering",
            "CE 462: Open Channel Hydraulics",
            "ME 444: Engineering Optimization"
        ]
    }
}
clean_up_section(data['Biological engineering bs'])

# Update Bioengineering section
data['Biomedical engineering bs'] = {
    "program_description": data['Bioengineering bs'].get("program_description", ""),
    "electives": {
        "Biochemical Option Electives": [
            "BME 433: Advanced Biomaterials",
            "BME 443: Biomechanics",
            "CH E 340: Chemical Engineering Thermodynamics",
            "BME 496 or 494H"
        ],
        "Biomechanics Option Electives": [
            "BME 419: Biomedical Device Engineering",
            "E MCH 461: Finite Elements in Engineering",
            "M E 461: Internal Combustion Engines",
            "E MCH 446: Failure of Solids"
        ]
    }
}
clean_up_section(data['Bioengineering bs'])

# Update Chemical Engineering section
data['Chemical engineering bs'] = {
    "program_description": data['Chemical engineering bs'].get("program_description", ""),
    "electives": {
        "Technical Electives": [
            "CH E 340: Chemical Engineering Thermodynamics",
            "CH E 438: Chemical Reactor Design",
            "BMB 251: Molecular and Cell Biology I",
            "CHEM 457: Experimental Physical Chemistry"
        ]
    }
}
clean_up_section(data['Chemical engineering bs'])

# Update Electrical Engineering section
data['Electrical engineering bs'] = {
    "program_description": data['Electrical engineering bs'].get("program_description", ""),
    "electives": {
        "300-Level Electives": [
            "EE 311: Electronic Circuit Design II",
            "EE 320: Introduction to Electro-Optical Engineering",
            "EE 337: Introduction to Quantum Information Science",
            "EE 351: Discrete-Time Linear Systems"
        ],
        "400-Level Electives": [
            "EE 410: Linear Electronic Design",
            "EE 416: Digital Integrated Circuits / VLSI Design",
            "EE 421: Optical Fiber Communications"
        ]
    }
}
clean_up_section(data['Electrical engineering bs'])

# Update Computer Engineering section
data['Computer engineering bs'] = {
    "program_description": data['Computer engineering bs'].get("program_description", ""),
    "electives": {
        "Digital Systems Focus": [
            "CMPEN 431: Introduction to Computer Architecture",
            "CMPEN 441: Embedded Systems",
            "CMPEN 454: Digital Systems Design"
        ],
        "Networking Focus": [
            "CMPEN 461: Computer Networks",
            "CMPEN 473: Advanced Networking"
        ],
        "Software Engineering Focus": [
            "CMPSC 421: Algorithms",
            "CMPSC 431W: Database Management Systems",
            "CMPSC 465: Data Structures and Algorithms"
        ]
    }
}
clean_up_section(data['Computer engineering bs'])

# Update Computer Science section
data['Computer science bs'] = {
    "program_description": data['Computer science bs'].get("program_description", ""),
    "electives": {
        "Computer Science Electives": [
            "CMPSC 402: Operating Systems Design",
            "CMPSC 421: Advanced Algorithms",
            "CMPSC 431W: Database Management Systems",
            "CMPSC 465: Data Structures and Algorithms",
            "CMPSC 448: Machine Learning and Pattern Recognition"
        ]
    }
}
clean_up_section(data['Computer science bs'])

# Update Nuclear Engineering section
data['Nuclear engineering bs'] = {
    "program_description": data['Nuclear engineering bs'].get("program_description", ""),
    "electives": {
        "Nuclear Engineering Technical Electives": [
            "NUCE 420: Radiological Safety",
            "NUCE 430: Design Principles of Reactor Systems",
            "NUCE 451: Experiments in Reactor Physics",
            "NUCE 460: Advanced Reactor Physics"
        ],
        "General Technical Electives": [
            "EE 212: Introduction to Electronic Measuring Systems",
            "EMCH 213: Strength of Materials"
        ]
    }
}
clean_up_section(data['Nuclear engineering bs'])

# Save the updated data back to the JSON file
with open('existing_file.json', 'w') as file:
    json.dump(data, file, indent=4)

print("Electives and relevant content have been successfully added to the JSON file!")
