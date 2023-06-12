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

afterAll(async () => {
    await mongoose.connection.close()
})