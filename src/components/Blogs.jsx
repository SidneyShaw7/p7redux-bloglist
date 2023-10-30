import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import { useRef } from 'react'
import NewBlog from './NewBlog'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.login)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const blogFormRef = useRef()

  const blogForm = () => {
    return (
      user && (
        <div>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <NewBlog />
          </Togglable>
        </div>
      )
    )
  }

  return (
    <div>
      {blogForm()}
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
