import React from 'react';
import { Card } from 'antd';

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

      <Card title={`Question: ${questionNumber}/${totalQuestions}`} bordered={true} style={{ margin: '0 auto'  }}>
        <p dangerouslySetInnerHTML={{ __html: question}} />
        { answers.map(answer => (
          <p key={answer}>
            <label >
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
          </p>
          ))
        }
     </Card>


  )
}

export default QuestionCard;