import { useState, useEffect } from 'react'
import * as contactApi from '../../api/contacts'
import { useCookies } from 'react-cookie'

function AdminContacts() {

    const [cookies] = useCookies(['token'])
    const [contacts, setContacts] = useState([])
    const [contact, setContact] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    })

    useEffect(() => {
        getContacts()
    }, [])

    async function reset() {
        setContact({
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        })

        await getContacts()
    }

    async function getContacts() {
        const contacts = await contactApi.getContacts(cookies.token)
        setContacts(contacts)
    }

    async function saveContact(event) {
        event.preventDefault()

        if (contact?.id) {
            updateContact(contact.id)
        } else {
            createContact()
        }
    }

    async function createContact() {
        await contactApi.createContact(cookies.token, contact)
        await reset()
    }

    async function deleteContact(contactId) {
        await contactApi.deleteContact(cookies.token, contactId)
        await reset()
    }

    async function updateContact(contactId) {
        await contactApi.updateContact(cookies.token, contactId, contact)
        await reset()
    }

    function _table() {
        if (contacts?.length > 0) {
            return contacts.map(_contact => (
                <tr key={_contact.id}>
                    <th>{_contact.id}</th>
                    <td>{_contact.lastName + ' ' + _contact.firstName}</td>
                    <td>{_contact.email}</td>
                    <td>{_contact.phone}</td>
                    <td>{_contact.client.name}</td>
                    <td className="actions">
                        <a href="#" onClick={() => setContact(_contact)}>Update</a>
                        <a href="#" onClick={() => deleteContact(_contact.id)}>Delete</a>
                    </td>
                </tr>
            ))
        }
    }

    return (
        <div>
            <h1 className="text-center">Manage contacts</h1>

            <div className="form-border my-5">
                <form onSubmit={saveContact}>
                    <input className='form-control my-2' value={contact.id} onChange={event => setContact({ ...contact, id: event.target.value })} type='text' name='id' placeholder='contact id' disabled />
                    
                    <div className='row'>
                        <div className='col-md-6'>
                            <input className='form-control my-2' value={contact.firstName} onChange={event => setContact({ ...contact, firstName: event.target.value })} type='text' name='firstName' placeholder='first name' />
                        </div>
                        <div className='col-md-6'>
                            <input className='form-control my-2' value={contact.lastName} onChange={event => setContact({ ...contact, lastName: event.target.value })} type='text' name='lastName' placeholder='last name' />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-6'>
                            <input className='form-control my-2' value={contact.email} onChange={event => setContact({ ...contact, email: event.target.value })} type='email' name='email' placeholder='email' />
                        </div>
                        <div className='col-md-6'>
                            <input className='form-control my-2' value={contact.phone} onChange={event => setContact({ ...contact, phone: event.target.value })} type='text' name='phone' placeholder='phone number' />
                        </div>
                    </div>

                    <div className="actions">
                        <input className='button secondary mt-3' type='reset' value='Reset' onClick={reset} />
                        <input className='button primary mt-3 ms-2' type='submit' value='Save' />
                    </div>
                </form>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Client</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {_table()}
                </tbody>
            </table>
        </div>
    )
}

export default AdminContacts