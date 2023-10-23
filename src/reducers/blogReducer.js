import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    likeBlog(state, action) {},
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((b) => b.id !== id)
    },
  },
})

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

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = ({ title, author, url }) => {
  return async (dispatch) => {
    const newBlog = await blogService.create({ title, author, url })
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export const { appendBlog, setBlogs, removeBlog } = blogSlice.actions
export default blogSlice.reducer
