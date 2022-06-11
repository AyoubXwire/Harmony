import { useState, useContext } from 'react'
import { useCookies } from 'react-cookie'
import * as authApi from '#api/auth'
import { useNavigate } from 'react-router-dom'
import { AlertContext, ALERT_TYPES } from '#context/alert'

function UpdatePassword() {

    const navigate = useNavigate()
    const { pushAlert } = useContext(AlertContext)
    const [cookies] = useCookies(['token'])

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    async function updatePassword(event) {
        event.preventDefault()

        try {
            const response = await authApi.updateUserPassword(cookies['token'], { oldPassword, password, password2 })
            pushAlert(ALERT_TYPES.success, response.data.message)
            navigate('/')
        } catch ({ response }) {
            pushAlert(ALERT_TYPES.error, response.data.message)
        }
    }

    return (
        <div className='login text-center px-4 py-5 bordered'>
            <h1 className='mb-4'>Update password</h1>

            <form onSubmit={updatePassword}>
                <input className='form-control my-2' value={oldPassword} onChange={event => setOldPassword(event.target.value)} type='password' name='oldPassword' placeholder='old password' />
                <input className='form-control my-2' value={password} onChange={event => setPassword(event.target.value)} type='password' name='password' placeholder='password' />
                <input className='form-control my-2' value={password2} onChange={event => setPassword2(event.target.value)} type='password' name='password2' placeholder='confirm password' />
                <input className='button primary mt-4' type='submit' value='Update' />
            </form>
        </div>
    )
}

export default UpdatePassword