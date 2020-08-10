export enum difficultyLevel {
  EASY    = "easy",
  MEDIUM  = "medium",
  HARD    = "hard"
}

export type Question = {
  category: string;
  correct_answer:string;
  difficulty: string;
  incorrect_answers: string[];
  question:string;
  answers:string[],
  type:string;
}

export type QuestionState = Question & { answer: string[]}