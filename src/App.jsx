import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Homes/Home";
import Education from "./pages/Education/Education-page";
import Login from "./pages/Login/Login-page";
import Register from "./pages/Register/Register-page";
import Map from "./pages/Map/Map-page";
import ForgotPasswordForm from "./pages/Login/ForgotPasswordForm";
import ResetPassword from "./pages/Login/ResetPassword";
import CitySelect from "./pages/Location/CitySelect-page";
import HistoryPage from "./pages/History/Historypage";
import DetailHistory from "./pages/History/DetailHistory";
//import PrivateRoute from './components/privateRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/education" element={<Education />} />
        <Route path="/map" element={<Map />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/city-select" element={<CitySelect />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/history/:id" element={<DetailHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
