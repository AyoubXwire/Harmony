import { useState, useEffect } from 'react'
import * as projectApi from '../api/projects'
import * as timesheetApi from '../api/timesheet'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'

function Projects() {

    const [cookies, setCookie] = useCookies(['token'])
    const [projects, setProjects] = useState([])
    const [timesheets, setTimesheets] = useState([])

    useEffect(() => {
        projectApi.getUserProjects(cookies.token).then(projects => setProjects(projects))
    }, [])

    async function updateTimesheet(projectId, time, comment) {

        let tempTimesheets = timesheets
        let doesProjectExist = false

        tempTimesheets.forEach((timesheet, index) => {
            if (timesheet.projectId === projectId) {
                doesProjectExist = true

                if (time) tempTimesheets[index].time = Number(time)
                if (comment !== null) tempTimesheets[index].comment = comment
            }
        })

        if (!doesProjectExist) {
            if (time == 0 && !comment) return
            
            if (time) {
                tempTimesheets.push({
                    projectId: projectId,
                    time: Number(time)
                })
            }
        
            if (comment) {
                tempTimesheets.push({
                    projectId: projectId,
                    comment: Number(time)
                })
            }
        }

        setTimesheets(tempTimesheets)
    }

    async function save() {
        const tempTimesheets = timesheets

        tempTimesheets.forEach((timesheet, index) => {
            if (!timesheet.time || timesheet.time == 0) {
                tempTimesheets.splice(index, 1)
            }
        })

        timesheetApi.createTimesheet(cookies['token'], tempTimesheets)
    }

    function _projectsList() {
        if (projects?.length > 0) {
            return projects.map(project => (
                <div key={project.id} className="card my-4">
                    <h4 className="mb-3">{project.name}</h4>
                    <div className="row">
                        <div className="col-md-6">
                            <input className="form-control" onChange={(event) => updateTimesheet(project.id, event.target.value, null)} type="number" min="0" max="8" step="0.25" placeholder="time" />
                        </div>
                        <div className="col-md-6">
                            <input className="form-control col-md-6" onChange={(event) => updateTimesheet(project.id, null, event.target.value)} type="text" placeholder="comment" />
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
                    <Link className="button primary" to='/history'>History</Link>
                </div>
                <div>
                    <button className="button secondary me-2">Reset</button>
                    <button className="button primary" onClick={save}>Save</button>
                </div>
                
            </div>

            {_projectsList()}
        </div>
    )
}

export default Projects