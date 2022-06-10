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
                <>
                    { user?.role?.name === 'ADMIN' ? <li><Link to='/admin'>Admin</Link></li> : null }
                    <li><Link to='/trombinoscope'>Trombinoscope</Link></li>
                    <li><Link to='/timesheet'>My Timesheet</Link></li>
                    <li className="sz-dropdown">
                        <div>
                            <a href="#">Profile</a>
                            <span className="sz-dropdown-btn">
                                <div className="sz-dropdown-burger">
                                    <div className="sz-dropdown-line1"></div>
                                    <div className="sz-dropdown-line2"></div>
                                </div>
                            </span>
                        </div>
                        <ul className="sz-submenu">
                            <li><Link to='/update-password'>Update password</Link></li>
                            <li><a href="#" onClick={logout}>Logout</a></li>
                        </ul>
                    </li>
                </>
            )
        }
    }

    return (
        <>
            <header className="sz-navbar">
                <nav className="sz-container container">
                    <div className="sz-logo"><h2 className="m-0">Harmony</h2></div>

                        <ul className="sz-menu">
                            {_links()}
                        </ul>
                        
                    <div className="sz-burger">
                        <div className="sz-line1"></div>
                        <div className="sz-line2"></div>
                        <div className="sz-line3"></div>
                    </div>
                </nav>
            </header>

            <div className="sz-navbar-space"></div>
        </>
    )
}

export default Navbar
