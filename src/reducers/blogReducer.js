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
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((b) => b.id !== id)
    },
    // newComment(state, action) {

    // }
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
    try {
      const newBlog = await blogService.create({ title, author, url })
      dispatch(appendBlog(newBlog))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id)
      dispatch(removeBlog(id))
    } catch (error) {
      console.error(error)
    }
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      await blogService.update(blog.id, likedBlog)
      dispatch(updateBlog(likedBlog))
    } catch (error) {
      console.error(error)
    }
  }
}

export const createComment = (blog, newComment) => {
  return async (dispatch) => {
    console.log(blog)
    console.log(newComment)

    // const commentedBlog = {
    //   ...blog,
    //   comments: blog.comments.concat(newComment),
    // }
    try {
      await blogService.createComment(blog.blog.id, blog.text)
      // dispatch(updateBlog(commentedBlog))
    } catch (error) {
      console.error(error)
    }
  }
}

export const { appendBlog, setBlogs, removeBlog, updateBlog } =
  blogSlice.actions
export default blogSlice.reducer
