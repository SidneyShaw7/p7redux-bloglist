import { createComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { useBlog } from '../customHooks/useBlog'
import { TextField, Button } from '@mui/material'

const NewComment = () => {
  const dispatch = useDispatch()

  const blog = useBlog()

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
          {/* <input name='text' /> */}
          <TextField label='comment' name='text' />
        </div>
        {/* <button type='submit'>add comment</button> */}
        <Button variant='contained' color='primary' type='submit'>
          add comment
        </Button>
      </form>
    </div>
  )
}

export default NewComment
