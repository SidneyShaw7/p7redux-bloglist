import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../reducers/loginReducer'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginUser = (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value

    e.target.username.value = ''
    e.target.password.value = ''

    dispatch(login({ username, password }))
    navigate('/')
  }

  const logoutUser = (e) => {
    e.preventDefault()
    dispatch(logout())
  }

  const user = useSelector((state) => state.login)

  return !user ? (
    <div>
      <h2>login</h2>
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
    <button type='submit' onClick={logoutUser}>
      logout
    </button>
  )
}

export default LoginForm
