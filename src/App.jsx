import { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import Blogs from './components/Blogs'
import NewBlog from './components/NewBlog'
import { setStoredUser } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)

  // USE EFFECTS

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      blogService.setToken(loggedUser.token)
      dispatch(setStoredUser(loggedUser))
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogFormRef = useRef()

  const blogForm = () => {
    return (
      user && (
        <div>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <NewBlog />
          </Togglable>
        </div>
      )
    )
  }

  return (
    <div>
      <h2>Simple blogs demo apP</h2>
      <Notification />
      <LoginForm />
      {blogForm()}
      <Blogs />
    </div>
  )
}

export default App
