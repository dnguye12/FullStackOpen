const blogsRouter = require('express').Router()
const { response } = require('../app')
const jwt = require('jsonwebtoken')

const Blog = require('../models/blogs')
const User = require('../models/user')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    if (body.title === undefined || body.url === undefined) {
        response.status(400).end();
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 10 : body.likes,
        user: user._id
    })
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const blog = await Blog.findByIdAndRemove(request.params.id)

    if (!blog) {
        response.status(404).end()
    }

    if (blog.user.toString() !== decodedToken.id.toString()) {
        response.status(401).end()
    }

    const user = await User.findById(decodedToken.id)
    user.blogs = user.blogs.filter(blogId => blogId.toString() !== request.params.id)
    await user.save()

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json(updatedBlog)
})
module.exports = blogsRouter;