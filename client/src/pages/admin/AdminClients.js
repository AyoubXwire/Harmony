import { useState, useEffect } from 'react'
import * as clientApi from '#api/clients'
import { useCookies } from 'react-cookie'

function AdminClients() {

    const [cookies] = useCookies(['token'])
    const [clients, setClients] = useState([])
    const [client, setClient] = useState({
        id: '',
        name: ''
    })

    useEffect(() => {
        getClients()
    }, [])

    async function reset() {
        setClient({
            id: '',
            name: '' 
        })

        await getClients()
    }

    async function getClients() {
        const clients = await clientApi.getClients(cookies.token)
        setClients(clients)
    }

    async function saveClient(event) {
        event.preventDefault()

        if (client?.id) {
            updateClient(client.id)
        } else {
            createClient()
        }
    }

    async function createClient() {
        await clientApi.createClient(cookies.token, client)
        await reset()
    }

    async function deleteClient(clientId) {
        await clientApi.deleteClient(cookies.token, clientId)
        await reset()
    }

    async function updateClient(clientId) {
        await clientApi.updateClient(cookies.token, clientId, client)
        await reset()
    }

    function _table() {
        if (clients?.length > 0) {
            return clients.map(_client => (
                <tr key={_client.id}>
                    <th>{_client.id}</th>
                    <td>{_client.name}</td>
                    <td>{_client._count.contacts}</td>
                    <td>{_client._count.projects}</td>
                    <td className="actions">
                        <a href="#" onClick={() => setClient(_client)}>Update</a>
                        <a href="#" onClick={() => deleteClient(_client.id)}>Delete</a>
                    </td>
                </tr>
            ))
        }
    }

    return (
        <div>
            <h1 className="text-center">Manage clients</h1>

            <div className="form-border my-5">
                <form onSubmit={saveClient}>
                    <input className='form-control my-2' value={client.id} onChange={event => setClient({ ...client, id: event.target.value })} type='text' name='id' placeholder='client id' disabled />
                    <input className='form-control my-2' value={client.name} onChange={event => setClient({ ...client, name: event.target.value })} type='text' name='name' placeholder='client name' />

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
                        <th>Client name</th>
                        <th>Contacts</th>
                        <th>Projects</th>
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

export default AdminClients