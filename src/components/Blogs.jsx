import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import Blog from './Blog'

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
