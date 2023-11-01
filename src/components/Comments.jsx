import NewComment from './NewComment'
import { useBlog } from '../customHooks/useBlog'

const Comments = () => {
  const blog = useBlog()

  console.log(blog)
  return (
    <div>
      <h3>comments</h3>
      <NewComment />
      <ul>
        {blog.comments.map((c) => {
          return <li key={c.id}>{c.text}</li>
        })}
      </ul>
    </div>
  )
}

export default Comments
