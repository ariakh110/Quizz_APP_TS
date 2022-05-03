import React from 'react'
import _ from 'lodash'
import { AnswerObject } from '../App';
interface Props {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
}
const QuestionCard: React.FC<Props> = ({
    question, answers, callback,
    userAnswer, questionNr, totalQuestions
}) => {

    return (
        <div>
            <p className="number">
                Question: {questionNr} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question }} />
            <div>
                {_.map(answers, (answer: string, i: number) => {
                    return (
                        <div key={i}>
                            {/* userAnswer ? true : false = !!userAnswer */}
                            <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                                <span dangerouslySetInnerHTML={{ __html: answer }} />
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default QuestionCard