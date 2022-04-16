import './static/styles/main.css'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import { UserContext } from './context/user'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import * as authApi from './api/auth'
import Trombinoscope from './pages/Trombinoscope'
import Timesheet from './pages/Timesheet'
import History from './pages/History'
import Admin from './pages/admin/Admin'
import AdminPosts from './pages/admin/AdminPosts'
import AdminUsers from './pages/admin/AdminUsers'
import AdminClients from './pages/admin/AdminClients'
import AdminContacts from './pages/admin/AdminContacts'
import AdminProjects from './pages/admin/AdminProjects'
import AdminTimesheets from './pages/admin/AdminTimesheets'

function App() {

	const navigate = useNavigate()
	const { pathname } = useLocation()
	const [cookies] = useCookies(['token'])
	const [user, setUser] = useState('username')

	useEffect(() => {
		checkAuth()
	}, [cookies?.token])

	// check if user is authenticated
	async function checkAuth() {
		if (cookies.token) {
			const user = await authApi.getUserByToken(cookies.token)
			setUser(user)

			// redirect to app after login
			if (pathname === '/login') {
				navigate('/trombinoscope')
			}
		} else {
			navigate('/login')
		}
	}

	function _adminRoutes() {
		if (user?.role?.name === 'ADMIN') {
			return (
				<Route path="/admin">
					<Route path="/admin" element={<Admin />} />
					<Route path="/admin/posts" element={<AdminPosts />} />
					<Route path="/admin/users" element={<AdminUsers />} />
					<Route path="/admin/clients" element={<AdminClients />} />
					<Route path="/admin/contacts" element={<AdminContacts />} />
					<Route path="/admin/projects" element={<AdminProjects />} />
					<Route path="/admin/timesheets" element={<AdminTimesheets />} />
				</Route>
			)
		} else {
			return null
		}
	}

	return (
		<UserContext.Provider value={{user, setUser}}>
			<Navbar />

			<div className="container py-5">
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/trombinoscope" element={<Trombinoscope />} />
					<Route path="/timesheet" element={<Timesheet />} />
					<Route path="/history" element={<History />} />

					{_adminRoutes()}

					<Route path="*" element={<h1 className='text-center'>404</h1>} />
				</Routes>
			</div>
		</UserContext.Provider>
	)
}

export default App