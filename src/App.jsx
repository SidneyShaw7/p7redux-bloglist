import { useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { setStoredUser } from './reducers/loginReducer'
import Users from './components/Users'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import User from './components/User'
import Blogs from './components/Blogs'
import Blog from './components/Blog'

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
    dispatch(initializeUsers())
  }, [dispatch])

  const padding = {
    padding: 5,
  }

  const style = {
    backgroundColor: 'silver',
    padding: 5,
  }

  return (
    <div>
      <div style={style}>
        <Link style={padding} to={'/blogs'}>
          blogs
        </Link>
        <Link style={padding} to={'/users'}>
          users
        </Link>
        {user ? (
          <em>
            {user.username} logged in
            <LoginForm />
          </em>
        ) : (
          <Link style={padding} to='/login'>
            login
          </Link>
        )}
      </div>
      <h2>blog demo app</h2>
      <Notification />
      <Routes>
        <Route path='/users/' element={<Users />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/blogs/' element={<Blogs />} />
        <Route path='/' element={<Blogs />} />
        <Route path='/blogs/:id' element={<Blog />} />
        <Route
          path='/users'
          element={user ? <Users /> : <Navigate replace to='/login' />}
        />
        <Route path='/login' element={<LoginForm />} />
      </Routes>
    </div>
  )
}

export default App
