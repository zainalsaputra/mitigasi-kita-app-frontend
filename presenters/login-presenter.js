import MySwal from "sweetalert2";
import { loginUser } from "../src/utils/auth";

export async function handleLoginSubmit({ email, password, navigate }) {
  try {
    MySwal.fire({
      title: "Sedang login...",
      allowOutsideClick: false,
      background: "#fff",
      customClass: {
        popup: "font-poppins",
      },
      didOpen: () => {
        MySwal.showLoading();
      },
      showConfirmButton: false,
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

    MySwal.close();

    await MySwal.fire({
      icon: "success",
      title: "Login Berhasil",
      timer: 1500,
      showConfirmButton: false,
      background: "#fff",
      customClass: {
        popup: "font-poppins",
      },
    });

    navigate("/");
  } catch (error) {
    MySwal.close();

    // Notifikasi error default
    await MySwal.fire({
      icon: "error",
      title: "Gagal Login",
      text: error.message || "Email atau password salah.",
      confirmButtonText: "OK",
      background: "#fff",
      customClass: {
        popup: "font-poppins",
      },
    });
  }
}
