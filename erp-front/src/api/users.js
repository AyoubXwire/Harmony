import axios from 'axios'
import * as urls from './index'

export async function getUsers(token) {
    const users = await axios.get(urls.GET_ALL_USERS, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    return users.data
}

export async function getUserByToken(token) {
    const user = await axios.get(urls.GET_USER_BY_TOKEN, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })

    return user.data.user
}

export async function getUserToken(email, password) {
    const response = await axios.post(urls.GET_USER_TOKEN, {
        email: email,
        password: password
    })

    return response.data.accessToken
}

export async function registerUser(token, user) {
    const response = await axios.post(urls.REGISTER_USER, {
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