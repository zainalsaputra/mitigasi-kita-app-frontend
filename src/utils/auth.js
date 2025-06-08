import { jwtDecode } from "jwt-decode";

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const res = await fetch(
      "https://mitigasi-kita-app-backend-production.up.railway.app/api/auth/refresh",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      return data.accessToken;
    }
    return null;
  } catch {
    return null;
  }
}

export async function getAccessTokenWithRefresh() {
  let token = localStorage.getItem("accessToken");
  if (!token) {
    token = await refreshAccessToken();
  }
  return token;
}

export async function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

export async function loginUser(email, password) {
  const res = await fetch(
    "https://mitigasi-kita-app-backend-production.up.railway.app/api/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Login failed");
  }

  return await res.json();
}

export async function registerUser({ name, email, password }) {
  const res = await fetch(
    "https://mitigasi-kita-app-backend-production.up.railway.app/api/auth/register",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Registration failed");
  }

  return await res.json();
}

export async function fetchPrediction(latitude, longitude) {
  const res = await fetch(
    "https://earthquake-tsunami-model-api-production.up.railway.app/predict",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ latitude, longitude }),
    }
  );

  const result = await res.json();
  if (result.status !== "success") {
    throw new Error(result.message || "Prediksi gagal.");
  }
  return result.data;
}

export async function savePredictionToHistory(prediction, token) {
  const res = await fetch(
    "https://mitigasi-kita-app-backend-production.up.railway.app/api/history",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(prediction),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Gagal menyimpan riwayat.");
  }
}

export async function fetchHistoryList(token) {
  const res = await fetch(
    "https://mitigasi-kita-app-backend-production.up.railway.app/api/history",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  const result = await res.json();

  if (!res.ok || !Array.isArray(result.data)) {
    throw new Error(result.message || "Data history tidak valid");
  }

  return result.data;
}

export async function deleteHistoryItem(id, token) {
  const res = await fetch(
    `https://mitigasi-kita-app-backend-production.up.railway.app/api/history/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Gagal menghapus history");
  }
}

export async function fetchHistoryDetail(id, token) {
  const res = await fetch(
    `https://mitigasi-kita-app-backend-production.up.railway.app/api/history/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  const result = await res.json();

  if (!res.ok || result.status !== "success" || !result.data) {
    throw new Error("Data history tidak valid");
  }

  return result.data;
}

export function getUserFromToken() {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    if (decoded.exp && decoded.exp < now) {
      return null; 
    }

    return decoded;
  } catch {
    return null;
  }
}

export async function forgotPassword(email) {
  const res = await fetch(
    "https://mitigasi-kita-app-backend-production.up.railway.app/api/auth/forgot-password",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }
  );
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Gagal mengirim email reset password");
  }
  return "Email reset password berhasil dikirim. Silakan cek email Anda.";
}

export async function resetPassword(token, password) {
  const res = await fetch(
    "https://mitigasi-kita-app-backend-production.up.railway.app/api/auth/reset-password",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Gagal mereset password");
  }

  return data.message || "Password berhasil direset.";
}