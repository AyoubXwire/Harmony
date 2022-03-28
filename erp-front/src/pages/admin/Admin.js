import { Link } from 'react-router-dom'

function Admin() {

    return (
        <div>
            <h1>Admin</h1>

            <ul>
                <li><Link to='/admin/posts'>Posts</Link></li>
                <li><Link to='/admin/users'>Users</Link></li>
                <li><Link to='/admin/clients'>Clients</Link></li>
                <li><Link to='/admin/contacts'>Contacts</Link></li>
                <li><Link to='/admin/projects'>Projects</Link></li>
                <li><Link to='/admin/timesheets'>Timesheets</Link></li>
            </ul>
        </div>
    )
}

export default Admin