import React from 'react';

type Props = {
  question: string;
  answers: string[];
  userAnswer: any;
  callback:any;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<Props> =({ question, answers, userAnswer, callback, questionNumber, totalQuestions}) => {
  return (
    <div>
      Question Card
      <p dangerouslySetInnerHTML={{ __html: question}} />
      <div className="form-check" >

        { answers.map(answer => (
            /*
            <button key={answer} value={answer} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: answer}} ></span>
            </button>
            */

           <label key={answer}>
                <input
                key={answer}
                  type="radio"
                  name="userSelectedAnswer"
                  value={answer}
                  className="form-check-input"
                  onChange={callback}
                  disabled={userAnswer?true:false}
                />
                <span dangerouslySetInnerHTML={{ __html: answer}} ></span>
              </label>





        ))
        }
      </div>

    </div>
  )
}

export default QuestionCard;