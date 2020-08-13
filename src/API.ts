import { Question, difficultyLevel } from './types.d';
import { shuffleAnswers } from './utils';

export const fetchQuiz =async(questionsAmount: number, difficult:difficultyLevel) => {
  const baseURL = `https://opentdb.com/api.php?amount=${questionsAmount}&category=18&type=multiple&difficulty=${difficultyLevel.EASY}`;

  const res = await fetch(baseURL);
  let {results} = await res.json();

  return results.map((question: Question) => (
    {
      ...question,
      answers: shuffleAnswers([...question.incorrect_answers, question.correct_answer])
    }
  ))

}