import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog, updateBlog } from '../reducers/blogReducer'

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
      <button onClick={handleDelete}>delete</button>
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

const Blogs = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => {
        return (
          <div key={blog.id}>
            <Blog
              key={blog.id}
              blog={blog}
              handleDelete={() => dispatch(deleteBlog(blog.id))}
              handleLike={() => dispatch(likeBlog(blog))}
            />
          </div>
        )
      })}
    </div>
  )
}

export default Blogs
