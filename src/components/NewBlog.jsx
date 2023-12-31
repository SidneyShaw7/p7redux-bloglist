import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { TextField, Button } from '@mui/material'

const NewBlog = () => {
  const dispatch = useDispatch()

  const addBlog = async (e) => {
    e.preventDefault()
    const title = e.target.title.value
    const author = e.target.author.value
    const url = e.target.url.value

    e.target.title.value = ''
    e.target.author.value = ''
    e.target.url.value = ''

    dispatch(createBlog({ title, author, url }))
    dispatch(setNotification('blog was created', 3))
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        {/* title:
        <input name='title' /> */}
        <TextField label='title' name='title' />
      </div>
      <div>
        {/* author:
        <input name='author' /> */}
        <TextField label='author' name='author' />
      </div>
      <div>
        {/* url:
        <input name='url' /> */}
        <TextField label='url' name='url' />
      </div>
      {/* <button type='submit'>create</button> */}
      <Button variant='contained' color='primary' type='submit'>
        create
      </Button>
    </form>
  )
}

export default NewBlog
