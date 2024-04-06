import { useState } from 'react'

const BlogForm = ({ addBlog, title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange }) => {
  
  return (
    <form onSubmit={addBlog}>
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