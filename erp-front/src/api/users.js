import axios from 'axios'

export async function getUsers() {
    const users = await axios.get('http://localhost:4000/api/users/')
    return users.data
}
