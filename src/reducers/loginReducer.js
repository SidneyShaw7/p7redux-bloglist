import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    loginUser(state, action) {
      return action.payload
    },
    setStoredUser(state, action) {
      return action.payload
    },
    logoutUser(state, action) {
      return (action.payload = null)
    },
  },
})

export const login = ({ username, password }) => {
  const credentials = { username, password }
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      dispatch(loginUser(user))
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user)) // LOCAL STORAGE USED ONLY FOR PRODUCTION AND LEARNING PURPOSES/ NEVER USE IN REAL DEVELOPMENT/ USE COOCKIE ON THE BACKEND INSTEAD!!!!
    } catch (error) {
      console.error(error)
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch(logoutUser())
      window.localStorage.removeItem('loggedBlogappUser')
    } catch (error) {
      console.error(error)
    }
  }
}

export const { loginUser, setStoredUser, logoutUser } = loginSlice.actions
export default loginSlice.reducer
