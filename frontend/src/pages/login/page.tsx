import { LoginFormData } from '../../types/types'
import LoginForm from './LoginForm'
import { CommonRequest } from '../../services/api_gateway'
import { saveSesion, saveToken } from '../../services/service'

const LoginPage = () => {
    const submitHandler = async (values: LoginFormData) => {
      const {token, ...sesion} = await CommonRequest.login(values.username, values.password)
      if (sesion) {
        saveSesion(sesion)
        saveToken(token)
      }
    }
  return (
    <div className="mx-auto w-3/6 pt-10">
      <h1>Login</h1>
      <LoginForm onSubmit={submitHandler} />
    </div>
  )
}

export default LoginPage
