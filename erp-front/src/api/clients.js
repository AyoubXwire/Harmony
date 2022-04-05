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

export async function createClient(token, client) {
    await axios.post(urls.CREATE_CLIENT, {
        name: client.name
    }, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export async function deleteClient(token, clientId) {
    await axios.delete(urls.DELETE_CLIENT + clientId, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export async function updateClient(token, clientId, client) {
    await axios.put(urls.UPDATE_CLIENT + clientId, {
        name: client.name
    }, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}
