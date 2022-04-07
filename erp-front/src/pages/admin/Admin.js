import { Link } from 'react-router-dom'

// icons
import postsIcon from '../../static/images/posts.png'
import usersIcon from '../../static/images/users.png'
import clientsIcon from '../../static/images/clients.png'
import contactsIcon from '../../static/images/contacts.png'
import projectsIcon from '../../static/images/projects.png'
import timesheetsIcon from '../../static/images/timesheets.png'

function Admin() {

    return (
        <div className='admin-dashboard'>
            <h1 className='text-center pb-5'>Admin Dashboard</h1>

            <div className='row'>
                <div className='col-lg-3 col-md-4 col-sm-6 py-3'>
                    <Link to='/admin/posts'>
                        <div className='tab hover-shadow'>
                            <img src={postsIcon} alt='posts' />
                            <h4>Posts</h4>
                        </div>
                    </Link>
                </div>
                <div className='col-lg-3 col-md-4 col-sm-6 py-3'>
                    <Link to='/admin/users'>
                        <div className='tab hover-shadow'>
                            <img src={usersIcon} alt='users' />
                            <h4>Users</h4>
                        </div>
                    </Link>
                </div>
                <div className='col-lg-3 col-md-4 col-sm-6 py-3'>
                    <Link to='/admin/clients'>
                        <div className='tab hover-shadow'>
                            <img src={clientsIcon} alt='clients' />
                            <h4>Clients</h4>
                        </div>
                    </Link>
                </div>
                <div className='col-lg-3 col-md-4 col-sm-6 py-3'>
                    <Link to='/admin/contacts'>
                        <div className='tab hover-shadow'>
                            <img src={contactsIcon} alt='contacts' />
                            <h4>Contacts</h4>
                        </div>
                    </Link>
                </div>
                <div className='col-lg-3 col-md-4 col-sm-6 py-3'>
                    <Link to='/admin/projects'>
                        <div className='tab hover-shadow'>
                            <img src={projectsIcon} alt='projects' />
                            <h4>Projects</h4>
                        </div>
                    </Link>
                </div>
                <div className='col-lg-3 col-md-4 col-sm-6 py-3'>
                    <Link to='/admin/timesheets'>
                        <div className='tab hover-shadow'>
                            <img src={timesheetsIcon} alt='timesheets' />
                            <h4>Timesheets</h4>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Admin