import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { handleRegister } from "../../../presenters/register-presenter";
import NavbarLogin from "../../components/navbarLogin";
import { FiEye, FiEyeOff } from "react-icons/fi";
function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleRegister(form, () => navigate("/login"));
  };

  return (
    <div className="min-h-screen flex flex-col overflow-y-auto">
      <NavbarLogin />

      <div className="flex-grow flex items-center justify-center mt-24 px-4 sm:px-6 md:px-12 py-6 sm:py-10 overflow-auto">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-lg bg-[#0D3553] shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-white mb-6 font-poppins">
            REGISTER
          </h2>

          <form className="space-y-4" onSubmit={onSubmit}>
            {/* Nama */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-bold text-white mb-1 font-poppins"
              >
                Nama
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Example: MitigasiKita"
                className="w-full h-12 px-3 py-2 rounded-md bg-white text-black placeholder-gray-400 font-poppins font-medium focus:outline-none"
                style={{ boxShadow: "inset 8px 8px 4px rgba(0, 0, 0, 0.25)" }}
                value={form.name}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-white mb-1 font-poppins"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Example: mitigasi@gmail.com"
                className="w-full h-12 px-3 py-2 rounded-md bg-white text-black placeholder-gray-400 font-poppins font-medium focus:outline-none"
                style={{ boxShadow: "inset 8px 8px 4px rgba(0, 0, 0, 0.25)" }}
                value={form.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-white mb-1 font-poppins"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Example: mitigasi@123"
                  className="w-full h-12 px-3 py-2 rounded-md bg-white text-black placeholder-gray-400 font-poppins font-medium focus:outline-none"
                  style={{ boxShadow: "inset 8px 8px 4px rgba(0, 0, 0, 0.25)" }}
                  value={form.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-bold text-white mb-1 font-poppins"
              >
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Ulangi Password"
                  className="w-full h-12 px-3 py-2 rounded-md bg-white text-black placeholder-gray-400 font-poppins font-medium focus:outline-none"
                  style={{ boxShadow: "inset 8px 8px 4px rgba(0, 0, 0, 0.25)" }}
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>
            </div>

            {/* Button */}
            <div className="flex items-center justify-center mt-8">
              <button
                type="submit"
                className="w-30 h-11 px-3 py-2 text-lg font-bold font-poppins sm:text-sm md:text-lg rounded-md text-[#0D3553] bg-white hover:bg-gray-100 transition"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-4 text-xs text-center text-white font-poppins">
            Sudah Punya Akun?{" "}
            <Link to="/login" className="font-semibold underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
