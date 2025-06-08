import { ForgotPasswordPresenter } from "../../../presenters/forgotPass-presenter";
import { useState } from "react";
import MySwal from "sweetalert2";
export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
     const result = await ForgotPasswordPresenter({
      email,
      setLoading,
      setMessage,
      setError,
    });
    if (result.success) {
      MySwal.fire({
        html: `
          <div class="text-white text-center font-bold text-lg">
            Email reset password berhasil dikirim.
            <br />Silakan cek email Anda.
          </div>
          <div class="text-white text-sm text-center mt-2">
            Jika email belum masuk, cek folder <b>Spam</b> atau <b>Promosi</b>.
          </div>
        `,
        background: "#22c55e",
        showConfirmButton: false,
        showCloseButton: true,
        customClass: {
          popup: "rounded-lg px-8 py-6",
          closeButton: "text-white text-2xl",
        },
      });
    } else {
      MySwal.fire({
        html: `
    <div class="text-white text-center font-bold text-lg mb-4">
      Gagal mengirim E-mail <br /> untuk reset Password
    </div>
    <button id="retry-btn" class="bg-white text-red-700 font-bold px-4 py-2 rounded hover:bg-gray-100 transition">
      Coba Lagi
    </button>
  `,
        background: "#dc2626",
        showConfirmButton: false,
        allowOutsideClick: false,
        customClass: {
          popup: "rounded-lg px-8 py-6",
        },
        didOpen: () => {
          const retryBtn = document.getElementById("retry-btn");
          if (retryBtn) {
            retryBtn.addEventListener("click", () => {
              MySwal.close();
              // Trigger ulang form submit kalau mau
              // handleSubmit(); atau reload: window.location.reload();
            });
          }
        },
      });
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/path/to/indonesia-map.png')" }}
    >
      {/* Header */}
      <header className="absolute top-4 left-4 right-4 flex items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center space-x-2">
          <img src="/public/logo-app.png" alt="Logo" className="h-10 w-10" />
          <span className="text-[#0D2C4E] font-bold text-lg">MITIGASIKITA</span>
        </div>
        {/* Login Button */}
        <a
          href="/login"
          className="bg-[#0D2C4E] text-white py-2 px-4 rounded-md hover:bg-[#123A64] transition"
        >
          Login
        </a>
      </header>

      {/* Overlay and Form */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-4">
        <div className="bg-[#0D2C4E] text-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-center text-xl font-bold mb-6">LUPA PASSWORD</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                E-Mail
              </label>
              <input
                type="email"
                id="email"
                placeholder="Masukkan E-mail Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-white text-[#0D2C4E] font-bold py-2 px-6 rounded-md hover:bg-gray-100 transition"
              >
                {loading ? "Mengirim..." : "Kirim"}
              </button>
            </div>
            {message && <p className="text-green-400 text-center">{message}</p>}
            {error && <p className="text-red-400 text-center">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
