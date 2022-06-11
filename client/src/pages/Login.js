import { useState, useContext } from 'react'
import { useCookies } from 'react-cookie'
import * as authApi from '#api/auth'
import { AlertContext, ALERT_TYPES } from '#context/alert'

function Login() {

    const [cookies, setCookie] = useCookies(['token'])
    const { pushAlert } = useContext(AlertContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // post credentials to server and store token in a cookie
    async function login(event) {
        event.preventDefault()

        try {
            const accessToken = await authApi.getUserToken(email, password)
            pushAlert(ALERT_TYPES.success, 'Welcome')
            setCookie('token', accessToken)
        } catch ({ response }) {
            pushAlert(ALERT_TYPES.error, response.data.message)
        }
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