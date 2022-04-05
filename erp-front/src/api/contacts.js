import axios from 'axios'
import * as urls from './index'

export async function getContacts(token) {
    const contacts = await axios.get(urls.GET_ALL_CONTACTS, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    return contacts.data
}

export async function createContact(token, contact) {
    await axios.post(urls.CREATE_CONTACT, {
        email: contact.email,
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone: contact.phone
    }, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export async function deleteContact(token, contactId) {
    await axios.delete(urls.DELETE_CONTACT + contactId, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export async function updateContact(token, contactId, contact) {
    await axios.put(urls.UPDATE_CONTACT + contactId, {
        email: contact.email,
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone: contact.phone
    }, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}
