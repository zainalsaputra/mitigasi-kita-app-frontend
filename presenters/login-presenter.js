import MySwal from "sweetalert2";
import { loginUser } from "../src/utils/auth";

export async function handleLoginSubmit({
  email,
  password,
  navigate,
  onError,
}) {
  try {
    const data = await loginUser(email, password);

    let accessToken = null;
    let refreshToken = null;

    if (
      data.response &&
      data.response.accessToken &&
      data.response.refreshToken
    ) {
      accessToken = data.response.accessToken;
      refreshToken = data.response.refreshToken;
    } else if (data.accessToken && data.refreshToken) {
      accessToken = data.accessToken;
      refreshToken = data.refreshToken;
    }

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }

    // Tampilkan notifikasi sukses langsung
    await MySwal.fire({
      icon: "success",
      title: "Login Berhasil",
      background: "#0D3553",
      color: "white",
      timer: 1500,
      showConfirmButton: false,
    });

    navigate("/");
  } catch (error) {
    MySwal.fire({
      icon: "error",
      title: "Gagal Login",
      text: error.message || "Login failed",
      background: "#0D3553",
      color: "white",
    });
    onError(error.message || "Login failed");
  }
}
