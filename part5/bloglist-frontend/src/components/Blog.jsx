import Togglable from "./Togglable"

const Blog = ({ blog, addLike, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    < div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonLabel={"view"}>
        <p>{blog.url}</p>
        <p>{blog.likes}</p>
        <p>{blog.user && blog.user.name}</p>
      </Togglable>
      <button onClick={() => {addLike(blog)}}>Like</button>
      <button onClick={() => {deleteBlog(blog)}}>Delete</button>
    </div >
  )
}

export default Blog