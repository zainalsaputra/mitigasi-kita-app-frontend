import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await res.json();
      console.log('Login response:', data);
     
      if (data.response && data.response.accessToken && data.response.refreshToken) {
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
  } 
  return (
    <form onSubmit={handleLogin}>
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
