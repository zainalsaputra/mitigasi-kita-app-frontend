import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import Home from './pages/Home/home'
import Education from './pages/Education/education'
import Login from './pages/Login/login'
import Register from './pages/Register/register'
import Map from './pages/Map/map'

const isAuthenticated = () => !!localStorage.getItem('currentUser');
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated() ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/education" element={<Education />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </Router>
  );
}

export default App
