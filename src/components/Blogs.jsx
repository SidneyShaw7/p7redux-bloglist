import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import Togglable from './Togglable'
import NewBlog from './NewBlog'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.login)

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
      {blogForm()}
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => {
              return (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </TableCell>
                  <TableCell>{blog.user.name}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Blogs
