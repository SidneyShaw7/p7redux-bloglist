import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import Blogs from './components/Blogs'
import NewBlog from './components/NewBlog'

const App = () => {
  const dispatch = useDispatch()
  const [style, setStyle] = useState(true)
  // USE EFFECTS

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      // setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogFormRef = useRef()

  // const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes)

  // const handleError = (error, setStyle, setNotification) => {
  //   console.error(error)
  //   setStyle(false)

  //   const message =
  //     error.response.request.status === 401
  //       ? 'Wrong credentials'
  //       : error.message

  //   setNotification(message)

  //   setTimeout(() => {
  //     setNotification(null)
  //   }, 3500)
  // }

  const handleLogin = async (user) => {
    try {
      const loggedUser = await loginService.login(user)
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedUser)
      )
      // setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    } catch (error) {
      // handleError(error, setStyle, setNotification)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  const loginForm = () => <LoginForm handleLogin={handleLogin} />

  const blogForm = () => {
    return (
      <div>
        <p>
          {/* {user.username} logged in */}
          <button onClick={handleLogout}>logout</button>
        </p>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <NewBlog />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <LoginForm />
      <NewBlog />
      {/* {!user && loginForm()} */}
      <h2>blogs</h2>
      {/* {user && blogForm()} */}
      <Blogs />
    </div>
  )
}

export default App
