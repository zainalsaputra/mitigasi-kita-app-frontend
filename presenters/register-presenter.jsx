import { registerUser } from "../src/utils/auth";
import MySwal from "sweetalert2";
export async function handleRegister(form, onSuccess) {
  if (form.password !== form.confirmPassword) {
    await MySwal.fire({
      icon: "error",
      title: "Gagal Register",
      text: "Password dan Konfirmasi Password harus sama!",
      confirmButtonText: "OK",
      background: "#fff",
      customClass: {
        popup: "font-poppins",
      },
    });
    return;
  }

  try {
    MySwal.fire({
      title: "Sedang register...",
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

    await registerUser({
      name: form.name,
      email: form.email,
      password: form.password,
    });

    MySwal.close();

    await MySwal.fire({
      icon: "success",
      title: "Register Berhasil",
      timer: 1500,
      showConfirmButton: false,
      background: "#fff",
      customClass: {
        popup: "font-poppins",
      },
    });

    onSuccess();
  } catch (error) {
    MySwal.close();
    await MySwal.fire({
      icon: "error",
      title: "Gagal Register",
      text: error.message || "Terjadi kesalahan saat register",
      confirmButtonText: "OK",
      background: "#fff",
      customClass: {
        popup: "font-poppins",
      },
    });
  }
}
