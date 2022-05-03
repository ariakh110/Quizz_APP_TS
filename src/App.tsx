
import React from 'react'
import { useQuery } from 'react-query'
import { atom, useAtom } from 'jotai';

import QuestionCard from './components/QuestionCard';
import * as api from './api/api';
import { GlobalStyle } from './App.styles';


const TOTAL_QUESTIONS = 10;
export interface AnswerObject {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}
const numberAtom = atom(0);
const scoreAtom = atom(0);
const gameOverAtom = atom(true);
const userAnswersAtom = atom<AnswerObject[]>([]);
const questions = atom<api.QuestionState[]>([]);

const App = () => {
  const [number, setNumber] = useAtom(numberAtom);
  const [score, setScore] = useAtom(scoreAtom);
  const [gameOver, setGameOver] = useAtom(gameOverAtom);
  const [userAnswers, setUserAnswers] = useAtom(userAnswersAtom);
  const [newQuestions, setNewQuestions] = useAtom(questions);
  const { data, isLoading, isError } = useQuery(['getQuestions'], () => (
    api.getQuizes(TOTAL_QUESTIONS, api.Difficulty.EASY))
  );
  
  const useStartTrivia = () => {
    if (data !== undefined) {
      setGameOver(false);
      setNewQuestions(data);
      setScore(0);
      setNumber(0);
      setUserAnswers([]);
    }
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("checkAnswer")
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = answer === newQuestions[number].correct_answer;
      if (correct) setScore(prev => prev + 1);
      const answerObject = {
        question: newQuestions[number].question,
        answer,
        correct,
        correctAnswer: newQuestions[number].correct_answer
      }
      setUserAnswers(prev => [...prev, answerObject]);
    }

  }
  const nextQuestion = () => {
    console.log("nextQuestion")
    //move on to the next question if not the last question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);

    } else {
      setNumber(nextQuestion);
    }

  }
  return (
    <>
      <GlobalStyle />
      <div>
        <h1>
          Welcome to React Quiz App
        </h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className='start' onClick={useStartTrivia}>Start</button>
        ) : null}
        {!gameOver ? <p className='score'>Score: {score}</p> : null}
        <div>
          {isLoading ? <p>Loading...</p> : null}
          {isError ? <p>Error</p> : null}
          {!gameOver && !isLoading && !isError && (typeof data !== 'undefined') && (
            /*use checkAnswer method to check if the answer is correct */
            <QuestionCard
              questionNr={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={data[number].question}
              answers={data[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
          )}
          {!gameOver && !isLoading && !isError && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1
            ?
            (
              <button className='next' onClick={nextQuestion}>Next Question</button>
            ) : null}
        </div>

      </div>
    </>
  )
}
export default App;