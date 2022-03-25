import './styles/main.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
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

function App() {

	const navigate = useNavigate()
	const [cookies] = useCookies(['token'])
	const [user, setUser] = useState('username')

	// check if user is authenticated
	// if not, redirect to login page
	useEffect(() => {
		if (cookies.token) {
			userApi.getUserByToken(cookies.token).then(user => setUser(user)).then(() => navigate('/'))
		} else {
			navigate('/login')
		}
	}, [cookies?.token])

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
				</Routes>
			</div>
		</UserContext.Provider>
	)
}

export default App
