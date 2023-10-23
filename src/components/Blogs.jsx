import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, handleDelete, handleLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div style={blogStyle}>
      <div>{blog.title}</div>

      <div>{blog.author}</div>
      <div>{blog.url}</div>
      <div>
        {blog.likes}
        <button onClick={handleLike}>like</button>
      </div>
      <button onClick={handleDelete}>delete</button>
    </div>
  )
}

const Blogs = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  return (
    <div>
      {blogs.map((blog) => {
        return (
          <div key={blog.id}>
            <Blog
              key={blog.id}
              blog={blog}
              handleDelete={() => dispatch(deleteBlog(blog.id))}
              handleLike={() => dispatch(likeBlog(blog.id))}
            />
          </div>
        )
      })}
    </div>
  )
}

export default Blogs
