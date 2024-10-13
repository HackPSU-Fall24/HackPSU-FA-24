import * as fs from 'fs';

// Define the interface for the major data structure
interface MajorData {
  program_description: string;
  entrance_to_major: string;
  degree_requirements: {
    core_requirements: { [key: string]: string };
  };
  general_education: { [key: string]: string };
  university_requirements: { [key: string]: string };
  electives: { [key: string]: string[] };
}

// Read and parse the JSON file
function readJsonFile(filepath: string): Promise<{ [major: string]: MajorData }> {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      const parsedData = JSON.parse(data);
      resolve(parsedData);
    });
  });
}

// Function to find and list the required courses for a given major
async function listRequiredCourses(majorName: string, filepath: string): Promise<void> {
  try {
    // Load the dataset
    const majorData = await readJsonFile(filepath);

    // Check if the major exists in the dataset
    if (majorData[majorName]) {
      const majorDetails = majorData[majorName];

      // List core requirements
      console.log(`Core Requirements for ${majorName}:`);
      for (const [requirement, description] of Object.entries(majorDetails.degree_requirements.core_requirements)) {
        console.log(`- ${requirement}: ${description}`);
      }

      // List general education requirements
      console.log(`\nGeneral Education Requirements for ${majorName}:`);
      for (const [requirement, credits] of Object.entries(majorDetails.general_education)) {
        console.log(`- ${requirement}: ${credits}`);
      }

      // List university requirements
      console.log(`\nUniversity Requirements for ${majorName}:`);
      for (const [requirement, credits] of Object.entries(majorDetails.university_requirements)) {
        console.log(`- ${requirement}: ${credits}`);
      }

      // List electives
      console.log(`\nElectives for ${majorName}:`);
      for (const [category, courses] of Object.entries(majorDetails.electives)) {
        console.log(`- ${category}: ${courses.join(', ')}`);
      }
    } else {
      throw new Error(`Major '${majorName}' not found in the dataset.`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example usage:
(async () => {
  const filepath = 'Dataset/Final-Datasets/college_of_engineering_majors_with_electives_and_supporting.json';
  const majorName = 'Aerospace engineering bs'; // Example major name
  
  await listRequiredCourses(majorName, filepath);
})();
