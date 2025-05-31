import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    province: "",
    district: "",
    subdistrict: "",
    village: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Password dan Konfirmasi Password harus sama!");
      return;
    }
    try {
      // Remove confirmPassword before sending to backend
      const submitForm = { ...form };
      delete submitForm.confirmPassword;
      const res = await fetch('https://sec-prediction-app-backend.vercel.app/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitForm),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await res.json();
      console.log('Register response:', data);
      localStorage.setItem("user", JSON.stringify(data.data));
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister}>
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

      <input name="province" placeholder="Provinsi" value={form.province} onChange={handleChange} required />
      <input name="district" placeholder="Kabupaten/Kota" value={form.district} onChange={handleChange} required />
      <input name="subdistrict" placeholder="Kecamatan" value={form.subdistrict} onChange={handleChange} required />
      <input name="village" placeholder="Kelurahan/Desa" value={form.village} onChange={handleChange} required />

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
