import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { logout } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    setIsOpen(false);
  };

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);
  const handleLinkClick = () => closeMenu();

  const navLinkClass = ({ isActive }) =>
  `text-base md:text-lg font-medium ${
    isActive ? "text-red-600" : "text-blue-950"
  }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block py-2 text-lg font-medium ${
      isActive ? "text-red-600" : "text-blue-950"
    }`;

  const handleLoginClick = () => {
    navigate("/login"); // Ganti sesuai route login kamu
  };

  return (
    <nav className="bg-white fixed top-0 left-0 w-full z-50">
      <div className="px-6 sm:px-12">
        <div className="grid grid-cols-3 items-center h-20">

          {/*Kolom Kiri: Logo MitigasiKita */}
          <div className="flex items-center space-x-2">
            <img
              className="h-12 md:h-14 w-auto"
              src="/logo-removebg-preview 1.svg"
              alt="Logo MitigasiKita"
            />
            <p className="font-patua-one text-lg md:text-xl text-[#0D3553]">
              MITIGASIKITA
            </p>
          </div>

          {/*Kolom Tengah: Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-6 justify-center">
            <NavLink to="/" end onClick={handleLinkClick} className={navLinkClass}>
              Beranda
            </NavLink>
            <NavLink to="/map" onClick={handleLinkClick} className={navLinkClass}>
              Peta Resiko
            </NavLink>
            <NavLink to="/education" onClick={handleLinkClick} className={navLinkClass}>
              Edukasi
            </NavLink>
            <NavLink to="/history" onClick={handleLinkClick} className={navLinkClass}>
              History
            </NavLink>

          </div>

          {/*Kolom Kanan: Desktop Logout Button */}
          <div className="flex justify-end">
            <button
              onClick={handleLoginClick}
              className="text-lg md:text-base font-medium text-white px-4 py-2 rounded-md bg-[#0D3553]"
            >
              Login
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="sm:hidden flex items-center">
            <button onClick={openMenu} className="text-white">
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
            className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ease-in-out"
          ></div>

          <div className="sm:hidden fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-xl z-40 flex flex-col p-6 transition-transform duration-300 ease-in-out transform translate-x-0">
            <div className="flex justify-between items-center mb-6">
              <p className="font-patua-one text-lg text-blue-950">MENU</p>
              <button onClick={closeMenu} className="text-2xl text-blue-950">
                <FaTimes />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-grow flex flex-col space-y-3">
              <NavLink to="/" onClick={handleLinkClick} className={mobileNavLinkClass}>
                Beranda
              </NavLink>
              <NavLink to="/map" onClick={handleLinkClick} className={mobileNavLinkClass}>
                Peta Resiko
              </NavLink>
              <NavLink
                to="/education"
                onClick={handleLinkClick}
                className={mobileNavLinkClass}
              >
                Edukasi
              </NavLink>
              <NavLink to="/history" onClick={handleLinkClick} className={mobileNavLinkClass}>
                History
              </NavLink>
            </nav>

            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white mt-6 px-4 py-3 rounded-lg hover:bg-red-700 text-lg font-medium"
            >
              Logout
            </button>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
