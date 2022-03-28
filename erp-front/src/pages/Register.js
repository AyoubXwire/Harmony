import { useState } from 'react'
import { useCookies } from 'react-cookie'
import * as userApi from '../api/users'

function Register() {

    const [cookies, setCookie] = useCookies(['token'])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [avatar, setAvatar] = useState('')

    // post credentials to server and store token in a cookie
    async function register(event) {
        event.preventDefault()

        await userApi.registerUser(email, password, password2, firstName, lastName, phone, avatar)
    }

    return (
        <div className=''>
            <h1 className='text-center mb-4'>Register</h1>

            <form onSubmit={register}>
                <input className='form-control my-2' value={email} onChange={event => setEmail(event.target.value)} type='email' name='email' placeholder='email' />
                <input className='form-control my-2' value={password} onChange={event => setPassword(event.target.value)} type='password' name='password' placeholder='password' />
                <input className='form-control my-2' value={password2} onChange={event => setPassword2(event.target.value)} type='password' name='password2' placeholder='confirm password' />
                <input className='form-control my-2' value={firstName} onChange={event => setFirstName(event.target.value)} type='text' name='firstName' placeholder='first name' />
                <input className='form-control my-2' value={lastName} onChange={event => setLastName(event.target.value)} type='text' name='lastName' placeholder='last name' />
                <input className='form-control my-2' value={phone} onChange={event => setPhone(event.target.value)} type='text' name='phone' placeholder='phone number' />
                <input className='btn btn-info my-2' type='submit' value='Register' />
            </form>
        </div>
    )
}

export default Register