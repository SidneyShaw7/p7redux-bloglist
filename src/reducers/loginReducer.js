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
  },
})

export const login = ({ username, password }) => {
  const credentials = { username, password }
  console.log(credentials)
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      dispatch(loginUser(user))
      blogService.setToken(user.token)
    } catch (error) {
      console.error(error)
    }
  }
}

export const { loginUser } = loginSlice.actions
export default loginSlice.reducer
