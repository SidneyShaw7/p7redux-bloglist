import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { useBlog } from '../customHooks/useBlog'
import Comments from './Comments'

const Blog = () => {
  const user = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const blog = useBlog()

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
      <Comments blog={blog} />
    </div>
  ) : (
    <div>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>likes: {blog.likes}</div>
      <div>added by {blog.author}</div>
      <Comments id={blog.id} />
    </div>
  )
}

export default Blog
