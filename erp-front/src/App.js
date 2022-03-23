import './styles/main.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'

function App() {
	return (
		<Routes>
			<Route path="/" element={<Navbar />} />
			<Route path="/login" element={<Login />} />
    	</Routes>
	)
}

export default App
