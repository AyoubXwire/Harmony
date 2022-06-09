import axios from 'axios'
import * as urls from './index'

export async function getTimesheets(token) {
    const timesheets = await axios.get(urls.GET_ALL_TIMESHEETS, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    return timesheets.data
}

export async function getUserTimesheets(token) {
    const timesheets = await axios.get(urls.GET_ALL_USER_TIMESHEETS, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    return timesheets.data
}

export async function createTimesheet(token, timesheets, date) {
    await axios.post(urls.CREATE_TIMESHEET, {
        timesheets: timesheets,
        date: date
    }, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export async function getTimesheetLatestDate(token) {
    const latestDate = await axios.get(urls.GET_LATEST_TIMESHEET_DATE, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })

    return latestDate.data.date
}
