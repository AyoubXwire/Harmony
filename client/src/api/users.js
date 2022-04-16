import axios from 'axios'
import { objectToQuery } from '../helpers'
import * as urls from './index'

export async function getUsers(token, filters) {
    const query = objectToQuery(filters)

    const users = await axios.get(urls.GET_ALL_USERS + query, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    return users.data
}

export async function createUser(token, user) {
    const response = await axios.post(urls.CREATE_USER, {
        email: user.email,
        password: user.password,
        password2: user.password2,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone
    }, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })

    return response.data.accessToken
}

export async function deleteUser(token, userId) {
    await axios.delete(urls.DELETE_USER + userId, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export async function updateUser(token, userId, user) {
    await axios.put(urls.UPDATE_USER + userId, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
    }, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}