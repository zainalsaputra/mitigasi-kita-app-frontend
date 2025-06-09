import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { ResetPasswordPresenter } from "../../../presenters/resetPass-presenter";
import MySwal from "sweetalert2";
import NavbarLogin from "../../components/NavbarLogin"; // pastikan import NavbarLogin

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
          <div class="text-white text-center  text-lg mb-4 font-poppins text-md sm:text-lg md:text-xl ">
            Password berhasil direset <br /> Silahkan login dengan
            <br />Password baru Anda.
          </div>
           <button id="back-to-login-btn" class="bg-white text-[#0D3553] font-bold font-poppins px-4 py-2 rounded hover:bg-gray-100 transition">
              Kembali ke login
           </button>
        `,
        background: "#0D3553",
        showConfirmButton: false,
        allowOutsideClick: false,
        customClass: {
          popup: "rounded-md px-8 py-6",
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

    if (error) {
      MySwal.fire({
        html: `
          <div class="text-white text-center font-bold text-lg mb-4 font-poppins text-md sm:text-lg md:text-xl ">
            Gagal mereset <br /> Password
          </div>
          <button id="retry-btn" class="bg-white text-[#C73134] font-bold font-poppins px-4 py-2 rounded hover:bg-gray-100 transition">
            Coba Lagi
          </button>
        `,
        background: "#C73134",
        showConfirmButton: false,
        allowOutsideClick: false,
        customClass: {
          popup: "rounded-md px-8 py-6",
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

      <div className="flex-grow flex items-center justify-center px-4 py-10 text-white text-lg sm:text-lg md:text-xl font-poppins">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-lg bg-[#0D3553] shadow-lg">
          <h2 className="font-bold text-center text-white mb-6">
            RESET PASSWORD
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="new-password"
                className="block  font-bold text-white mb-1 text-md sm:text-lg md:text-xl"
              >
                Password Baru
              </label>
              <input
                id="new-password"
                name="password"
                type="password"
                required
                placeholder="Masukkan password baru"
                value={password}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full h-11 sm:h-12 px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none text-black font-poppins font-medium bg-white"
                style={{
                  boxShadow: "inset 8px 8px 4px rgba(0, 0, 0, 0.25)",
                }}
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-auto h-11 px-6 py-2 font-bold rounded-md text-[#0D3553] bg-white hover:bg-gray-200 transition"
              >
                {loading ? "Memproses..." : "Reset Password"}
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-center font-poppins">{error}</p>
            )}
          </form>

          <p className="mt-4 text-center text-base sm:text-sm text-white font-poppins">
            Sudah ingat password?{" "}
            <span
              onClick={() => navigate("/login")}
              className="font-semibold underline cursor-pointer hover:text-gray-200"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
