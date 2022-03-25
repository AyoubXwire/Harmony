import { useState, useEffect } from 'react'
import * as projectApi from '../api/projects'
import { useCookies } from 'react-cookie'

function Projects() {

    const [projects, setProjects] = useState([])
    const [cookies, setCookie] = useCookies(['token'])

    useEffect(() => {
        projectApi.getProjects(cookies.token).then(projects => setProjects(projects))
    }, [])

    function _projectsList() {
        if (projects?.length > 0) {
            return projects.map(project => (
                <div key={project.id} className="col-lg-6">
                    <div className='project-card m-2'>
                        <h4>{project.name}</h4>
                    </div>
                </div>
            ))
        }

        return null
    }

    return (
        <div className='row'>
            {_projectsList()}
        </div>
    )
}

export default Projects