import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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
      onError: (msg) => alert(msg),
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

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

      <button type="submit">Login</button>

      <p>
        Belum punya akun? <Link to="/register">Register</Link>
      </p>

      <p>
        <Link to="/forgot-password">Lupa Sandi?</Link>
      </p>
    </form>
  );
}

export default Login;
