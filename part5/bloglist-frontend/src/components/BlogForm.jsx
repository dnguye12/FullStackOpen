import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()


    const newBlog = {
      title: title,
      author: author,
      url: url,
      likes: 0,
    }

    addBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={handleTitleChange}
          placeholder='write title here'
          id='title'
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={handleAuthorChange}
          placeholder='write author here'
          id='author'
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="url"
          onChange={handleUrlChange}
          placeholder='write url here'
          id='url'
        />
      </div>
      <button type="submit" id='create-button'>create</button>
    </form>
  )
}

export default BlogForm