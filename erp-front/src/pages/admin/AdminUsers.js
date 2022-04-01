import { useState, useEffect } from 'react'
import * as userApi from '../../api/users'
import { useCookies } from 'react-cookie'

function AdminUsers() {

    const [cookies] = useCookies(['token'])
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
    })

    useEffect(() => {
        getUsers()
    }, [])

    async function reset() {
        setUser({
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
        })

        await getUsers()
    }

    async function getUsers() {
        const users = await userApi.getUsers(cookies.token)
        setUsers(users)
    }

    async function saveUser(event) {
        event.preventDefault()

        if (user?.id) {
            updateUser(user.id)
        } else {
            createUser()
        }
    }

    async function createUser() {
        await userApi.registerUser(cookies.token, user)
        await reset()
    }

    async function deleteUser(userId) {
        // await userApi.deleteUser(cookies.token, userId)
        await reset()
    }

    async function updateUser(userId) {
        // await userApi.updateUser(cookies.token, userId, user)
        await reset()
    }

    function _table() {
        if (users?.length > 0) {
            return users.map(_user => (
                <tr key={_user.id}>
                    <th>{_user.id}</th>
                    <td>{_user.lastName + ' ' + _user.firstName}</td>
                    <td>{_user.email}</td>
                    <td>{_user.phone}</td>
                    <td>{_user.post.name}</td>
                    <td>{_user.role.name}</td>
                    <td className="actions">
                        <a href="#" onClick={() => setUser(_user)}>Update</a>
                        {/* <a href="#" onClick={() => deleteUser(_user.id)}>Delete</a> */}
                    </td>
                </tr>
            ))
        }
    }

    return (
        <div>
            <h1 className="text-center">Manage users</h1>

            <div className="form-border my-5">
                <form>
                    <input className='form-control my-2' value={user.id} onChange={event => setUser({ ...user, id: event.target.value })} type='text' name='id' placeholder='user id' disabled />
                    <input className='form-control my-2' value={user.firstName} onChange={event => setUser({ ...user, firstName: event.target.value })} type='text' name='firstName' placeholder='first name' />
                    <input className='form-control my-2' value={user.lastName} onChange={event => setUser({ ...user, lastName: event.target.value })} type='text' name='lastName' placeholder='last name' />
                    <input className='form-control my-2' value={user.email} onChange={event => setUser({ ...user, email: event.target.value })} type='email' name='email' placeholder='email' />
                    <input className='form-control my-2' value={user.phone} onChange={event => setUser({ ...user, phone: event.target.value })} type='text' name='phone' placeholder='phone number' />
                    <input className='form-control my-2' value={user.password} onChange={event => setUser({ ...user, password: event.target.value })} type='password' name='password' placeholder='password' />
                    <input className='form-control my-2' value={user.password2} onChange={event => setUser({ ...user, password2: event.target.value })} type='password' name='password2' placeholder='confirm password' />

                    <div className="actions">
                        <input className='btn btn-danger my-2' type='reset' value='Reset' onClick={reset} />
                        <input className='btn btn-info my-2 ms-2' type='submit' value='Save' />
                    </div>
                </form>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>name</th>
                        <th>email</th>
                        <th>phone</th>
                        <th>post</th>
                        <th>role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {_table()}
                </tbody>
            </table>
        </div>
    )
}

export default AdminUsers