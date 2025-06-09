import { useState } from "react";
import { ForgotPasswordPresenter } from "../../../presenters/forgotPass-presenter";
import MySwal from "sweetalert2";
import { Link } from "react-router-dom"; 
import NavbarLogin from "../../components/navbarLogin";

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
          <div class="flex flex-col items-center justify-center text-white font-poppins text-lg sm:text-xl md:text-xl">
            <h3 class="text-xl font-bold mb-2 text-center">Email berhasil dikirim</h3>
            <p class="text-sm text-center">
              Silakan cek email Anda untuk mereset password.
              <br />
              Jika belum masuk, periksa folder <strong>Spam</strong> atau <strong>Promosi</strong>.
            </p>
          </div>
        `,
        background: "#0D3553",
        showConfirmButton: false,
        showCloseButton: true,
        customClass: {
          popup: "rounded-md px-6 py-6",
          closeButton: "text-white text-xl",
        },
      });
    } else {
      MySwal.fire({
        html: `
          <div class="flex flex-col items-center justify-center text-white font-poppins">
            <h3 class="text-xl font-bold mb-3 text-center font-poppins">Gagal mengirim email</h3>
            <p class="text-sm text-center mb-4 font-poppins">
              Terjadi kesalahan saat mencoba mengirim email reset password.
            </p>
            <button id="retry-btn" class="bg-white text-[#C73134] font-bold font-poppins px-4 py-2 rounded-md">
              Coba Lagi
            </button>
          </div>
        `,
        background: "#C73134",
        showConfirmButton: false,
        allowOutsideClick: false,
        customClass: {
          popup: "rounded-lg px-6 py-6",
        },
        didOpen: () => {
          const retryBtn = document.getElementById("retry-btn");
          if (retryBtn) {
            retryBtn.addEventListener("click", () => {
              MySwal.close();
            });
          }
        },
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarLogin />

      <div className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-lg bg-[#0D3553] shadow-lg">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-white mb-6 font-poppins">
            LUPA PASSWORD
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm sm:text-base font-bold text-white mb-1 font-poppins"
              >
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  boxShadow: "inset 8px 8px 4px rgba(0, 0, 0, 0.25)",
                }}
                className="w-full h-11 sm:h-12 px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none text-black font-poppins font-medium bg-white"
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-30 sm:w-auto h-11 px-6 py-2 text-lg sm:text-sm md:text-lg font-poppins font-bold rounded-md text-[#0D3553] bg-white hover:bg-gray-200 transition"
              >
                {loading ? "Mengirim..." : "Kirim"}
              </button>
            </div>

            {message && (
              <p className="text-[#C73134] font-semibold text-center font-poppins  text-xs sm:text-base md:text-base">
                {message}
              </p>
            )}
            {error && (
              <p className="text-red-400 text-center font-poppins">{error}</p>
            )}
          </form>

          <p className="mt-4 text-center text-xs sm:text-sm text-white font-poppins">
            Sudah ingat password?{" "}
            <Link
              to="/login"
              className="font-semibold underline text-white hover:text-gray-200"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
