import axios from 'axios'
import * as urls from './index'

export async function getProjects(token) {
    const projects = await axios.get(urls.GET_ALL_PROJECTS, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    return projects.data
}
