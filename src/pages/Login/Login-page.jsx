import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavbarLogin from "../../components/navbarLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://sec-prediction-app-backend.vercel.app/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await res.json();

      // Simpan token dan data user
      if (data.response?.accessToken && data.response?.refreshToken) {
        localStorage.setItem("accessToken", data.response.accessToken);
        localStorage.setItem("refreshToken", data.response.refreshToken);
        const userWithoutToken = { ...data.response };
        delete userWithoutToken.accessToken;
        delete userWithoutToken.refreshToken;
        localStorage.setItem("user", JSON.stringify(userWithoutToken));
      } else if (data.accessToken && data.refreshToken) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        if (data.response) {
          localStorage.setItem("user", JSON.stringify(data.response));
        }
      } else if (data.response) {
        localStorage.setItem("user", JSON.stringify(data.response));
      }

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarLogin />

      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md p-8 rounded-lg bg-[#CA3C3E]">
          <h2 className="text-2xl font-bold text-center text-white mb-6 font-poppins">
            LOGIN
          </h2>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email-address" className="block text-sm font-bold text-white mb-1 font-poppins">
                E-mail
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                style={{ boxShadow: 'inset 8px 8px 4px rgba(0, 0, 0, 0.25)' }}
                className="w-full h-12 px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none text-black font-poppins font-medium bg-white"
                placeholder="Example: puput@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-white font-poppins mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                style={{ boxShadow: 'inset 8px 8px 4px rgba(0, 0, 0, 0.25)' }}
                className="w-full h-12 px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none text-black font-poppins font-medium bg-white"
                placeholder="Example: puput@123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="text-left mt-1">
                <Link to="/forgot-password" className="text-xs text-white font-poppins">
                  Lupa Password?
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-45 h-11 px-3 py-2 text-lg font-bold rounded-md text-[#CA3C3E] bg-white"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-1 text-center text-xs text-white font-poppins">
            Belum punya akun?{' '}
            <Link to="/register" className="font-semibold text-white">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
