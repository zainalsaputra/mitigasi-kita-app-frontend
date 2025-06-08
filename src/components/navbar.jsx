import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { logout } from "../utils/auth";
import MySwal from "sweetalert2"
function LogoutButton({ fullWidth = false, onClose, onLogout }) {
  const navigate = useNavigate();

  const confirmLogout = () => {
    MySwal.fire({
      html: `
        <div class="text-white text-center font-bold text-lg mb-4">
          Apakah Anda yakin ingin keluar?
        </div>
        <div class="flex justify-center gap-4">
          <button id="cancel-logout" class="bg-white text-gray-700 font-bold px-4 py-2 rounded hover:bg-gray-100 transition">
            Batal
          </button>
          <button id="confirm-logout" class="bg-white text-red-700 font-bold px-4 py-2 rounded hover:bg-gray-100 transition">
            Keluar
          </button>
        </div>
      `,
      background: "#0D3553",
      showConfirmButton: false,
      allowOutsideClick: false,
      customClass: {
        popup: "rounded-lg px-8 py-6",
      },
      didOpen: () => {
        const cancelBtn = document.getElementById("cancel-logout");
        const confirmBtn = document.getElementById("confirm-logout");

        if (cancelBtn) {
          cancelBtn.addEventListener("click", () => {
            MySwal.close();
          });
        }

        if (confirmBtn) {
          confirmBtn.addEventListener("click", () => {
            MySwal.close();
            logout(); // fungsi logout dari utils
            if (onLogout) onLogout();
            if (onClose) onClose();
            navigate("/");
          });
        }
      },
    });
  };

  return (
    <button
      onClick={confirmLogout}
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
    <nav className="fixed top-0 left-0 w-full z-50 bg-white">
      <div className="px-4 sm:px-6 lg:px-12 relative h-16 sm:h-20 flex items-center">
        {/* Logo (Kiri) */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <NavLink to="/" end onClick={handleLinkClick}>
            <img
              className="h-10 sm:h-12 md:h-14 w-auto"
              src="/logo-removebg-preview 1.svg"
              alt="Logo MitigasiKita"
            />
          </NavLink>
          <NavLink to="/" end onClick={handleLinkClick}>
            <p className="font-patua-one text-lg sm:text-xl text-[#0D3553]">
              MITIGASIKITA
            </p>
          </NavLink>
        </div>

        {/* Navigasi Tengah */}
        <div className="hidden lg:flex space-x-6 items-center absolute left-1/2 transform -translate-x-1/2">
          <NavLink
            to="/"
            end
            onClick={handleLinkClick}
            className={navLinkClass}
          >
            Beranda
          </NavLink>
          <NavLink to="/map" onClick={handleLinkClick} className={navLinkClass}>
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

        {/* Login/Logout (Kanan) */}
        <div className="hidden lg:flex flex-shrink-0 ml-auto">
          {isLoggedIn ? (
            <LogoutButton onLogout={() => setIsLoggedIn(false)} />
          ) : (
            <button
              onClick={handleAuthClick}
              className="text-white px-4 py-2 rounded-md bg-[#0D3553] font-poppins font-semibold"
            >
              Login
            </button>
          )}
        </div>

        {/* Hamburger Button */}
        <div className="lg:hidden ml-auto">
          <button onClick={openMenu} className="text-[#000000] text-2xl">
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <>
          <div
            onClick={closeMenu}
            className="lg:hidden fixed inset-0 bg-black opacity-25 z-30"
          ></div>
          <div className="lg:hidden fixed top-0 right-0 h-full w-1/2 max-w-xs bg-white shadow-xl z-40 flex flex-col p-6">
            <div className="flex justify-end items-center mb-6">
              <button onClick={closeMenu} className="text-2xl text-blue-950">
                <FaTimes />
              </button>
            </div>
            <nav className="flex-grow flex flex-col space-y-3 items-center">
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
              {isLoggedIn && (
                <NavLink
                  to="/history"
                  onClick={handleLinkClick}
                  className={mobileNavLinkClass}
                >
                  History
                </NavLink>
              )}
            </nav>
            {isLoggedIn ? (
              <LogoutButton
                fullWidth
                onClose={closeMenu}
                onLogout={() => setIsLoggedIn(false)}
              />
            ) : (
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleAuthClick}
                  className="bg-[#0D3553] text-white px-4 py-2 rounded-lg text-lg font-bold w-40 h-12 flex justify-center items-center"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
