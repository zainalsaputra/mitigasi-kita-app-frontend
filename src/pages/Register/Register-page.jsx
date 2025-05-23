import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password dan Konfirmasi Password harus sama!");
      return;
    }

    if (name && email && password) {
      
      const userData = { name, email, password };
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(userData);
      localStorage.setItem("users", JSON.stringify(users));
      navigate("/login");
    } else {
      alert("Semua field harus diisi!");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Konfirmasi Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
