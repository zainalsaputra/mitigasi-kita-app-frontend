import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Typo 'navigate.' diperbaiki
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

  // Fungsi terpisah untuk membuka dan menutup menu mobile
  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  // Menutup menu mobile saat link di logo atau navigasi diklik
  const handleLinkClick = () => {
    closeMenu();
  };

  return (
    <nav className="bg-white fixed top-0 left-0 w-full z-50">
      {/* Padding horizontal untuk Navbar */}
      <div className="px-6 sm:px-12">
        {/* Kontainer utama untuk item Navbar */}
        <div className="flex h-20 items-center justify-between">

          {/* Kiri: Logo dan Nama Aplikasi (Link ke Beranda) */}
          <Link to="/" className="flex items-center space-x-2" onClick={handleLinkClick}>
            <img className="h-12 md:h-14 w-auto" src="/logo-removebg-preview 1.svg" alt="Logo MitigasiKita" />
            <p className="font-patua-one text-lg md:text-xl text-[#0D3553]">
              MITIGASIKITA
            </p>
          </Link>

          {/* Tengah: Link Navigasi (Hanya tampil di desktop - sm ke atas) */}
          <div className="hidden sm:flex flex-1 items-center justify-center space-x-4 md:space-x-6 lg:space-x-8">
            <Link to="/" className="text-base md:text-lg font-medium text-blue-950 hover:text-red-600" onClick={handleLinkClick}>
              Beranda
            </Link>
            <Link to="/map" className="text-base md:text-lg font-medium text-blue-950 hover:text-red-600" onClick={handleLinkClick}>
              Peta Resiko
            </Link>
            <Link to="/education" className="text-base md:text-lg font-medium text-blue-950 hover:text-red-600" onClick={handleLinkClick}>
              Edukasi
            </Link>
          </div>

          {/* Kanan: Tombol Logout (Hanya tampil di desktop - sm ke atas) */}
          <div className="hidden sm:flex items-center">
            <button
              onClick={handleLogout}
              className="text-base md:text-lg font-medium text-white"
            >
              Logout
            </button>
          </div>

          {/* Tombol Hamburger (Hanya tampil di mobile - di bawah sm) */}
          <div className="sm:hidden flex items-center">
            <button onClick={openMenu} className="text-white">
              <FaBars />
            </button>
          </div>
        </div>
      </div>

      {/* Panel Menu Mobile (Fixed Sidebar) */}
      {isOpen && (
        <>
          {/* Backdrop untuk menutup menu saat diklik di luar panel */}
          <div onClick={closeMenu} className="sm:hidden fixed inset-0  bg-opacity-50 z-30 transition-opacity duration-300 ease-in-out"></div>
          
          {/* Konten Panel Menu */}
          <div className="sm:hidden fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-xl z-40 flex flex-col p-6 transition-transform duration-300 ease-in-out transform translate-x-0"> {/* max-w-xs untuk batasan lebar */}
            {/* Header Menu Mobile dengan Tombol Close */}
            <div className="flex justify-between items-center mb-6">
              <p className="font-patua-one text-lg text-white">MENU</p>
              <button onClick={closeMenu} className="text-2xl text-white">
                <FaTimes /> {/* Tombol close di dalam panel */}
              </button>
            </div>

            {/* Link Navigasi Mobile */}
            <nav className="flex-grow flex flex-col space-y-3">
              <Link to="/" onClick={handleLinkClick} className="block py-2 text-lg font-medium text-blue-950 hover:text-red-600">Beranda</Link>
              <Link to="/map" onClick={handleLinkClick} className="block py-2 text-lg font-medium text-blue-950 hover:text-red-600">Peta Resiko</Link>
              <Link to="/education" onClick={handleLinkClick} className="block py-2 text-lg font-medium text-blue-950 hover:text-red-600">Edukasi</Link>
            </nav>

            {/* Tombol Logout Mobile di bagian bawah panel */}
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