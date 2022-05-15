import { useState, useEffect } from 'react'
import * as timesheetApi from '../api/timesheet'
import { useCookies } from 'react-cookie'
import moment from 'moment'

function History() {

    const [timesheets, setTimesheets] = useState([])
    const [cookies] = useCookies(['token'])

    useEffect(() => {
        timesheetApi.getUserTimesheets(cookies.token).then(timesheets => setTimesheets(timesheets))
    }, [])

    function _timesheetsList() {
        if (timesheets?.length > 0) {
            return timesheets.map(timesheet => (
                <div key={timesheet.id} className="card my-4">
                    <p><strong>Date:</strong> {moment(timesheet.date).format('dddd MMMM YYYY')}</p>
                    <p><strong>Project:</strong> {timesheet.project.name}</p>
                    <p><strong>Time:</strong> {timesheet.time}h</p>
                    <p className='m-0'><strong>Comment:</strong> {timesheet.comment}</p>
                </div>
            ))
        }

        return null
    }

    return (
        <div className='timesheet'>
            {_timesheetsList()}
        </div>
    )
}

export default History