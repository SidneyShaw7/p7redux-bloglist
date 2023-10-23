import { useState, useEffect, useRef } from 'react'
// import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
// import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
// import Blogs from './services/blogs'
import Blogs from './components/Blogs'
import NewBlog from './components/NewBlog'

const App = () => {
  const dispatch = useDispatch()

  // const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [style, setStyle] = useState(true)
  // USE EFFECTS

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
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
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    } catch (error) {
      // handleError(error, setStyle, setNotification)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  // const addBlog = async (blogObj) => {
  //   try {
  //     await blogService.create(blogObj)
  //     blogFormRef.current.toggleVisibility()
  //     const newBlogs = await blogService.getAll()
  //     setBlogs(newBlogs)
  //     dispatch(setNotification('blog was created', 3))
  //   } catch (error) {
  //     handleError(error, setStyle, setNotification)
  //   }
  // }

  // const likeIt = async (id) => {
  //   const blog = blogs.find((b) => b.id === id)
  //   const likedBlog = { ...blog, likes: blog.likes + 1 }
  //   try {
  //     const returnedBlog = await blogService.update(id, likedBlog)
  //     setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
  //     dispatch(setNotification('you liked the blog', 3))
  //     console.log(blog), console.log(returnedBlog)
  //   } catch (error) {
  //     handleError(error, setStyle, setNotification)
  //   }
  // }

  // const remove = async (id) => {
  //   const blog = blogs.find((b) => b.id === id)
  //   if (window.confirm(`Remove the blog "${blog.title}"`)) {
  //     try {
  //       await blogService.remove(id)
  //       setBlogs(blogs.filter((blog) => blog.id !== id))
  //       dispatch(setNotification('blog was deleted', 3))
  //     } catch (error) {
  //       handleError(error, setStyle, setNotification)
  //     }
  //   }
  // }

  const loginForm = () => (
    <LoginForm handleLogin={handleLogin} user={user} setUser={setUser} />
  )

  const blogForm = () => {
    return (
      <div>
        <p>
          {user.username} logged in
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
      {!user && loginForm()}
      <h2>blogs</h2>
      {user && blogForm()}
      <Blogs />
      {/* {blogs.map((blog) => (
        <Blog
          user={user}
          key={blog.id}
          blog={blog}
          likeIt={() => likeIt(blog.id)}
          remove={() => remove(blog.id)}
        />
      ))} */}
    </div>
  )
}

export default App
