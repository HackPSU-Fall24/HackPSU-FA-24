// pages/api/suggestMajor.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

// Initialize OpenAI with your API key
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const suggestMajor = async (responses: any, data: any, minorData: any) => {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant that suggests majors and minors and ranks them based on quiz responses. Make sure the majors you give are strictly based on ${JSON.stringify(data)} and that the minors align with ${JSON.stringify(minorData)}.`,
      },
      {
        role: "user",
        content: `Here are the quiz responses: ${JSON.stringify(responses)}. Suggest a major and minor for this person.`,
      },
    ],
    temperature: 0.7,
  });

  return response.choices[0].message?.content || '';
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { responses } = req.body;

    const majorsPath = path.join(process.cwd(), 'Dataset/Major-Descriptions/psu_majors.json');
    const fileContent = fs.readFileSync(majorsPath, 'utf-8');
    const data = JSON.parse(fileContent);

    const minorData: any = {};
    for (const elem in data) {
      if (elem.includes('minor') || elem.includes('certificate')) {
        minorData[elem] = data[elem];
      }
    }

    const suggestion = await suggestMajor(responses, data, minorData);

    res.status(200).json({ suggestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error suggesting major' });
  }
}
