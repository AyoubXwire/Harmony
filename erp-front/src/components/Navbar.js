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

    function _links() {
        if (user?.id) {
            return (
                <ul>
                    <li><Link to='/trombinoscope'>Trombinoscope</Link></li>
                    <li><Link to='/projects'>Projects</Link></li>
                    <li><Link to='/clients'>Clients</Link></li>
                    <li><Link to='/timesheet'>Timesheet</Link></li>
                    <li><a href="#" onClick={logout}>Logout</a></li>
                </ul>
            )
        } else {
            return (
                <ul>
                    <li><Link to='/login'>Login</Link></li>
                </ul>
            )
        }
    }

    return (
        <div className="navigation">
            <div className="container">
                <h2>Harmony</h2>

                {_links()}
            </div>
        </div>
    )
}

export default Navbar
