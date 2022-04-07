import axios from 'axios'
import * as urls from './index'

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
