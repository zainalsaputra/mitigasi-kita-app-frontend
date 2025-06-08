import React from "react";
import { useNavigate } from "react-router-dom";

const NavbarLogin = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="px-4 sm:px-8 md:px-12">
        <div className="grid grid-cols-3 items-center h-16 sm:h-20">
          {/* Kolom 1: Logo + Nama */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              className="h-10 sm:h-12 md:h-16 w-auto"
              src="/logo-removebg-preview 1.svg"
              alt="Logo MitigasiKita"
            />
            <p className="font-patua-one text-base sm:text-lg md:text-xl text-[#0D3553]">
              MITIGASIKITA
            </p>
          </div>

          {/* Kolom 2: Kosong */}
          <div></div>

          {/* Kolom 3: Tombol Login */}
          <div className="flex justify-end">
            <button
              onClick={handleLoginClick}
              className="text-md sm:text-base md:text-lg font-medium text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-[#0D3553] hover:bg-[#0b2a43] transition-colors duration-300"
              aria-label="Login"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLogin;
