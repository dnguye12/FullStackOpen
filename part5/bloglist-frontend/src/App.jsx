import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [refreshBlog, setRefreshBlog] = useState(false)

const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    }
    )
  }, [refreshBlog])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }

  const addBlog = async (newBlog) => {
    const response = await blogService.create(newBlog)
    setBlogs(blogs.concat(response))
    blogFormRef.current.toggleVisibility()

  }

  const addLike = async (blog) => {
    const response = await blogService.like(blog)
    setBlogs(blogs.map(b => {
      if (b.title === response.title && b.author === response.author && b.url === response.url) {
        return response
      } else {
        return b
      }
    }))
    setRefreshBlog(!refreshBlog)
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const response = await blogService.deleteBlog(blog)
      setBlogs(blogs.filter((b) => b.id !== blog.id))
      setRefreshBlog(!refreshBlog)
    }
  }


  return (
    <div>
      <h2>blogs</h2>

      {user === null
        ?
        <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />
        :
        <>
          <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
          <Togglable buttonLabel={"new blog"} ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>

        </>
      }
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog} />
        )
      }

    </div>
  )
}

export default App