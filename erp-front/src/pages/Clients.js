import { useState, useEffect } from 'react'
import * as clientApi from '../api/clients'
import { useCookies } from 'react-cookie'

function Clients() {

    const [clients, setClients] = useState([])
    const [cookies, setCookie] = useCookies(['token'])

    useEffect(() => {
        clientApi.getClients(cookies.token).then(clients => setClients(clients))
    }, [])

    function _clientsList() {
        if (clients?.length > 0) {
            return clients.map(client => (
                <div key={client.id} className="col-lg-6">
                    <div className='client-card m-2'>
                        <h4>{client.name}</h4>
                    </div>
                </div>
            ))
        }

        return null
    }

    return (
        <div className='row'>
            {_clientsList()}
        </div>
    )
}

export default Clients