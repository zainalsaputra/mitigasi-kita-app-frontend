import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ResetPasswordPresenter } from "../../../presenters/resetPass-presenter";
import MySwal from "sweetalert2";
function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState("");
  const [password, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await ResetPasswordPresenter({
      token,
      password,
      setLoading,
      setMessage,
      setError,
    });
    if (message) {
      MySwal.fire({
        html: `
          <div class="text-white text-center font-bold text-lg mb-4">
            Password berhasil direset <br /> Silahkan login dengan
            <br />Password baru Anda.
          </div>
           <button id="back-to-login-btn" class="bg-white text-green-700 font-bold px-4 py-2 rounded hover:bg-gray-100 transition">
      Kembali ke login
    </button>
        `,
        background: "#22c55e",
        showConfirmButton: false,
        allowOutsideClick: false,
        customClass: {
          popup: "rounded-lg px-8 py-6",
        },
        didOpen: () => {
          const backBtn = document.getElementById("back-to-login-btn");
          if (backBtn) {
            backBtn.addEventListener("click", () => {
              MySwal.close();
              navigate("/login");
            });
          }
        },
      });
    }

    // Jika error
    if (error) {
      MySwal.fire({
        html: `
    <div class="text-white text-center font-bold text-lg mb-4">
      Gagal mereset <br /> Password
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
      <header className="absolute top-6 left-6 right-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/public/logo-app.png" alt="Logo" className="h-10 w-10" />
          <span className="text-[#0D2C4E] font-bold text-lg">MITIGASIKITA</span>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="bg-[#0D2C4E] text-white px-4 py-2 rounded hover:bg-[#123A64] transition"
        >
          Login
        </button>
      </header>

      {/* Reset Form */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 px-4">
        <div className="bg-[#0D2C4E] text-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-center text-xl font-bold mb-6">PASSWORD BARU</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="newPassword" className="block mb-1 font-medium">
                Password
              </label>
              <input
                type="password"
                id="newPassword"
                placeholder="Masukkan Password Baru"
                value={password}
                onChange={(e) => setNewPassword(e.target.value)}
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
                {loading ? "Memproses..." : "Kirim"}
              </button>
            </div>
            {error && <p className="text-red-400 text-center">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
