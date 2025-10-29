import { GoogleGenAI, Type } from "@google/genai";
import { WordProblem, QuizQuestion } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY is not set in environment variables");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateWordProblem(): Promise<WordProblem> {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate a simple, one-step math word problem for a Grade 2 student in South Africa. The problem should involve addition or subtraction with numbers where the sum is up to 100 and subtraction results are positive. The context should be relatable to a South African child (e.g., mention local animals like springboks, places, or currency like Rand). The problem must be solvable with a single numerical answer.`,
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

export async function generateQuizQuestions(topicTitle: string, quizSet: number): Promise<QuizQuestion[]> {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate a quiz with exactly 10 questions for a Grade 2 student in South Africa, based on the topic: "${topicTitle}". This is question set number ${quizSet} out of 3. Ensure the questions are unique from other sets. The questions should be a mix of multiple-choice and single-number-answer 'input' questions.
            For each question, provide a 'type' field ('multiple-choice' or 'input').
            - For 'multiple-choice', provide 4 'options' and a 'correctAnswer' that matches one of the options.
            - For 'input', provide a 'correctAnswer' which is a number formatted as a string. Do not include 'options'.`,
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