import './styles/main.css'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import { UserContext } from './context/user'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import * as userApi from './api/users'
import Trombinoscope from './pages/Trombinoscope'
import Clients from './pages/Clients'
import Projects from './pages/Projects'
import Timesheet from './pages/Timesheet'
import History from './pages/History'

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
			const user = await userApi.getUserByToken(cookies.token)
			setUser(user)

			// redirect to app after login
			if (pathname === '/login') {
				navigate('/trombinoscope')
			}
		} else {
			navigate('/login')
		}
	}

	return (
		<UserContext.Provider value={{user, setUser}}>
			<Navbar />

			<div className="container py-5">
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/trombinoscope" element={<Trombinoscope />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/clients" element={<Clients />} />
					<Route path="/timesheet" element={<Timesheet />} />
					<Route path="/history" element={<History />} />
					<Route path="*" element={<h1 className='text-center'>404</h1>} />
				</Routes>
			</div>
		</UserContext.Provider>
	)
}

export default App
