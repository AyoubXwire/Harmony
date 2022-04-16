import { useState, useEffect } from 'react'
import * as timesheetApi from '../api/timesheet'
import { useCookies } from 'react-cookie'

function History() {

    const [timesheets, setTimesheets] = useState([])
    const [cookies, setCookie] = useCookies(['token'])

    useEffect(() => {
        timesheetApi.getUserTimesheets(cookies.token).then(timesheets => setTimesheets(timesheets))
    }, [])

    function _timesheetsList() {
        if (timesheets?.length > 0) {
            return timesheets.map(timesheet => (
                <div key={timesheet.id} className="card my-4">
                    <h4 className="mb-3">{timesheet.name}</h4>
                    <p>{timesheet.comment}</p>
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