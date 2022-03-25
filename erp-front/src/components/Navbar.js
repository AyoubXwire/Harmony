import { useContext } from "react"
import { UserContext } from "../context/user"
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'

function Navbar() {

    const {user, setUser} = useContext(UserContext)
    const [cookies, setCookie, removeCookie] = useCookies(['token'])

    // remove the cookie from browser and clear userContext
    async function logout(event) {
        event.preventDefault()

        setUser(null)
        removeCookie('token')
    }

    return (
        <div className="navigation">
            <div className="container">
                <h2>Harmony</h2>

                <ul>
                    <li><Link to='/trombinoscope'>Trombinoscope</Link></li>
                    <li><Link to='/projects'>Projects</Link></li>
                    <li><Link to='/clients'>Clients</Link></li>
                    <li><Link to='/timesheet'>Timesheet</Link></li>
                    <li><a href="#" onClick={logout}>Logout</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
