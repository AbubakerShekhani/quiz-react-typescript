import { Question, difficultyLevel } from './types.d';

export const fetchQuiz =async(questionsAmount: number, difficult:difficultyLevel) => {
  const baseURL = `https://opentdb.com/api.php?amount=${questionsAmount}&category=18&type=multiple&difficulty=${difficultyLevel.EASY}`;

  const data = await (await fetch(baseURL)).json();

  return data.results.map((question: Question) => (
    {
      ...question,
      answers: [...question.incorrect_answers, question.correct_answer]
    }
  ))

}