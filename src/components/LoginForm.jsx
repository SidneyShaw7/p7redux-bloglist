import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/loginReducer'

const LoginForm = ({ handleLogin }) => {
  const dispatch = useDispatch()

  const loginUser = (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value

    e.target.username.value = ''
    e.target.password.value = ''

    dispatch(login({ username, password }))
  }

  const user = useSelector((state) => state.login)
  console.log(user)

  return !user ? (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={loginUser}>
        <div>
          username
          <input id='username' type='text' name='username' />
        </div>
        <div>
          password
          <input id='password' type='password' name='password' />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  ) : (
    <div>
      {user.username} is logged in{console.log(user)}
    </div>
  )
}

export default LoginForm
