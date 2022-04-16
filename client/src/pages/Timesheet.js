import { useState, useEffect } from 'react'
import * as projectApi from '../api/projects'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'

function Projects() {

    const [projects, setProjects] = useState([])
    const [cookies, setCookie] = useCookies(['token'])

    useEffect(() => {
        projectApi.getUserProjects(cookies.token).then(projects => setProjects(projects))
    }, [])

    function _projectsList() {
        if (projects?.length > 0) {
            return projects.map(project => (
                <div key={project.id} className="card my-4">
                    <h4 className="mb-3">{project.name}</h4>
                    <div className="row">
                        <div className="col-md-6">
                            <input className="form-control" type="number" min="0" max="8" step="0.25" placeholder="time" />
                        </div>
                        <div className="col-md-6">
                            <input className="form-control col-md-6" type="text" placeholder="comment" />
                        </div>
                    </div>
                </div>
            ))
        }

        return null
    }

    return (
        <div className='timesheet'>

            <div className="topbar">
                <div>
                    <Link className="btn btn-warning" to='/history'>History</Link>
                </div>
                <div>
                    <button className="btn btn-danger me-2">Reset</button>
                    <button className="btn btn-success">Save</button>
                </div>
                
            </div>

            {_projectsList()}
        </div>
    )
}

export default Projects