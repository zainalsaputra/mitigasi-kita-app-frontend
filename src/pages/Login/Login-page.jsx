import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  // const handleLogin = (e) => {
  //   e.preventDefault();

  //   const users = JSON.parse(localStorage.getItem("users")) || [];
  //   const user = users.find(
  //     (u) => u.email === email && u.password === password
  //   );
  //   console.log(user);

  //   if (user) {
  //     localStorage.setItem("currentUser", JSON.stringify(user));
  //     navigate("/");
  //   } else {
  //     alert("Email atau password salah!");
  //   }
  // };
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
      // Jika backend mengirim accessToken & refreshToken di dalam user
      if (data.response && data.response.accessToken && data.response.refreshToken) {
        localStorage.setItem("accessToken", data.response.accessToken);
        localStorage.setItem("refreshToken", data.response.refreshToken);
        // Buang token dari user sebelum simpan user ke localStorage (opsional)
        const userWithoutToken = { ...data.response };
        delete userWithoutToken.accessToken;
        delete userWithoutToken.refreshToken;
        localStorage.setItem("user", JSON.stringify(userWithoutToken));
      } else if (data.accessToken && data.refreshToken) {
        // Jika token ada di root response
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        if (data.response) {
          localStorage.setItem("user", JSON.stringify(data.response));
        }
      } else if (data.response) {
        // Jika hanya user saja
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
