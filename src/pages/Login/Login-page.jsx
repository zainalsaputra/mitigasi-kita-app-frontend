import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavbarLogin from "../../components/navbarLogin";
import { handleLoginSubmit } from "../../../presenters/login-presenter";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginSubmit({
      email,
      password,
      navigate,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarLogin />
      <div className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-lg bg-[#0D3553] shadow-lg">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-white mb-6 font-poppins">
            LOGIN
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email-address"
                className="block text-sm sm:text-base font-bold text-white mb-1 font-poppins"
              >
                E-mail
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full h-11 sm:h-12 px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none text-black font-poppins font-medium bg-white"
                placeholder="Example: mitigasi@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  boxShadow: "inset 8px 8px 4px rgba(0, 0, 0, 0.25)",
                }}
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm sm:text-base font-bold text-white mb-1 font-poppins"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full h-11 sm:h-12 px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none text-black font-poppins font-medium bg-white"
                placeholder="Example: mitigasi@123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  boxShadow: "inset 8px 8px 4px rgba(0, 0, 0, 0.25)",
                }}
              />
              <div className="text-left mt-1">
                <Link
                  to="/forgot-password"
                  className="text-xs sm:text-sm text-white hover:underline font-poppins"
                >
                  Lupa Password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-30 sm:w-auto h-11 px-6 py-2 text-lg sm:text-sm md:text-lg font-poppins font-bold rounded-md text-[#0D3553] bg-white hover:bg-gray-200 transition"
              >
                Login
              </button>
            </div>
          </form>

          {/* Register Link */}
          <p className="mt-4 text-center text-xs sm:text-sm text-white font-poppins">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="font-semibold underline text-white hover:text-gray-200"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
