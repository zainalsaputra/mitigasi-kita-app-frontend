import { getAccessTokenWithRefresh, fetchPrediction, savePredictionToHistory } from "../src/utils/auth";
import MySwal from "sweetalert2"

export async function handlePredictionPresenter(selectedCity, setPrediction) {
  if (!selectedCity?.lat || !selectedCity?.long) return;
  try {
    const data = await fetchPrediction(selectedCity.lat, selectedCity.long);
    setPrediction(data);
  } catch (error) {
    alert(error.message);
    console.error("Prediction Error:", error);
  }
}

export async function handleSaveHistoryPresenter(prediction, navigate) {
  const token = await getAccessTokenWithRefresh();
  if (!token) {
        MySwal.fire({
          html: `
            <div class="text-white text-center font-bold text-lg mb-4">
              Anda Harus Login Untuk <br /> Menyimpan Data ke History
            </div>
             <div class="flex justify-center gap-4">
            <button id="cancel-btn" class="bg-white text-gray-700 font-bold px-4 py-2 rounded hover:bg-gray-100 transition">
              Cancel
            </button>
            <button id="login-btn" class="bg-white text-red-700 font-bold px-4 py-2 rounded hover:bg-gray-100 transition">
              Login
            </button>
          </div>
          `,
          background: "#dc2626",
          showConfirmButton: false,
          allowOutsideClick: false,
          customClass: {
            popup: "rounded-lg px-8 py-6",
          },
          didOpen: () => {
            const loginBtn = document.getElementById("login-btn");
            const cancelBtn = document.getElementById("cancel-btn");
    
            if (loginBtn) {
              loginBtn.addEventListener("click", () => {
                MySwal.close();
                navigate("/login"); 
              });
            }
    
            if (cancelBtn) {
              cancelBtn.addEventListener("click", () => {
                MySwal.close();
              });
            }
          },
        });
      return;
  }

  if (!prediction) {
    alert("Tidak ada prediksi untuk disimpan.");
    return;
  }

  try {
    await savePredictionToHistory(prediction, token);
    alert("Prediksi berhasil disimpan!");
  } catch (error) {
    alert(error.message);
    console.error("Save History Error:", error);
  }
}
