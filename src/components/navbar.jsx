import { Link, useNavigate} from "react-router-dom";


function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem("currentUser");
      navigate("/login");
    };

    return (
      <nav className="navbar">
        <div className="left-navbar">
          <img src="/logo-removebg-preview 1.svg" alt="Logo" className="navbar-logo" />
          <Link to="/" className="app-name">Mitigasi Kita</Link>
        </div>
        <div className="center-navbar">
          <Link to="/" className="nav-link">Beranda</Link>
          <Link to="/map" className="nav-link">Peta Resiko</Link>
          <Link to="/education" className="nav-link">Edukasi</Link>
        </div>
        <div className="right-navbar">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    );
}

export default Navbar;