import { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { setStoredUser } from './reducers/loginReducer'
import NewBlog from './components/NewBlog'
import Users from './components/Users'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useMatch,
} from 'react-router-dom'
import User from './components/User'
import Blogs from './components/Blogs'
import Blog from './components/Blog'

const App = () => {
  const dispatch = useDispatch()
  // const users = useSelector((state) => state.users)
  // const blogs = useSelector((state) => state.blogs)

  // const match = useMatch('/notes/:id')
  // const user = match
  //   ? users.find((user) => user.id === Number(match.params.id))
  //   : null

  // const match1 = useMatch('/blogs/:id')
  // const blog = match1
  //   ? blogs.find((blog) => blog.id === Number(match1.params.id))
  //   : null

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

  // const blogForm = () => {
  //   return (
  //     user && (
  //       <div>
  //         <Togglable buttonLabel='create new blog' ref={blogFormRef}>
  //           <NewBlog />
  //         </Togglable>
  //       </div>
  //     )
  //   )
  // }

  return (
    <div>
      <h2>Simple blogs demo apP</h2>
      <Notification />
      <LoginForm />
      {/* {blogForm()} */}
      {/* <Blogs /> */}
      <NewBlog />
      <Routes>
        <Route path='/users/' element={<Users />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/blogs/' element={<Blogs />} />
        <Route path='/blogs/:id' element={<Blog />} />
      </Routes>
    </div>
  )
}

export default App
