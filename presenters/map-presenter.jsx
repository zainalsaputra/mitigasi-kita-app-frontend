import {
  getAccessTokenWithRefresh,
  fetchPrediction,
  savePredictionToHistory,
} from "../src/utils/auth";
import MySwal from "sweetalert2";

export async function handlePredictionPresenter(selectedCity, setPrediction) {
  if (!selectedCity?.lat || !selectedCity?.long) return;

  try {
    MySwal.fire({
      title: "Sedang mengambil prediksi...",
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading();
      },
      showConfirmButton: false,
      background: "#fff",
      customClass: {
        popup: "font-poppins",
      },
    });

    const data = await fetchPrediction(selectedCity.lat, selectedCity.long);

    MySwal.close();

    setPrediction(data);
  } catch (error) {
    MySwal.close();
    alert(error.message);
    console.error("Prediction Error:", error);
  }
}

export async function handleSaveHistoryPresenter(prediction, navigate) {
  const token = await getAccessTokenWithRefresh();
  if (!token) {
    MySwal.fire({
      title: "Anda harus login untuk menyimpan data ke history",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Login",
      cancelButtonText: "Batal",
      confirmButtonColor: "#C73134",
      cancelButtonColor: "#0D3553",
      allowOutsideClick: false,
      background: "#fff",
      customClass: {
        popup: "font-poppins",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
    return;
  }

  if (!prediction) {
    alert("Tidak ada prediksi untuk disimpan.");
    return;
  }

  try {
    await savePredictionToHistory(prediction, token);

    await MySwal.fire({
      icon: "success",
      title: "Prediksi berhasil disimpan.",
      timer: 1500,
      showConfirmButton: false,
      background: "#fff",
      customClass: {
        popup: "font-poppins",
      },
    });

    // Loading singkat sebelum pindah halaman
    MySwal.fire({
      title: "Memuat halaman riwayat...",
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading();
      },
      showConfirmButton: false,
      background: "#fff",
      customClass: {
        popup: "font-poppins",
      },
      timer: 1000,
    });

    await new Promise((r) => setTimeout(r, 1000));

    MySwal.close();

    navigate("/history");
  } catch (error) {
    alert(error.message);
    console.error("Save History Error:", error);
  }
}
