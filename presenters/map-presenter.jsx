import { getAccessTokenWithRefresh, fetchPrediction, savePredictionToHistory } from "../src/utils/auth";


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

export async function handleSaveHistoryPresenter(prediction) {
  const token = await getAccessTokenWithRefresh();
  if (!token) {
    alert("Anda belum login.");
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
