import { useState, useEffect } from 'react'
import * as userApi from '../api/users'
import { useCookies } from 'react-cookie'

function Trombinoscope() {

    const [users, setUsers] = useState([])
    const [cookies, setCookie] = useCookies(['token'])

    useEffect(() => {
        userApi.getUsers(cookies.token).then(users => setUsers(users))
    }, [])

    function _usersList() {
        if (users?.length > 0) {
            return users.map(user => (
                <div key={user.id} className="col-lg-6">
                    <div className='user-card bordered hover-shadow m-2'>
                        <img className='avatar' src={'https://ui-avatars.com/api/?background=A434AE66&color=A434AE&name=' + user.firstName + '+' + user.lastName} alt={user.firstName + ' ' + user.lastName} />
                        <div className='content'>
                            <h4>{user.firstName + ' ' + user.lastName}</h4>
                            <p>Post: {user.post.name}</p>
                            <p>Email: <a href={'mailto:' + user.email}>{user.email}</a></p>
                            <p>Phone: <a href={'tel:' + user.phone}>{user.phone}</a></p>
                        </div>
                    </div>
                </div>
            ))
        }

        return null
    }

    return (
        <div className='trombinoscope'>
            <h1 className='text-center pb-5'>Trombinoscope</h1>

            <div className='row'>
                {_usersList()}
            </div>
        </div>
    )
}

export default Trombinoscope