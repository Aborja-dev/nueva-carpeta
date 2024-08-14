import React from 'react'
import { LoginFormData } from '../../types/types'
interface Props {
    onSubmit: (values: LoginFormData) => void
}
const LoginForm: React.FC<Props> = ({onSubmit}) => {
    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const entries = Object.fromEntries(formData.entries())
        const values: LoginFormData = {
            username: entries.username as string,
            password: entries.password as string
        }
        onSubmit(values)
    }
    return (
        <form onSubmit={submitHandler}>
            <fieldset>
                <label htmlFor="username">Email</label>
                <input name='username' type="text" />
            </fieldset>
            <fieldset>
                <label htmlFor="password">Password</label>
                <input name='password' type="password" />
            </fieldset>
            <div className='flex justify-between gap-5'>
            <button type="submit">Login</button>
            <button type="submit">Register</button>
            </div>
        </form>
    )
}

export default LoginForm
