const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogs')

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
}, 30000)

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length);
})

test('unique identifier property', async () => {
    const response = await api.get('/api/blogs')
    for (let blog of response.body) {
        expect(blog.id).toBeDefined();
    }
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'testAdd',
        author: 'testAuthor',
        url: 'testUrl',
        likes: 0
    }

    await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('testAdd')
})

test('undefined like is 0', async () => {
    const newBlog = {
        title: 'testAdd',
        author: 'testAuthor',
        url: 'testUrl'
    }

    const response = await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0);

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('blogs without title', async () => {
    const newBlog = {
        author: 'testAuthor',
        url: 'testUrl',
        likes: 0
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blogs without url', async () => {
    const newBlog = {
        title: 'testAdd',
        author: 'testAuthor',
        likes: 0
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
})

test('a note can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const newBlog = {
        title: blogToUpdate.title,
        author: blogToUpdate.author,
        url: blogToUpdate.url,
        likes: blogToUpdate.likes + 10
    }

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[0].likes).toBe(blogToUpdate.likes + 10)
})

afterAll(async () => {
    await mongoose.connection.close()
})