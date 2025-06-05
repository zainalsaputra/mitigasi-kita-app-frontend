import React from "react"; // Wajib kalau pakai JSX
import { useNavigate } from "react-router-dom"; // Kalau kamu pakai React Router

const LoginNavbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Ganti sesuai route login kamu
  };

  return (
    <nav className=" fixed top-0 left-0 w-full z-50 ">
      <div className="px-6 sm:px-12">
        <div className="grid grid-cols-3 items-center h-20">
          {/* Kolom 1: Logo + Nama */}
          <div className="flex items-center space-x-2">
            <img
              className="h-15 md:h-15 w-auto"
              src="/logo-removebg-preview 1.svg"
              alt="Logo MitigasiKita"
            />
            <p className="font-patua-one text-lg md:text-xl text-[#0D3553]">
              MITIGASIKITA
            </p>
          </div>

          {/* Kolom 2: Kosong */}
          <div></div>

          {/* Kolom 3: Tombol Login */}
          <div className="flex justify-end">
            <button
              onClick={handleLoginClick}
              className="text-lg md:text-base font-medium text-white px-4 py-2 rounded-md bg-[#0D3553]"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LoginNavbar;
