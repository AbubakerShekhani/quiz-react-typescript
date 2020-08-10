import React, { FC, useState } from 'react';
import './App.css';
import {fetchQuiz } from './API';
import QuestionCard from './components/QuestionCard';
import { difficultyLevel, QuestionState, userAnswerDetails } from './types.d';

const TOTALQUESTIONS = 10;

const App:FC = () =>  {

  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [loading, setLoading] = useState(false)
  const [quizEnd, setQuizEnd] = useState(true)
  const [questionNumber, setquestionNumber] = useState(0)
  const [score, setScore] = useState(0)
  const [userAnswers, setUserAnswers] = useState<userAnswerDetails[]>([])

  const startQuiz = async()  => {

    setLoading(true)
    const quizQuestions = await fetchQuiz(10, difficultyLevel.EASY);
    console.log(await quizQuestions)

    setQuestions(quizQuestions)
    setLoading(false)
    setQuizEnd(false)
    setquestionNumber(0)
    setScore(0)
    setUserAnswers([])

   }

  const verifyAnswer = (e:React.MouseEvent<HTMLButtonElement>) => {

    console.log(e.currentTarget.value);
    const userSelection = e.currentTarget.value;

    const isCorrect = questions[questionNumber].correct_answer === userSelection

    if (isCorrect) {
      setScore((prev) => prev +1)
    }

    const allUserAnswers = {
      question: questions[questionNumber].question,
      answer: userSelection,
      correctAnswer: questions[questionNumber].correct_answer,
      isCorrect
    };

    setUserAnswers((prev) => [...prev, allUserAnswers]);

  }

  const nextQuestion = () => {
    const nextQuestion = questionNumber + 1;

    if (nextQuestion === TOTALQUESTIONS) {
      //Quiz has ended
      setQuizEnd(true)
    } else {
      setquestionNumber(nextQuestion)
      setQuizEnd(false)
    }
  }

  return (
    <div className="App">
      <div>
      Quiz

      </div>
        { loading ? <p>Loading..</p> : null }

        <div>User Score: { score }</div>

        { !loading && !quizEnd && questions.length > 0 &&
          <div>
          <p>Question { questionNumber + 1 } / { TOTALQUESTIONS }</p>
          <QuestionCard
            question = {questions[questionNumber].question}
            questionNumber = {questionNumber + 1}
            totalQuestions = {TOTALQUESTIONS}
            answers={questions[questionNumber].answers}
            userAnswer={userAnswers ? userAnswers[questionNumber]:undefined}
            callback={verifyAnswer}
          />
          </div>
        }

        { quizEnd &&
              <div>
                <button onClick={() => startQuiz()}>Start Quiz</button>
              </div>
        }
        {
          (quizEnd && questionNumber>0 ) ?
            <p>Quiz Finished. You Scored: { score }</p>
            :
            null
        }
        { !quizEnd &&
        <div>
          <button onClick={() => nextQuestion()} >Next</button>
        </div>
        }
    </div>
  );
}

export default App;
