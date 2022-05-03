import { type } from '@testing-library/user-event/dist/type';
import axios from 'axios';
import _ from 'lodash'
export interface Question {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string
    type: string
}
export type QuestionState = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string
    type: string
} & {
    answers: string[]
}
export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}
//https://opentdb.com/api.php?amount=10&category=11&type=multiple
const server = axios.create({
    baseURL: 'https://opentdb.com/api.php',
})
//get all Quizes asynchronously     
const getQuizes = async (amount: number, difficulty: Difficulty) => {
    const { data } = await server.get('/', {
        params: {
            amount,
            category: 11,
            type: 'multiple',
            difficulty
        }
    })

    return _.map(data.results, (question: Question) => (
        {
            ...question,
            answers: _.shuffle([...question.incorrect_answers, question.correct_answer])
        }
    ))
}

//get one Quize asynchronously
const getQuize = async (id: number) => {
    const { data } = await server.get(`/${id}`)
    return data
}

//create a new Quize asynchronously
const createQuize = async (quize: {}) => {
    const { data } = await server.post('/', quize)
    return data
}
//update a Quize asynchronously
const updateQuize = async (id: number, quize: {}) => {
    const { data } = await server.put(`/${id}`, quize)
    return data
}
//delete a Quize asynchronously  
const deleteQuize = async (id: number) => {
    const { data } = await server.delete(`/${id}`)
    return data
}

export { getQuizes, getQuize, createQuize, updateQuize, deleteQuize }