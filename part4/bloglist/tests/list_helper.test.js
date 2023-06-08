const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('totalLikes function', () => {
  test('one blog', () => {
    const blogs = [{
      title: "First blog post",
      author: "Author name",
      url: "http://blogposturl.com",
      likes: 100
    }]

    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(100)
  })

  test('multiple tests', () => {
    const blogs = [
      {
        title: "First blog post",
        author: "Author name",
        url: "http://blogposturl1.com",
        likes: 100
      },
      {
        title: "Second blog post",
        author: "Author name",
        url: "http://blogposturl2.com",
        likes: 150
      },
      {
        title: "Third blog post",
        author: "Another author",
        url: "http://blogposturl3.com",
        likes: 200
      }
    ]

    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(450)
  })
})

test('favoriteBlog function', () => {
  const blogs = [
    {
      title: "First blog post",
      author: "Author name",
      url: "http://blogposturl1.com",
      likes: 100
    },
    {
      title: "Second blog post",
      author: "Author name",
      url: "http://blogposturl2.com",
      likes: 150
    },
    {
      title: "Third blog post",
      author: "Another author",
      url: "http://blogposturl3.com",
      likes: 200
    }
  ]

  const result = listHelper.favoriteBlog(blogs)
  expect(result).toEqual({
    title: "Third blog post",
      author: "Another author",
      likes: 200
  })
})