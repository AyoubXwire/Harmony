import { useState, useEffect } from 'react'
import * as projectApi from '../../api/projects'
import { useCookies } from 'react-cookie'

function AdminProjects() {

    const [cookies] = useCookies(['token'])
    const [projects, setProjects] = useState([])
    const [project, setProject] = useState({
        id: '',
        name: '',
        price: '',
        startDate: '',
        endDate: ''
    })

    useEffect(() => {
        getProjects()
    }, [])

    async function reset() {
        setProject({
            id: '',
            name: '',
            price: '',
            startDate: '',
            endDate: '' 
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
                    <td className="actions">
                        <a href="#" onClick={() => setProject(_project)}>Update</a>
                        <a href="#" onClick={() => deleteProject(_project.id)}>Delete</a>
                    </td>
                </tr>
            ))
        }
    }

    return (
        <div>
            <h1 className="text-center">Manage projects</h1>

            <div className="form-border my-5">
                <form onSubmit={saveProject}>
                    <input className='form-control my-2' value={project.id} onChange={event => setProject({ ...project, id: event.target.value })} type='text' name='id' placeholder='project id' disabled />
                    <input className='form-control my-2' value={project.name} onChange={event => setProject({ ...project, name: event.target.value })} type='text' name='name' placeholder='project name' />

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
                        <th>Project name</th>
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