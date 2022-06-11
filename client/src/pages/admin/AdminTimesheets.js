import { useState, useEffect } from 'react'
import * as timesheetApi from '#api/timesheet'
import { useCookies } from 'react-cookie'
import moment from 'moment'

function AdminTimesheets() {

    const [cookies] = useCookies(['token'])
    const [timesheets, setTimesheets] = useState([])

    useEffect(() => {
        getTimesheets()
    }, [])

    async function getTimesheets() {
        const timesheets = await timesheetApi.getTimesheets(cookies.token)
        setTimesheets(timesheets)
    }

    function _timesheets() {
        if (timesheets?.length > 0) {
            return timesheets.map(_timesheet => (
                <tr key={_timesheet.id}>
                    <th>{_timesheet.id}</th>
                    <td>{_timesheet.user.firstName + ' ' + _timesheet.user.lastName}</td>
                    <td>{_timesheet.project.name}</td>
                    <td>{_timesheet.time}h</td>
                    <td>{_timesheet.comment}</td>
                    <td>{moment(_timesheet.date).format('dddd DD MMM YYYY')}</td>
                </tr>
            ))
        }
    }

    return (
        <div>
            <h1 className="text-center">AdminTimesheets</h1>

            <div className="form-border my-5">
                <form>
                    <div className='row'>
                        <h4 className='text-center pb-3'>Search</h4>
                        <div className='col-md-6'>
                            <label>by user:</label>
                            <select className='form-control' >
                                <option key={0}>All</option>
                            </select>
                        </div>
                        <div className='col-md-6'>
                            <label>by project:</label>
                            <select className='form-control' >
                                <option key={0}>All</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Project</th>
                        <th>Time</th>
                        <th>Comment</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {_timesheets()}
                </tbody>
            </table>
        </div>
    )
}

export default AdminTimesheets