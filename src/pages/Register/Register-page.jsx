import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { handleRegister } from "../../../presenters/register-presenter";
function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleRegister(
      form,
      () => navigate("/login"),
      (message) => alert(message)
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Register</h2>

      <input
        type="text"
        name="name"
        placeholder="Nama"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Konfirmasi Password"
        value={form.confirmPassword}
        onChange={handleChange}
        required
      />

      <button type="submit">Register</button>

      <p>
        Sudah punya akun? <Link to="/login">Login</Link>
      </p>
    </form>
  );
}

export default Register;
