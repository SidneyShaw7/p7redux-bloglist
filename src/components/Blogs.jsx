import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {
  // const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => {
        return (
          <div style={blogStyle} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        )
      })}
    </div>
  )
}

export default Blogs
