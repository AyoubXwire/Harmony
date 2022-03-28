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
                    <div className='user-card m-2'>
                        <img src={'https://ui-avatars.com/api/?name=' + user.firstName + '+' + user.lastName} alt={user.firstName + ' ' + user.lastName} />
                        <div className='ps-2'>
                            <h4>{user.firstName + ' ' + user.lastName}</h4>
                            <p>{user.post.name}</p>
                            <p><a href={'mailto:' + user.email}>{user.email}</a></p>
                            <p><a href={'tel:' + user.phone}>{user.phone}</a></p>
                        </div>
                    </div>
                </div>
            ))
        }

        return null
    }

    return (
        <div className='row'>
            {_usersList()}
        </div>
    )
}

export default Trombinoscope