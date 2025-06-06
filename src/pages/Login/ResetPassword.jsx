import {useState, useEffect} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const tokenFromurl = searchParams.get("token");
        if (tokenFromurl) {
            setToken(tokenFromurl);
        }
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");
        try {
            const res = await fetch("", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, newPassword }),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Gagal mereset password");
            }
            setMessage("Password berhasil direset. Silakan login dengan password baru Anda.");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
      <form onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <input
          type="password"
          placeholder="Masukkan password baru"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Memproses..." : "Reset Password"}
        </button>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={() => navigate("/login")}>Kembali ke Login</button>
      </form>
    );
}

export default ResetPassword;