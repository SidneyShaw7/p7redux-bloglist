import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog } from '../reducers/blogReducer'
// import Blog from './Blog'

const Blog = ({ blog, handleClick }) => {
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
      <button onClick={handleClick}>delete</button>
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
              handleClick={() => dispatch(deleteBlog(blog.id))}
            />
          </div>
        )
      })}
    </div>
  )
}

export default Blogs
