import os
import json

# Define the input and output folder paths
input_folders = ["Course-Descriptions", "Gened-Descriptions", "Major-Descriptions"]
output_folder = "Final-Datasets"

# Function to clean the JSON content
def clean_json_content(json_data):
    if isinstance(json_data, dict):
        cleaned_data = {}
        for key, value in json_data.items():
            cleaned_data[clean_text(key)] = clean_json_content(value)
        return cleaned_data
    elif isinstance(json_data, list):
        return [clean_json_content(item) for item in json_data]
    elif isinstance(json_data, str):
        return json_data.replace("\u00a0", " ").strip()
    else:
        return json_data

# Function to clean the text by replacing unwanted characters
def clean_text(text):
    return text.replace("\u00a0", " ").strip()

# Create the output folder if it doesn't exist
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Process all JSON files in the input folders
for folder in input_folders:
    folder_path = os.path.join("Dataset", folder)
    output_folder_path = os.path.join("Dataset/", output_folder)

    for filename in os.listdir(folder_path):
        if filename.endswith(".json"):
            # Load the JSON file
            input_file_path = os.path.join(folder_path, filename)
            with open(input_file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)

            # Clean the JSON content
            cleaned_data = clean_json_content(data)

            # Save the cleaned data to the final dataset folder
            output_file_path = os.path.join(output_folder_path, filename)
            with open(output_file_path, 'w', encoding='utf-8') as f:
                json.dump(cleaned_data, f, indent=4)

print("JSON files have been cleaned and saved to the final datasets folder.")
