import MySwal from "sweetalert2";
import { loginUser } from "../src/utils/auth";

export async function handleLoginSubmit({ email, password, navigate }) {
  try {
    // Tampilkan loading
    MySwal.fire({
      title: "Sedang login...",
      allowOutsideClick: false,
      background: "#0D3553",
      color: "white",
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    const data = await loginUser(email, password);

    let accessToken = null;
    let refreshToken = null;

    if (data.response?.accessToken && data.response?.refreshToken) {
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

    // Tutup loading
    MySwal.close();

    // Notifikasi sukses
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
    // Tutup loading
    MySwal.close();

    // Notifikasi gagal
    await MySwal.fire({
      icon: "error",
      title: "Gagal Login",
      text: error.message || "Email atau password salah.",
      background: "#0D3553",
      color: "white",
      confirmButtonColor: "#C73134",
      confirmButtonText: "OK",
    });
  }
}
