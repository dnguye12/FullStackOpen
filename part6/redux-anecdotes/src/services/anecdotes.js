import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async(content) => {
    const objet = {content, id: getId(), votes: 0}
    const res = await axios.post(baseUrl, objet)
    return res.data
}

const vote = async (anecdote) => {
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const res = await axios.put(`${baseUrl}/${anecdote.id}`, newAnecdote)
    return res.data
}

export default {getAll, createNew, vote}