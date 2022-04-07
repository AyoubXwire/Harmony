import { useState } from 'react'
import { useCookies } from 'react-cookie'
import * as userApi from '../api/users'

function Login() {

    const [cookies, setCookie] = useCookies(['token'])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // post credentials to server and store token in a cookie
    async function login(event) {
        event.preventDefault()

        const accessToken = await userApi.getUserToken(email, password)
        setCookie('token', accessToken)
    }

    return (
        <div className='login text-center px-4 py-5 bordered'>
            <h1 className='mb-4'>Login</h1>

            <form onSubmit={login}>
                <input className='form-control my-2' value={email} onChange={event => setEmail(event.target.value)} type='text' name='email' placeholder='email' />
                <input className='form-control my-2' value={password} onChange={event => setPassword(event.target.value)} type='password' name='password' placeholder='password' />
                <input className='button primary mt-4' type='submit' value='Login' />
            </form>
        </div>
    )
}

export default Login