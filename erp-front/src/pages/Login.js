import axios from 'axios'
import { useState } from 'react'
import { useCookies } from 'react-cookie'

function Login() {

    const [cookies, setCookie] = useCookies(['token'])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function login(event) {
        event.preventDefault()

        const response = await axios.post('http://localhost:4000/api/auth/login', {
            email: email,
            password: password
        })

        const accessToken = response.data.accessToken
        setCookie('token', accessToken, {
            httpOnly: true
        })
    }

    return (
        <div className=''>
            <h1 className='text-center mb-4'>Login</h1>

            <form onSubmit={login}>
                <input className='form-control my-2' value={email} onChange={event => setEmail(event.target.value)} type='text' name='email' placeholder='email' />
                <input className='form-control my-2' value={password} onChange={event => setPassword(event.target.value)} type='password' name='password' placeholder='password' />
                <input className='btn btn-info my-2' type='submit' value='Login' />
            </form>
        </div>
    )
}

export default Login