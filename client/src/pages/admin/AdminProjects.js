import { useState, useEffect } from 'react'
import * as projectApi from '#api/projects'
import * as userApi from '#api/users'
import { useCookies } from 'react-cookie'
import moment from 'moment'

function AdminProjects() {

    const [cookies] = useCookies(['token'])
    const [users, setUsers] = useState([])
    const [projects, setProjects] = useState([])
    const [project, setProject] = useState({
        id: '',
        name: '',
        price: '',
        startDate: Date.now(),
        endDate: Date.now(),
        users: [],
    })

    useEffect(() => {
        getProjects()
        getUsers()
    }, [])

    async function getUsers() {
        const users = await userApi.getUsers(cookies.token)
        setUsers(users)
    }

    async function reset() {
        setProject({
            id: '',
            name: '',
            price: '',
            startDate: Date.now(),
            endDate: Date.now(),
            users: [],
        })

        await getProjects()
    }

    async function getProjects() {
        const projects = await projectApi.getProjects(cookies.token)
        setProjects(projects)
    }

    async function saveProject(event) {
        event.preventDefault()

        if (project?.id) {
            updateProject(project.id)
        } else {
            createProject()
        }
    }

    async function createProject() {
        await projectApi.createProject(cookies.token, project)
        await reset()
    }

    async function deleteProject(projectId) {
        await projectApi.deleteProject(cookies.token, projectId)
        await reset()
    }

    async function updateProject(projectId) {
        await projectApi.updateProject(cookies.token, projectId, project)
        await reset()
    }

    function _table() {
        if (projects?.length > 0) {
            return projects.map(_project => (
                <tr key={_project.id}>
                    <th>{_project.id}</th>
                    <td>{_project.name}</td>
                    <td>{moment(_project.startDate).format('DD-MM-YY')}</td>
                    <td>{moment(_project.endDate).format('DD-MM-YY')}</td>
                    <td>{_project.price} DH</td>
                    <td>{_project._count.users}</td>
                    <td>{_project.client.name}</td>
                    <td className="actions">
                        <a href="#" onClick={() => setProject(_project)}>Update</a>
                        <a href="#" onClick={() => deleteProject(_project.id)}>Delete</a>
                    </td>
                </tr>
            ))
        }
    }

    function _usersList() {
        return users?.map(_user => {
            let isFound = false

            for (const projectUser of project?.users) {
                if (_user.id === projectUser.user.id) {
                    isFound = true
                    break
                }
            }

            return (
                <div key={_user.id} className="item">
                    <input id={_user.id} type="checkbox" checked={isFound} onChange={event => event.target.checked = true} />
                    <p>{_user.firstName + ' ' + _user.lastName}</p>
                </div>
            )
        })
    }

    return (
        <div>
            <h1 className="text-center">Manage projects</h1>

            <div className="form-border my-5">
                <form onSubmit={saveProject}>
                    <input className='form-control my-2' value={project.id} onChange={event => setProject({ ...project, id: event.target.value })} type='text' name='id' placeholder='project id' disabled />
                    
                    <div className="row">
                        <div className="col-md-6">
                            <input className='form-control my-2' value={project.name} onChange={event => setProject({ ...project, name: event.target.value })} type='text' name='name' placeholder='project name' />
                        </div>
                        <div className="col-md-6">
                            <input className='form-control my-2' value={project.price} onChange={event => setProject({ ...project, price: event.target.value })} type='number' name='price' placeholder='project price' />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <input className='form-control my-2' value={moment(project.startDate).format('yyyy-MM-DD')} onChange={event => setProject({ ...project, startDate: event.target.value })} type='date' name='start-date' placeholder='start date' />
                        </div>
                        <div className="col-md-6">
                            <input className='form-control my-2' value={moment(project.endDate).format('yyyy-MM-DD')} onChange={event => setProject({ ...project, endDate: event.target.value })} type='date' name='end-date' placeholder='end date' />
                        </div>
                    </div>

                    <div className="form-control checkbox-list my-2">
                        {_usersList()}
                    </div>

                    <div className="actions">
                        <input className='button secondary mt-2' type='reset' value='Reset' onClick={reset} />
                        <input className='button primary mt-2 ms-2' type='submit' value='Save' />
                    </div>
                </form>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Price</th>
                        <th>Users</th>
                        <th>Client</th>
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

export default AdminProjects