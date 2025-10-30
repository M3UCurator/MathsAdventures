import { GoogleGenAI, Type } from "@google/genai";
import { WordProblem, QuizQuestion, Topic } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY is not set in environment variables");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateWordProblem(grade: number): Promise<WordProblem> {
    const gradeSpecificPrompt = grade === 3
        ? `Generate a math word problem for a Grade 3 student in South Africa. The problem can involve addition/subtraction with 3-4 digit numbers, or simple multiplication/division. The context should be relatable to a South African child (e.g., mention local animals, places, or currency like Rand). The problem must be solvable with a single numerical answer.`
        : `Generate a simple, one-step math word problem for a Grade 2 student in South Africa. The problem should involve addition or subtraction with numbers where the sum is up to 100 and subtraction results are positive. The context should be relatable to a South African child (e.g., mention local animals like springboks, places, or currency like Rand). The problem must be solvable with a single numerical answer.`;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: gradeSpecificPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        problem: {
                            type: Type.STRING,
                            description: "The text of the word problem.",
                        },
                        answer: {
                            type: Type.INTEGER,
                            description: "The numerical solution to the problem.",
                        },
                    },
                    required: ["problem", "answer"],
                },
                temperature: 0.9,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText);
        
        if (typeof parsedResponse.problem === 'string' && typeof parsedResponse.answer === 'number') {
            return parsedResponse as WordProblem;
        } else {
            throw new Error("Invalid response format from API");
        }

    } catch (error) {
        console.error("Error generating word problem:", error);
        // Fallback in case of API failure
        return Promise.resolve({
            problem: "If you have 25 sweets and you get 10 more, how many sweets do you have in total?",
            answer: 35
        });
    }
}

const grade3Curriculum = {
  [Topic.Numbers]: `
- **Number Sense and Place Value:** Count, read, write numbers up to 10,000; understand place value (thousands, hundreds, tens, ones); compare, order, and round numbers to the nearest 10, 100, and 1,000.
- **Operations and Problem Solving:** Master addition and subtraction with 3–4 digit numbers; use multiplication tables (1–10); understand division as sharing and grouping; solve word problems using all operations.
- **Fractions:** Understand and represent ½, ¼, ⅓, ⅕, ⅙, ⅛; identify fractions of shapes and sets; compare and order simple fractions.
- **Problem Solving & Reasoning:** Integrate multiple concepts into applied tasks.`,
  [Topic.Patterns]: `
- **Patterns, Functions, and Algebra:** Recognize, describe, and extend numeric and geometric patterns; identify rules for patterns (add, subtract, multiply); build input–output tables.`,
  [Topic.Geometry]: `
- **Space and Shape (Geometry):** Identify, name, and describe 2D shapes and 3D objects; explore properties (sides, faces, corners, edges); recognize symmetry; understand position, direction, and movement.`,
  [Topic.Measurement]: `
- **Measurement:** Measure length (mm, cm, m), mass (g, kg), and capacity (mℓ, ℓ); read analogue/digital clocks (hour, half-hour, quarter-hour); add and subtract Rand and cents, make change; estimate and compare measurements.`,
  [Topic.DataHandling]: `
- **Data Handling:** Collect, record, and organize data; represent data using tally charts, bar graphs, and pictographs; interpret and compare graphs.`
};


export async function generateQuizQuestions(topicTitle: string, quizSet: number, grade: number): Promise<QuizQuestion[]> {
    let prompt;

    if (grade === 3) {
        const curriculumDetails = grade3Curriculum[topicTitle as Topic] || `the specified topic: ${topicTitle}`;
        let specialInstructions = '';
        if (topicTitle === Topic.Numbers) {
            specialInstructions = `For this complex topic, please focus Quiz Set ${quizSet} on one or two of the curriculum areas (e.g., Place Value for Quiz 1, Operations for Quiz 2, Fractions for Quiz 3) to ensure variety across the 3 quiz sets.`;
        }
        prompt = `Generate a quiz with exactly 10 questions for a Grade 3 student in South Africa, based on the topic: "${topicTitle}".
This is question set number ${quizSet} out of 3. Ensure the questions are unique from other sets and are based on the following Grade 3 curriculum points:
${curriculumDetails}
${specialInstructions}
The questions should be a mix of multiple-choice and single-number-answer 'input' questions.
For each question, provide a 'type' field ('multiple-choice' or 'input').
- For 'multiple-choice', provide 4 'options' and a 'correctAnswer' that matches one of the options.
- For 'input', provide a 'correctAnswer' which is a number formatted as a string. Do not include 'options'.`;

    } else { // grade === 2 (or default)
        prompt = `Generate a quiz with exactly 10 questions for a Grade 2 student in South Africa, based on the topic: "${topicTitle}". This is question set number ${quizSet} out of 3. Ensure the questions are unique from other sets. The questions should be a mix of multiple-choice and single-number-answer 'input' questions.
For each question, provide a 'type' field ('multiple-choice' or 'input').
- For 'multiple-choice', provide 4 'options' and a 'correctAnswer' that matches one of the options.
- For 'input', provide a 'correctAnswer' which is a number formatted as a string. Do not include 'options'.`;
    }
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        questions: {
                            type: Type.ARRAY,
                            description: "An array of 10 quiz questions.",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    question: { type: Type.STRING, description: "The question text." },
                                    type: { type: Type.STRING, enum: ['multiple-choice', 'input'], description: "The type of question." },
                                    options: {
                                        type: Type.ARRAY,
                                        description: "An array of 4 possible answers. Only for 'multiple-choice' type.",
                                        items: { type: Type.STRING }
                                    },
                                    correctAnswer: {
                                        type: Type.STRING,
                                        description: "The correct answer. For 'multiple-choice' it's one of the options. For 'input' it's a number as a string."
                                    }
                                },
                                required: ["question", "type", "correctAnswer"]
                            }
                        }
                    },
                    required: ["questions"]
                },
                temperature: 0.7,
            },
        });

        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText);

        const rawQuestions = (parsedResponse.questions || []) as any[];
        
        const validatedQuestions: QuizQuestion[] = rawQuestions.map(q => {
            if (q.type === 'multiple-choice') {
                if (!q.question || !Array.isArray(q.options) || q.options.length < 2 || !q.correctAnswer) {
                    throw new Error('Invalid multiple-choice question format from API');
                }
                return {
                    type: 'multiple-choice',
                    question: q.question,
                    options: q.options,
                    correctAnswer: q.correctAnswer,
                };
            } else if (q.type === 'input') {
                const answer = parseInt(q.correctAnswer, 10);
                if (!q.question || isNaN(answer)) {
                    throw new Error('Invalid input question format from API');
                }
                return {
                    type: 'input',
                    question: q.question,
                    correctAnswer: answer,
                };
            } else {
                throw new Error(`Unknown question type from API: ${q.type}`);
            }
        });

        if (validatedQuestions.length !== 10) {
            throw new Error(`API returned ${validatedQuestions.length} questions instead of 10.`);
        }

        return validatedQuestions;


    } catch (error) {
        console.error(`Error generating quiz for topic ${topicTitle}:`, error);
        throw new Error(`Oops! I couldn't create a quiz for ${topicTitle}. Please try again in a moment.`);
    }
}
