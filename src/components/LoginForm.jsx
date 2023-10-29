import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const loginUser = (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value

    e.target.username.value = ''
    e.target.password.value = ''

    dispatch(login({ username, password }))
  }

  const logoutUser = (e) => {
    e.preventDefault()
    dispatch(logout())
  }

  const user = useSelector((state) => state.login)

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
      {user.username} is logged in
      <div>
        <button type='submit' onClick={logoutUser}>
          logout
        </button>
      </div>
    </div>
  )
}

export default LoginForm
