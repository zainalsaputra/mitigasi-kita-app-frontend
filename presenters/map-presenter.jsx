import { getAccessTokenWithRefresh, fetchPrediction, savePredictionToHistory } from "../src/utils/auth";
import MySwal from "sweetalert2";

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
            <div class="flex flex-col items-center justify-center text-white font-poppins text-xs sm:text-xl md:text-xl">
              <div class="text-white text-center font-bold mb-4">
                Anda Harus Login Untuk <br /> Menyimpan Data ke History
              </div>
              <div class="flex justify-center gap-4">
                <button id="cancel-btn" class="bg-white text-[#C73134] font-bold px-4 py-2 rounded hover:bg-gray-100 transition">
                  Cancel
                </button>
                <button id="login-btn" class="bg-white text-[#C73134] font-bold px-4 py-2 rounded hover:bg-gray-100 transition">
                  Login
                </button>
              </div>
            </div>
          `,
          background: "#C73134",
          showConfirmButton: false,
          allowOutsideClick: false,
          customClass: {
            popup: "rounded-lg px-6 py-3",
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
    // alert("Prediksi berhasil disimpan!");
    MySwal.fire({
            html: `
              <div class="text-white text-center font-bold font-poppins text-xs sm:text-xl md:text-xl">
                Prediksi berhasil disimpan.
              </div>
            `,
            background: "#0D3553", 
            showConfirmButton: false,
            showCloseButton: false,
            timer:3000,
            customClass: {
              popup: "rounded-lg px-8 py-6",
              closeButton: "text-white text-2xl",
            },
          });
  } catch (error) {
    alert(error.message);
    console.error("Save History Error:", error);
  }
}
