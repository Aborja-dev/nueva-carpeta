import React from 'react'
import { CommonRequest } from '../../services/api_gateway'
import { useNavigate } from 'react-router-dom'
import { onErrorAlert, onSuccessAlert } from '../../utils/helpers'


interface FormValues {
    username: string
    password: string
    confirmPassword: string
    name: string
}
const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const handler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const entries = Object.fromEntries(formData.entries())
    const values: FormValues = {
      username: entries.username as string,
      password: entries.password as string,
      confirmPassword: entries.confirmPassword as string,
      name: entries.name as string
    }
    if (values.password !== values.confirmPassword) {
       return onErrorAlert('Passwords do not match')
    }
      const result = await CommonRequest.register(
        values.name,
        values.username,
        values.password
      )
      if (typeof result === 'string') {
        return onErrorAlert(result)
      }
      onSuccessAlert('Account created successfully')
      navigate('/login')
  }

  return (
    <div className="mx-auto w-3/6 pt-10">
      <h1>Crea una cuenta</h1>
      <form onSubmit={handler}>
        <fieldset>
          <label htmlFor="username">Name</label>
          <input name="name" type="text" />
        </fieldset>
        <fieldset>
          <label htmlFor="username">Email</label>
          <input name="username" type="text" />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password</label>
          <input name="password" type="text" />
        </fieldset>
        <fieldset>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input name="confirmPassword" type="text" />
        </fieldset>
        <div className='flex gap-'>
        <button type="submit">Crear usuario</button>
        </div>
      </form>
        <button onClick={() => navigate(-1)}>Cancelar</button>
    </div>
  )
}

export default RegisterPage
