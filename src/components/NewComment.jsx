import { createComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const NewComment = ({ blog }) => {
  const dispatch = useDispatch()

  const addComment = (e) => {
    e.preventDefault()
    const text = e.target.text.value

    e.target.text.value = ''

    dispatch(createComment({ blog, text }))
    dispatch(setNotification('blog was created', 3))
  }

  return (
    <div>
      <form onSubmit={addComment}>
        <div>
          <input name='text' />
        </div>
        <button type='submit'>add comment</button>
      </form>
    </div>
  )
}

export default NewComment
