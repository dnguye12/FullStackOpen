import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlide = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    updateAnecdote(state, action) {
      const id = action.payload.id
      return state.map(a => a.id !== id ? a : action.payload)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const {updateAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlide.actions

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const res = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(res))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const res = await anecdoteService.vote(anecdote)
    dispatch(updateAnecdote(res))
  }
}

export default anecdoteSlide.reducer