// src/services/gemini.ts
import axios from 'axios';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const extractTextFromGemini = (response: any): string => {
  try {
    const parts = response?.data?.candidates?.[0]?.content?.parts;
    if (!parts || !Array.isArray(parts)) return '';
    return parts
      .map((p: any) => (typeof p.text === 'string' ? p.text : ''))
      .join('\n')
      .trim();
  } catch {
    return '';
  }
};

export const generateCityArticle = async (cityName: string): Promise<string> => {
  try {
    const prompt = `Generate a detailed, engaging blog-style article about the Kathputli (puppet) history, culture, uniqueness, and puppetry heritage of ${cityName} in Rajasthan, India. Include information about:
- Historical significance of Kathputli in this city
- Cultural importance and traditions
- Unique characteristics of puppetry in this region
- Famous puppeteers or families
- Materials and techniques used
- Current state and preservation efforts

Format with clear sections use markdown headings (#, ##, ###), but DO NOT use bold formatting with ** ** or inline code fences.
 and make it informative yet captivating. Write approximately 800-1000 words.`;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    const text = extractTextFromGemini(response);
    if (!text) throw new Error('Empty Gemini response for city article');
    return text;
  } catch (error) {
    console.error('Error generating city article:', error);
    return `# ${cityName} - Kathputli Heritage

The ancient city of ${cityName} holds a special place in Rajasthan's rich Kathputli tradition. This traditional form of puppetry has been passed down through generations, with master craftsmen creating intricate puppets that tell stories of valor, romance, and folklore.

The puppeteers of ${cityName} are known for their exceptional skill in bringing these wooden figures to life, using strings and traditional folk songs to captivate audiences. The vibrant costumes, detailed craftsmanship, and storytelling prowess make the Kathputli shows of ${cityName} truly unforgettable.

Today, efforts are being made to preserve this ancient art form and pass it on to future generations.`;
  }
};

export const generateTutorial = async (cityName: string): Promise<string> => {
  try {
    const prompt = `Provide a detailed step-by-step tutorial on how a beginner can make an authentic Rajasthani Kathputli puppet, specifically in the style of ${cityName}. Include:
- Materials needed (easily available items)
- 8-10 clear steps with detailed instructions
- Tips for beginners
- Traditional techniques

Format each step clearly with markdown headings (## Step X: Title) and detailed descriptions. Make it practical and achievable for beginners.`;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    const text = extractTextFromGemini(response);
    if (!text) throw new Error('Empty Gemini response for tutorial');
    return text;
  } catch (error) {
    console.error('Error generating tutorial:', error);
    return `# How to Make a Kathputli Puppet

## Materials Needed
- Wooden sticks or dowels
- Fabric scraps (colorful)
- Thread and needle
- Strings
- Paint and brushes
- Cotton for stuffing

## Step 1: Create the Head
Carve or shape a wooden ball into a puppet head. Paint facial features with traditional Rajasthani designs.

## Step 2: Make the Body
Use fabric to create a traditional dress. Stuff with cotton to give it volume.

## Step 3: Attach Strings
Connect strings to the head, hands, and body for movement control.

## Step 4: Add Details
Decorate with mirrors, beads, and traditional embroidery.`;
  }
};

export const generateQuiz = async (cityName: string): Promise<string> => {
  try {
    const prompt = `Generate a 7-question multiple-choice quiz to test knowledge about Kathputli tradition in ${cityName}, Rajasthan.

For each question provide:
- The question text
- 4 options (A, B, C, D)
- Indicate the correct answer as a zero-based index (0-3).

Make questions interesting and educational, covering history, techniques, cultural significance, and famous aspects of Kathputli in ${cityName}.

Strictly return valid JSON ONLY with this exact structure, no extra text or markdown:

{
  "questions": [
    {
      "question": "Question text?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0
    }
  ]
}`;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    const text = extractTextFromGemini(response);
    if (!text) throw new Error('Empty Gemini response for quiz');
    return text;
  } catch (error) {
    console.error('Error generating quiz:', error);
    return JSON.stringify({
      questions: [
        {
          question: `What is the primary material used for making traditional Kathputli puppets in ${cityName}?`,
          options: ['Wood', 'Clay', 'Metal', 'Plastic'],
          correctAnswer: 0,
        },
        {
          question: 'How are Kathputli puppets controlled?',
          options: [
            'Remote control',
            'Hand inside the puppet',
            'Strings attached to sticks',
            'Magnets',
          ],
          correctAnswer: 2,
        },
        {
          question: 'What language are traditional Kathputli performances usually conducted in?',
          options: ['Hindi', 'English', 'Rajasthani', 'Sanskrit'],
          correctAnswer: 2,
        },
        {
          question: 'Which royal family is known for patronizing Kathputli art?',
          options: ['Mughal', 'Rajput', 'Maratha', 'Gupta'],
          correctAnswer: 1,
        },
        {
          question: 'What type of stories do Kathputli performances typically tell?',
          options: [
            'Modern news',
            'Folk tales and historical legends',
            'Science fiction',
            'Crime dramas',
          ],
          correctAnswer: 1,
        },
      ],
    });
  }
};

export const generateShowsIntro = async (cityName: string): Promise<string> => {
  try {
    const prompt = `Write a short, engaging introduction (150-250 words) about Kathputli performances in ${cityName}, Rajasthan.

Explain:
- What makes live puppet shows in this city unique
- Typical settings (streets, havelis, tourist spots, festivals etc.)
- How audiences experience these performances today

Use markdown with a main heading and 1-2 subheadings.`;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    const text = extractTextFromGemini(response);
    if (!text) throw new Error('Empty Gemini response for shows intro');
    return text;
  } catch (error) {
    console.error('Error generating shows intro:', error);
    return '';
  }
};
