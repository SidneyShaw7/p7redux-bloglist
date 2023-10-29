import { useSelector } from 'react-redux'

const Blog = ({ blog, handleDelete, handleLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const user = useSelector((state) => state.login)
  return user ? (
    <div style={blogStyle}>
      <div>{blog.title}</div>
      <div>{blog.author}</div>
      <div>{blog.url}</div>
      <div>
        likes: {blog.likes}
        <button onClick={handleLike}>like</button>
      </div>
      {user.id === blog.user.id && (
        <button onClick={handleDelete}>delete</button>
      )}
    </div>
  ) : (
    <div style={blogStyle}>
      <div>{blog.title}</div>
      <div>{blog.author}</div>
      <div>{blog.url}</div>
      <div>likes: {blog.likes}</div>
    </div>
  )
}

export default Blog
