import React, { FC, useState } from 'react';
import './App.css';
import {fetchQuiz } from './API';
import QuestionCard from './components/QuestionCard';
import { difficultyLevel, QuestionState } from './types.d';

const TOTALQUESTIONS = 10;

const App:FC = () =>  {

  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [loading, setLoading] = useState(false)
  const [quizEnd, setQuizEnd] = useState(true)
  const [questionNumber, setquestionNumber] = useState(0)
  const [score, setScore] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])

  const startQuiz = async()  => {

    setLoading(true)
    const quizQuestions = await fetchQuiz(10, difficultyLevel.EASY);
    console.log(await quizQuestions)

    setQuestions(quizQuestions)
    setLoading(false)
    setQuizEnd(false)
    setquestionNumber(0)
    setScore(0)



   }

  const verifyAnswer = (e:React.MouseEvent<HTMLButtonElement>) => {

    console.log(e);

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




        { !loading && !quizEnd && questions.length > 0 &&
          <div>
          <p>Question { questionNumber + 1 } / { TOTALQUESTIONS }</p>
          <QuestionCard
            question = {questions[questionNumber].question}
            questionNumber = {questionNumber + 1}
            totalQuestions = {TOTALQUESTIONS}
            answers={questions[questionNumber].answers}
            userAnswer={userAnswers}
            callback=""
          />
          </div>
        }

        { quizEnd &&
              <div>
                <button onClick={() => startQuiz()}>Start Quiz</button>
              </div>
        }
        {
          (questionNumber + 1 === TOTALQUESTIONS) ?
            <p>Quiz Finished</p>
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
