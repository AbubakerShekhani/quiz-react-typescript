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
      <ul>
        { answers.map(answer => (
          <p key={answer} dangerouslySetInnerHTML={{ __html: answer}} />
        ))
        }
      </ul>

    </div>
  )
}

export default QuestionCard;