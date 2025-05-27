import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import Home from './pages/Homes/Home'
import Education from './pages/Education/Education-page'
import Login from './pages/Login/Login-page'
import Register from './pages/Register/Register-page'
import Map from './pages/Map/Map-page'
import PrivateRoute from './components/privateRoute'


function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<PrivateRoute><Home /></PrivateRoute>}
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
