import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }



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

  const addBlog = async (event) => {
    event.preventDefault()

    
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    }

    const response = await blogService.create(newBlog)
    setBlogs(blogs.concat(response))
    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return (
    <div>
      <h2>blogs</h2>

      {user === null
        ? <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />
        :
        <>
          <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
          <BlogForm addBlog={addBlog} title={newTitle} handleTitleChange={handleTitleChange} author={newAuthor} handleAuthorChange={handleAuthorChange} url={newUrl} handleUrlChange={handleUrlChange} />
        </>
      }
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )
      }

    </div>
  )
}

export default App