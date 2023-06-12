const Blog = require('../models/blogs')

const initialBlogs = [
    {
        title: 'AI and Machine Learning',
        author: 'ChatGPT',
        url: 'https://www.openai.com/blog/chatgpt',
        likes: 200
    },
    {
        title: 'Advancements in Natural Language Processing',
        author: 'ChatGPT',
        url: 'https://www.openai.com/blog/nlp',
        likes: 350
    },
    {
        title: 'Exploring GPT-4',
        author: 'ChatGPT',
        url: 'https://www.openai.com/blog/gpt-4',
        likes: 450
    },
    {
        title: 'Understanding Reinforcement Learning',
        author: 'ChatGPT',
        url: 'https://www.openai.com/blog/rl',
        likes: 400
    },
    {
        title: 'The Future of AI',
        author: 'ChatGPT',
        url: 'https://www.openai.com/blog/future-ai',
        likes: 500
    },
]

const nonExistingId = async () => {
    const blog = new Blog({
            title: 'willremovethissoon',
            author: 'willremovethissoon',
            url: 'willremovethissoon',
            likes: 0
        })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}