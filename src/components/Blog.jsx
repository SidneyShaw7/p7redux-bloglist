import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.login)

  const id = useParams().id
  const blog = blogs.find((u) => u.id === id)

  if (!blog) {
    return <div>Blog not found</div>
  }

  return user ? (
    <div>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>
        likes: {blog.likes}
        <button onClick={() => dispatch(likeBlog(blog))}>like</button>
      </div>
      <div>added by {blog.author}</div>
      {user.id === blog.user.id && (
        <button onClick={() => dispatch(deleteBlog(blog.id))}>delete</button>
      )}
    </div>
  ) : (
    <div>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>likes: {blog.likes}</div>
      <div>added by {blog.author}</div>
    </div>
  )
}

export default Blog
