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
    likeBlog(state, action) {
      const id = action.payload
      const blogToLike = state.find((b) => b.id === id)
      const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1 }
      return async () => {
        await blogService.update(id, likedBlog)
        state.map((blog) => (blog.id !== id ? blog : likedBlog))
      }
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((b) => b.id !== id)
    },
  },
})

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

// export const likeBlog = (id) => {
//   return async (dispatch) => {
//     const
//     await blogService.update
//   }
// }

export const { appendBlog, setBlogs, removeBlog, likeBlog } = blogSlice.actions
export default blogSlice.reducer
