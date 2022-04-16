import axios from 'axios'
import * as urls from './index'

export async function getTimesheets(token) {
    const projects = await axios.get(urls.GET_ALL_TIMESHEETS, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    return projects.data
}

export async function getUserTimesheets(token) {
    const projects = await axios.get(urls.GET_ALL_USER_TIMESHEETS, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    return projects.data
}
