import { LoginFormData } from '../../types/types'
import LoginForm from './LoginForm'
import { CommonRequest } from '../../services/api_gateway'

const LoginPage = () => {
    const submitHandler = (values: LoginFormData) => {
      CommonRequest.login(values.username, values.password)
    }
  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={submitHandler} />
    </div>
  )
}

export default LoginPage
