import './styles/main.css'
import Trombinoscope from './pages/Trombinoscope'
import Navbar from './components/Navbar'

function App() {
	return (
		<div className='app'>
			<Navbar />

			<div className="container py-5">
				<Trombinoscope />
			</div>
		</div>
	)
}

export default App
