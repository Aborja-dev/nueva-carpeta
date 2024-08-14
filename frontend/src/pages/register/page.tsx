import React from 'react'

interface Props {
    onSubmit: (data: Omit<FormValues, 'confirmPassword'>) => void
}
interface FormValues {
    username: string
    password: string
    confirmPassword: string
    name: string
}
const RegisterPage: React.FC<Props> = ({onSubmit}) => {
  const handler = (event: React.FormEvent<HTMLFormElement>) => {
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
       return alert('Passwords must match')
    }
    onSubmit({
      username: values.username,
      password: values.password,
      name: values.name
    })
  }
  return (
    <div>
      <h1>Crea una cuenta</h1>
      <form onSubmit={handler}>
        <fieldset>
          <label htmlFor="username">Name</label>
          <input name="Name" type="text" />
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
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default RegisterPage
