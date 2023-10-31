import { useSelector } from 'react-redux'
import NewComment from './NewComment'

const Comments = ({ blog }) => {
  console.log(blog)
  return (
    <div>
      <h3>comments</h3>
      <NewComment blog={blog} />
      <ul>
        {blog.comments.map((c) => {
          return <li key={blog.id}>{c.text}</li>
        })}
      </ul>
    </div>
  )
}

export default Comments
