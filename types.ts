// FIX: Removed self-import of Topic.
export enum Topic {
  Numbers = 'Numbers, Operations & Relationships',
  Patterns = 'Patterns, Functions & Algebra',
  Geometry = 'Space & Shape (Geometry)',
  Measurement = 'Measurement',
  DataHandling = 'Data Handling',
}

export interface WordProblem {
  problem: string;
  answer: number;
}

interface MultipleChoiceQuestion {
  type: 'multiple-choice';
  question: string;
  options: string[];
  correctAnswer: string;
}

interface InputQuestion {
  type: 'input';
  question: string;
  correctAnswer: number;
}

export type QuizQuestion = MultipleChoiceQuestion | InputQuestion;


export interface Profile {
    name: string;
    grade: number;
}