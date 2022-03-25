import axios from 'axios'
import * as urls from './index'

export async function getClients(token) {
    const clients = await axios.get(urls.GET_ALL_CLIENTS, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    return clients.data
}
