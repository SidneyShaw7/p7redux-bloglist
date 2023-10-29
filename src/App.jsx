import { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import Blogs from './components/Blogs'
import NewBlog from './components/NewBlog'
import { setStoredUser } from './reducers/loginReducer'
import Users from './components/Users'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useMatch,
} from 'react-router-dom'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()
  // const user = useSelector((state) => state.login)
  const users = useSelector((state) => state.users)

  const match = useMatch('/notes/:id')
  const user = match
    ? users.find((user) => user.id === Number(match.params.id))
    : null

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
    dispatch(initializeUsers())
  }, [dispatch])

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
      <h2>Simple blogs demo apP</h2>
      <Notification />
      <LoginForm />
      {blogForm()}
      <Users />
      {/* <Blogs /> */}
      <Routes>
        <Route path='/users/:id' element={<User />} />
        <Route path='/users/' element={<User />} />
      </Routes>
    </div>
  )
}

export default App
