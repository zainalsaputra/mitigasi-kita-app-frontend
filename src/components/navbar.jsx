import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { logout } from "../utils/auth";
function LogoutButton({ fullWidth = false, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
    navigate("/login");
    if (onClose) {
      onClose();
    }
    window.location.reload();
  };

  return (
    <button
      onClick={handleLogout}
      className={`text-white px-4 py-2 rounded-md bg-[#C43238] font-poppins font-semibold ${
        fullWidth ? "w-full text-lg py-3 rounded-lg mt-6" : ""
      }`}
    >
      Logout
    </button>
  );
}

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);
  const handleLinkClick = () => closeMenu();

  const navLinkClass = ({ isActive }) =>
    `text-base md:text-lg font-medium transition-colors duration-200 ${
      isActive ? "text-red-600" : "text-black"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block py-2 text-lg font-medium transition-colors duration-200 ${
      isActive ? "text-red-600" : "text-black"
    }`;

  const handleAuthClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    setIsOpen(false); 
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-xs">
      <div className="px-4 sm:px-6 lg:px-12 relative">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <img
              className="h-10 sm:h-12 md:h-14 w-auto"
              src="/logo-removebg-preview 1.svg"
              alt="Logo MitigasiKita"
            />
            <p className="font-patua-one text-lg sm:text-xl text-[#0D3553]">
              MITIGASIKITA
            </p>
          </div>
          {/* Navigasi Tengah - Adjusted for Flexbox on desktop */}
          <div className="hidden lg:flex space-x-6 items-center">
            <NavLink
              to="/"
              end
              onClick={handleLinkClick}
              className={navLinkClass}
            >
              Beranda
            </NavLink>
            <NavLink
              to="/map"
              onClick={handleLinkClick}
              className={navLinkClass}
            >
              Peta Resiko
            </NavLink>
            <NavLink
              to="/education"
              onClick={handleLinkClick}
              className={navLinkClass}
            >
              Edukasi
            </NavLink>
            {isLoggedIn && (
              <NavLink
                to="/history"
                onClick={handleLinkClick}
                className={navLinkClass}
              >
                History
              </NavLink>
            )}
          </div>
          {/* Kanan: Login atau Logout */}
          <div className="hidden lg:flex flex-shrink-0">
            {isLoggedIn ? (
              <LogoutButton />
            ) : (
              <button
                onClick={handleAuthClick}
                className="text-white px-4 py-2 rounded-md bg-[#C43238] font-poppins font-semibold"
              >
                Login
              </button>
            )}
          </div>

          {/* Hamburger Button */}
          <div className="lg:hidden">
            <button onClick={openMenu} className="text-[#000000] text-2xl">
              <FaBars />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Panel */}
      {isOpen && (
        <>
          <div
            onClick={closeMenu}
            className="lg:hidden fixed inset-0 bg-black opacity-25 z-30"
          ></div>
          <div className="lg:hidden fixed top-0 right-0 h-full w-2/4 max-w-xs bg-white shadow-xl z-40 flex flex-col p-6">
            <div className="flex justify-end items-center mb-6">
              <button onClick={closeMenu} className="text-2xl text-blue-950">
                <FaTimes />
              </button>
            </div>
            <nav className="flex-grow flex flex-col space-y-3">
              <NavLink
                to="/"
                onClick={handleLinkClick}
                className={mobileNavLinkClass}
              >
                Beranda
              </NavLink>
              <NavLink
                to="/map"
                onClick={handleLinkClick}
                className={mobileNavLinkClass}
              >
                Peta Resiko
              </NavLink>
              <NavLink
                to="/education"
                onClick={handleLinkClick}
                className={mobileNavLinkClass}
              >
                Edukasi
              </NavLink>
              <NavLink
                to="/history"
                onClick={handleLinkClick}
                className={mobileNavLinkClass}
              >
                History
              </NavLink>
            </nav>
            {isLoggedIn ? (
              <LogoutButton fullWidth onClose={closeMenu} />
            ) : (
              <button
                onClick={handleAuthClick}
                className="w-full bg-[#C43238] text-white mt-6 px-4 py-3 rounded-lg text-lg font-medium"
              >
                Login
              </button>
            )}
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;