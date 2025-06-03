export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const res = await fetch('https://sec-prediction-app-backend.vercel.app/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
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

export async function logout() {
  const refreshToken = localStorage.getItem("refreshToken");
 
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");

  
  if (refreshToken) {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 3000); // Timeout 3 detik
    try {
      await fetch('https://sec-prediction-app-backend.vercel.app/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
        signal: controller.signal
      });
    } catch {
      // Abaikan error, user sudah logout di frontend
    }
  }
}