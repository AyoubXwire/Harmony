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

export async function getUserProjects(token) {
    const projects = await axios.get(urls.GET_ALL_USER_PROJECTS, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    return projects.data
}

export async function createProject(token, project) {
    await axios.post(urls.CREATE_PROJECT, {
        name: project.name
    }, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export async function deleteProject(token, projectId) {
    await axios.delete(urls.DELETE_PROJECT + projectId, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export async function updateProject(token, projectId, project) {
    await axios.put(urls.UPDATE_PROJECT + projectId, {
        name: project.name
    }, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}
