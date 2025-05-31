import {useState} from 'react';

function ResetPassword() {
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");
        try {
            const res = await fetch("https://sec-prediction-app-backend.vercel.app/auth/reset-password", {
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
                type="text"
                placeholder="Masukkan token dari email"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
            />
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
        </form>
    )
}

export default ResetPassword;